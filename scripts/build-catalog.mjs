import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storeRoot = path.resolve(__dirname, '..');
const packagesDir = path.join(storeRoot, 'packages');
const catalogFile = path.join(storeRoot, 'catalog.json');

const VALID_TYPES = ['campaign', 'sheet', 'oracle', 'tables', 'wargame', 'assets', 'bundle'];

function calculateSha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

function buildCatalog() {
  console.log('📦 Scanning packages in:', packagesDir);

  if (!fs.existsSync(packagesDir)) {
    console.error('❌ Packages directory not found:', packagesDir);
    process.exit(1);
  }

  const packageDirs = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
    .map(dirent => dirent.name);

  const catalogPackages = [];
  let errorsCount = 0;

  for (const pkgFolder of packageDirs) {
    const pkgPath = path.join(packagesDir, pkgFolder);
    const manifestPath = path.join(pkgPath, 'package.json');

    if (!fs.existsSync(manifestPath)) {
      console.warn(`⚠️ Skipping ${pkgFolder}: missing package.json`);
      errorsCount++;
      continue;
    }

    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    } catch (e) {
      console.error(`❌ Error parsing package.json in ${pkgFolder}:`, e.message);
      errorsCount++;
      continue;
    }

    // Validate required fields
    const required = ['id', 'name', 'version', 'type', 'author', 'license'];
    const missing = required.filter(field => !manifest[field]);
    if (missing.length > 0) {
      console.error(`❌ ${pkgFolder} is missing required fields: ${missing.join(', ')}`);
      errorsCount++;
      continue;
    }

    if (!VALID_TYPES.includes(manifest.type)) {
      console.error(`❌ ${pkgFolder} has invalid type "${manifest.type}". Valid types: ${VALID_TYPES.join(', ')}`);
      errorsCount++;
      continue;
    }

    // Locate package file .dinovtt
    let dinovttFile = manifest.file || `${manifest.id}.dinovtt`;
    let dinovttPath = path.join(pkgPath, dinovttFile);

    // Fallback: search for any .dinovtt file in the folder if exact name does not match
    if (!fs.existsSync(dinovttPath)) {
      const found = fs.readdirSync(pkgPath).find(f => f.endsWith('.dinovtt'));
      if (found) {
        dinovttFile = found;
        dinovttPath = path.join(pkgPath, dinovttFile);
      }
    }

    let size = manifest.size || 0;
    let sha256 = manifest.sha256 || '';

    if (fs.existsSync(dinovttPath)) {
      const stats = fs.statSync(dinovttPath);
      size = stats.size;
      sha256 = calculateSha256(dinovttPath);

      // Sync back to local package.json if missing or changed
      if (manifest.size !== size || manifest.sha256 !== sha256) {
        manifest.size = size;
        manifest.sha256 = sha256;
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
      }
    } else {
      console.warn(`⚠️ ${pkgFolder}: no local .dinovtt file found. Falling back to declared metadata.`);
    }

    // Detect preview and readme
    const previewFile = manifest.preview || (fs.existsSync(path.join(pkgPath, 'preview.png')) ? 'preview.png' : null);
    const readmeFile = manifest.readme || (fs.existsSync(path.join(pkgPath, 'README.md')) ? 'README.md' : null);

    const catalogEntry = {
      id: manifest.id,
      name: manifest.name,
      type: manifest.type,
      version: manifest.version,
      author: manifest.author,
      license: manifest.license,
      description: manifest.description || '',
      tags: Array.isArray(manifest.tags) ? manifest.tags : [],
      language: manifest.language || 'es',
      dteMinVersion: manifest.dteMinVersion || '0.1.11',
      requiresModules: Array.isArray(manifest.requiresModules) ? manifest.requiresModules : [],
      size,
      sha256,
      downloadUrl: `packages/${pkgFolder}/${dinovttFile}`,
      manifestUrl: `packages/${pkgFolder}/package.json`,
      previewUrl: previewFile ? `packages/${pkgFolder}/${previewFile}` : null,
      readmeUrl: readmeFile ? `packages/${pkgFolder}/${readmeFile}` : null,
      purchaseUrl: manifest.purchaseUrl || null,
      updatedAt: manifest.updatedAt || new Date().toISOString()
    };

    catalogPackages.push(catalogEntry);
    console.log(`✅ Registered: ${catalogEntry.name} (${catalogEntry.id}) v${catalogEntry.version} [${catalogEntry.type}]`);
  }

  // Sort alphabetically by name
  catalogPackages.sort((a, b) => a.name.localeCompare(b.name));

  const catalog = {
    schema: 1,
    name: 'Dino Tabletop Engine Store',
    description: 'Official package catalog for Dino Tabletop Engine.',
    updatedAt: new Date().toISOString(),
    totalPackages: catalogPackages.length,
    packages: catalogPackages
  };

  fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, 2) + '\n', 'utf-8');
  console.log(`\n🎉 Catalog generated successfully: ${catalogFile}`);
  console.log(`📊 Valid packages: ${catalogPackages.length} | Warnings/Errors: ${errorsCount}`);

  if (errorsCount > 0 && process.env.CI) {
    process.exit(1);
  }
}

buildCatalog();
