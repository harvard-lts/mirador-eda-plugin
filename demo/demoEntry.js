import Mirador from "mirador/dist/es/src/index"
import Plugin from "../src/index"

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    id: "mirador",
    windows: [
      {
        // manifestId: "data/manifest-3037.json" // EDA manifest with two transcriptions
        // manifestId: "https://iiif.lib.harvard.edu/manifests/ids:488815" // non-EDA manifest
        manifestId: "data/manifest-609.json" // EDA manifest with one transcription
        // manifestId: "data/manifest-5f3b.json" // EDA manifest with two transcriptions on one edition
      }
    ]
  }

  const plugins = [...Plugin]

  // Mirador dispatches an action to load the manifest into the global state
  Mirador.viewer(config, plugins)
})
