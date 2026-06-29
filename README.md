# Mirador EDA Plugin

[![Node Unit Tests](https://github.com/harvard-lts/mirador-eda-plugin/actions/workflows/coverage-node.yml/badge.svg)](https://github.com/harvard-lts/mirador-eda-plugin/actions/workflows/coverage-node.yml)

<a href="https://github.com/harvard-lts/mirador-eda-plugin/actions/workflows/coverage-node.yml"><img src="https://github.com/harvard-lts/mirador-eda-plugin/raw/badges/test-coverage/coverage.svg"></a>

A Mirador plugin for displaying Emily Dickinson Archive (EDA) transcriptions with toggleable line breaks and editorial marks. This plugin replicates the viewing experience of [edickinson.org](https://www.edickinson.org) while gracefully handling non-Emily Dickinson manifests.

## Compatibility

This plugin is **Mirador 4-compatible** (React 18/19, MUI 7 + Emotion). It is
**not** backwards compatible with Mirador 3 — the upgrade contains breaking
changes: top-level `mirador` imports (the deep `mirador/dist/es/src/...` paths no
longer resolve), function/hook components, and MUI 7 + Emotion styling in place
of Material-UI 4 + JSS.

Versioning convention for pinning:

- **Mirador 4** releases are tagged `2.x`.
- **Mirador 3** releases are tagged `0.x` / `1.x` — pin one of these if you still
  need Mirador 3.

## Features

- **Edition Switcher**: Dropdown to switch between different editions (e.g., Franklin Variorum 1998, Johnson Poems 1955)
- **Line Break Toggle**: Show/hide physical line breaks in the manuscript (shows metric line breaks by default)
- **Editorial Marks Toggle**: Show/hide editorial marks and textual variants (hided edits by default)
- **HTML Rendering**: Full support for HTML tags including `ruby`, `ins`, `em`, `strong`, `br`, and more
- **Textual Variants**: Display alternate readings and editorial choices
- **EDA Icon**: Custom fern ornament icon in the sidebar
- **Smart Manifest Handling**: Automatically detects Emily Dickinson content and only shows the transcription button when relevant while hiding the default Annotations button

## Requirements

- [NVM](https://github.com/nvm-sh/nvm)
- Node.js 22+ (see `.nvmrc`)
- Mirador 4.x

## Setup

1. Run `npm i` to install dependencies
2. Use one of the [NPM scripts](#npm-scripts) to perform the actions described below.

## NPM scripts

The following are some useful scripts can be ran using `npm run <script>`. A full list can be seen in [package.json](./package.json)

| Script  | Description                                                                                                                |
| ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `build` | Builds the source files into the `./dist` directory                                                                        |
| `serve` | Spins up the local development server at http://localhost:9000                                                             |
| `test`  | Runs the test suite                                                                                                        |

## Installing in Mirador

The `@harvard-lts/mirador-eda-plugin` requires an instance of Mirador 4. Visit the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) and the [Creating a Mirador 4 Plugin](https://github.com/ProjectMirador/mirador/wiki/Creating-a-Mirador-4-Plugin) page for information about installing and building plugins.

### Installation

```bash
npm i @harvard-lts/mirador-eda-plugin
```

## Emily Dickinson Archive IIIF Manifest

For the plugin to show transcriptions, your IIIF manifest should include annotations with the following structure:

```json
{
  "annotations": [
    {
      "id": "annotation_page_id",
      "type": "AnnotationPage",
      "items": [
        {
          "id": "annotation_id",
          "type": "Annotation",
          "motivation": "commenting",
          "body": {
            "type": "Text",
            "language": "en",
            "format": "text/html",
            "value": "<div class=\"work-body\" data-exhibit=\"emily-dickinson-archive\" data-edition=\"Edition Name\">...</div>"
          },
          "target": "canvas_id"
        }
      ]
    }
  ]
}
```

**Important:** The plugin specifically looks for the `data-exhibit="emily-dickinson-archive"` attribute to identify Emily Dickinson transcriptions.

### Non-Emily Dickinson Manifests

For non-Emily Dickinson manifests, the plugin will automatically:

1. Hide the transcription button from the sidebar
2. If a user somehow activates the panel (via API or programmatically), it will display a helpful message explaining that transcriptions are only available for Emily Dickinson content

### Supported HTML Tags

The plugin supports the following HTML tags and classes:

- **Required attributes**: `data-exhibit="emily-dickinson-archive"` on `.work-body`
- **Edition identification**: `data-edition` attribute on `.work-body`
- **Line breaks**: `<br class="emily">` and `<br class="emily author">`
- **Textual variants**: `<ruby>`, `<rt>`, `<rp>` tags
- **Alternate readings**: `<ins class="alternate">`
- **Text formatting**: `<em>`, `<strong>`, `<p>`, `<span>`
- **Stanzas**: Elements with `class="stanza"`
- **Lines**: Elements with `class="line"`

## Plugin Architecture

The plugin consists of these main components:

1. **EdaTranscriptionButton**: Adds the EDA icon to the sidebar (only visible for EDA manifests)
2. **EdaTranscriptionPanel**: Displays the transcription content with controls
3. **EdaTranslationOverrideWrapper**: Provides translation and configuration
4. **transcriptionUtils**: Utility functions for extracting transcriptions from manifests

## Development

```bash
# Install dependencies
npm i

# Start development server
npm run serve

# Run tests
npm test
```

The development server will start at http://localhost:9000 and automatically reload when you make changes.

### Testing

The plugin includes comprehensive tests using Vitest and React Testing Library. The test suite is organized by responsibility:

```bash
# Run all tests
npm test

# Run specific test files
npm test src/plugins/__tests__/[filename].spec.js
```

Test Files and Responsibilities:

#### Component Tests
- `EdaTranscriptionButton.spec.jsx` - Tests button rendering, visibility, and interaction
- `EdaTranscriptionPanel.spec.jsx` - Tests panel UI, transcription display, and controls
- `EdaSideBarButtonsWrapper.spec.jsx` - Tests sidebar button container and layout

#### Manifest Tests
- `edaManifest.spec.js` - Tests Emily Dickinson manifest handling and transcription extraction
- `nonEdaManifest.spec.js` - Tests non-Emily Dickinson manifest behavior
- `transcriptionUtils.spec.js` - Tests utility functions for transcription processing

#### Test Fixtures
Organized by edition in `testFixtures/`:
- `johnsonPoems1955Transcription.js` - Johnson 1955 edition samples
- `franklinVariorum1998Transcription.js` - Franklin Variorum 1998 samples
- `combinedEditionsTranscriptions.js` - Multi-edition test cases

Testing Philosophy:
- Component tests focus on user interaction and rendering
- Manifest tests verify data handling and structure
- Each test file has a single responsibility
- Mocks are used judiciously to isolate functionality
- React Testing Library encourages testing user behavior over implementation

## Demo

The plugin includes a demo environment with sample manifests:

1. Emily Dickinson Archive manifest (`data/manifest-3037.json` and `data/manifest-609.json`)
2. Non-Emily Dickinson manifest from Harvard (`https://iiif.lib.harvard.edu/manifests/ids:488815`)

To switch between them, edit the `manifestId` in `demo/demoEntry.js`.
