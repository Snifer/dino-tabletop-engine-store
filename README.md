# Dino Tabletop Engine — Community Store

[🇬🇧 English](#-english) | [🇪🇸 Español](#-español)

---

## 🇬🇧 English

Official community package catalog and repository for **Dino Tabletop Engine (DTE)**, the tabletop RPG and virtual tabletop (VTT) plugin for Obsidian.

This repository powers the in-app community store client. Packages are hosted as self-contained `.dinovtt` archives and indexed via an automated, decentralized `catalog.json` feed consumed directly by Obsidian.

### 📦 Repository Structure

```text
├── catalog.json              # Auto-generated catalog index (built via GitHub Actions)
├── packages/
│   ├── sample-campaign/
│   │   ├── package.json      # Package metadata manifest
│   │   ├── README.md         # Detailed description, documentation, and credits
│   │   ├── preview.png       # Cover thumbnail image (optional, 16:9 recommended)
│   │   └── campaign.dinovtt  # Atomic ZIP container (.dinovtt) with notes, maps, and assets
└── scripts/
    └── build-catalog.mjs     # Validator and catalog compiler script
```

### 🏷️ Supported Package Types

| Type | Description |
|---|---|
| `campaign` | Complete adventure modules with notes, maps, tokens, and lore |
| `sheet` | Character sheet templates and visual layouts |
| `oracle` | Solo RPG oracle tables, prompts, and tarot/deck definitions |
| `tables` | Random roll tables and nested generator charts |
| `wargame` | Army rosters, miniatures profiles, and skirmish setups |
| `assets` | Token packs, map textures, and tabletop art assets |
| `bundle` | Multi-module bundles combining campaigns, sheets, and tables |

### 🚀 How to Publish a Package

1. **Export your package** directly from Dino Tabletop Engine as a `.dinovtt` file.
2. **Fork** this repository.
3. Create a dedicated folder under `packages/<your-package-id>/`.
4. Place your `<package-id>.dinovtt` file inside that folder.
5. Create a `package.json` file with your metadata:

```json
{
  "id": "my-adventure",
  "name": "The Sunken Crypt",
  "type": "campaign",
  "version": "1.0.0",
  "author": "Your Name / Handle",
  "license": "CC-BY-4.0",
  "description": "A 3-session dungeon crawl for level 3 adventurers.",
  "tags": ["fantasy", "dungeon-crawl", "osr"],
  "language": "en",
  "dteMinVersion": "0.1.11",
  "requiresModules": ["combat", "diceTray", "character-sheet"],
  "file": "my-adventure.dinovtt",
  "preview": "preview.png",
  "readme": "README.md"
}
```

6. *(Optional but recommended)* Include a `preview.png` (cover banner) and a `README.md` (detailed guide or player handout).
7. Submit a **Pull Request** targeting the `main` branch.
8. The CI pipeline will automatically validate the manifest, calculate the SHA-256 integrity hash, and compile `catalog.json` upon merge.

> 💡 **Don't want to use GitHub?** You can also submit your exported package directly through our [Community Submission Form](https://forms.gle/QafjhDjpHxTYrahw8), and we'll review and publish it for you.

### 🛡️ Security & Content Guidelines

- **Passive Data Only:** Only `.dinovtt` containers (ZIP archives enclosing Markdown notes, JSON configurations, and standard images) are allowed. Executable code (`.js`, `.wasm`, `.sh`, `.exe`) is strictly prohibited and will be rejected.
- **Open Licensing:** Public packages must declare an open or permissive license (e.g. `CC-BY-4.0`, `CC0`, `MIT`, `OGL 1.0a`, `ORC`).
- **Intellectual Property:** Only submit original creations or third-party content for which you possess explicit authorization or commercial/redistribution rights.
- **Payload Limits:** Keep package sizes reasonable. Heavy media should be compressed before packing.

---

## 🇪🇸 Español

Repositorio oficial del catálogo y tienda de paquetes comunitarios para **Dino Tabletop Engine (DTE)**, el plugin de rol de mesa y tablero virtual (VTT) para Obsidian.

Este repositorio alimenta la tienda comunitaria integrada en el plugin. Los paquetes se distribuyen en contenedores autocontenidos `.dinovtt` y se indexan mediante un archivo descentralizado `catalog.json` generado automáticamente y consumido directamente desde Obsidian.

### 📦 Estructura del Repositorio

```text
├── catalog.json              # Índice autogenerado del catálogo (compilado por GitHub Actions)
├── packages/
│   ├── campana-ejemplo/
│   │   ├── package.json      # Manifiesto con la metadata del paquete
│   │   ├── README.md         # Descripción detallada, manual de juego y créditos
│   │   ├── preview.png       # Miniatura de portada (opcional, proporción 16:9 recomendada)
│   │   └── campana.dinovtt   # Contenedor atómico ZIP (.dinovtt) con notas, mapas y activos
└── scripts/
    └── build-catalog.mjs     # Script validador y compilador del catálogo
```

### 🏷️ Tipos de Paquetes Admitidos

| Tipo | Descripción |
|---|---|
| `campaign` | Módulos de aventura completos con notas, mapas tácticos, tokens y trasfondo |
| `sheet` | Plantillas de hojas de personaje y diseños visuales de ficha |
| `oracle` | Tablas de oráculo para rol en solitario, disparadores narrativos y mazos |
| `tables` | Tablas de tiradas aleatorias y generadores anidados |
| `wargame` | Listas de ejército, perfiles de miniaturas y escenarios de escaramuzas |
| `assets` | Paquetes de tokens, texturas de mapa e ilustraciones para la mesa |
| `bundle` | Paquetes todo-en-uno que combinan aventuras, fichas y tablas complementarias |

### 🚀 ¿Cómo publicar un paquete?

1. **Exportá tu contenido** directamente desde Dino Tabletop Engine como archivo `.dinovtt`.
2. Hacé un **Fork** de este repositorio.
3. Creá una carpeta dedicada dentro de `packages/<id-de-tu-paquete>/`.
4. Copiá tu archivo `<id-de-tu-paquete>.dinovtt` adentro de dicha carpeta.
5. Creá un archivo `package.json` con la metadata correspondiente:

```json
{
  "id": "mi-aventura",
  "name": "La Cripta Sumergida",
  "type": "campaign",
  "version": "1.0.0",
  "author": "Tu Nombre / Nickname",
  "license": "CC-BY-4.0",
  "description": "Una expedición de 3 sesiones para personajes de nivel 3.",
  "tags": ["fantasia", "dungeon-crawl", "osr"],
  "language": "es",
  "dteMinVersion": "0.1.11",
  "requiresModules": ["combat", "diceTray", "character-sheet"],
  "file": "mi-aventura.dinovtt",
  "preview": "preview.png",
  "readme": "README.md"
}
```

6. *(Opcional pero recomendado)* Sumá un archivo `preview.png` (imagen de portada) y un `README.md` (guía para el director de juego o notas de ambientación).
7. Abrí un **Pull Request** hacia la rama `main`.
8. El flujo de GitHub Actions validará el manifiesto, computará el hash criptográfico SHA-256 e integrará el paquete en `catalog.json` al aprobarse el PR.

> 💡 **¿No usás GitHub?** También podés enviar tu paquete directamente a través de nuestro [Formulario de Envío a la Comunidad](https://forms.gle/QafjhDjpHxTYrahw8), y nosotros nos encargamos de revisarlo e indexarlo en la tienda.

### 🛡️ Reglas y Seguridad

- **Solo datos pasivos:** Únicamente se admiten contenedores `.dinovtt` (archivos ZIP compuestos por notas Markdown, configuraciones JSON e imágenes estándar). Está terminantemente prohibido incluir código ejecutable (`.js`, `.wasm`, `.sh`, `.exe`).
- **Licencia abierta obligatoria:** Todo paquete público debe declarar una licencia compatible (ej. `CC-BY-4.0`, `CC0`, `MIT`, `OGL 1.0a`, `ORC`).
- **Respeto de propiedad intelectual:** Publicá exclusivamente contenido original o material de terceros para el cual cuentes con autorización expresa o derechos de redistribución.
- **Optimización de tamaño:** Mantené un tamaño prudente en los archivos comprimiendo imágenes y mapas antes de exportar el paquete.
