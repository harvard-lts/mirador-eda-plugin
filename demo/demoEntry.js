import Mirador from "mirador/dist/es/src/index"
import Plugin from "../src/index"
import miradorCitationPlugin from "@harvard-lts/mirador-citation-plugin";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    id: "mirador",
    windows: [
      {
        // manifestId: "data/manifest-3037.json" // EDA manifest with two transcriptions
        // manifestId: "https://iiif.lib.harvard.edu/manifests/ids:488815" // non-EDA manifest
        // Static local manifest files for testing
        manifestId: "data/manifest-609.json" // EDA manifest with one transcription
        // manifestId: "data/manifest-5f3b.json" // EDA manifest with two transcriptions on one edition
      },
      /*{
        // Manifest on Dev with EDA transcriptions
        manifestId: "https://mps-dev.lib.harvard.edu/iiif/3/URN-3:HUL.EDA:C4837"
      },*/
      /*{
        // Manifest on Dev with non-EDA transcriptions
        manifestId: "https://nrs-dev.lib.harvard.edu/URN-3:RAD.SCHL:101118966:MANIFEST:3"
      }*/
    ],
    translations: { // These can be removed when removing the citation plugin
      "en": {
        "openCompanionWindow_CitationKey": "Cite",
        "openCompanionWindow_RelatedLinksKey": "Related Links",
    },
    miradorCitationPlugin: {
      citationAPI: 'https://mps.lib.harvard.edu/citation/'
    },
  },
  }

  const plugins = [
    ...Plugin,
    miradorCitationPlugin,
  ]

  // Mirador dispatches an action to load the manifest into the global state
  Mirador.viewer(config, plugins)
})
