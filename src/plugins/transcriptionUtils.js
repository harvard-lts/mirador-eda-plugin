/**
 * Extract the edition name from a transcription HTML string
 * @param {string} html
 * @returns {string} "Unknown Edition" if no name is found
 */

const getEditionName = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const workBody = doc.querySelector(".work-body")
  return workBody?.dataset?.edition || "Unknown Edition"
}

/**
 * Returns an array of EDA transcriptions from the manifest
 * Transcriptions with the same edition name will be combined into a single transcription
 * @param {Object} state
 * @param {string} windowId
 * @returns {array} - empty if EDA no transcriptions exist
 */

export const getEdaTranscription = (state, windowId) => {
  const windows = state?.windows || {}

  let targetWindow
  if (windowId && windows[windowId]) {
    targetWindow = windows[windowId]
  } else {
    const windowIds = Object.keys(windows)
    targetWindow = windowIds.length > 0 ? windows[windowIds[0]] : null
  }

  const canvasId = targetWindow?.canvasId
  const manifestId = targetWindow?.manifestId
  const manifest = manifestId ? state.manifests[manifestId] : null
  if (!manifest?.json || !canvasId) {
    return []
  }

  const canvas = manifest.json.items?.find(item => item.id === canvasId)
  if (!canvas?.annotations) {
    return []
  }

  const allTranscriptions = canvas.annotations
    .flatMap(page => page.items || [])
    .filter(annotation => {
      if (annotation?.body?.format !== "text/html") return false

      const value = annotation?.body?.value
      if (!value) return false

      return value.includes('data-exhibit="emily-dickinson-archive"')
    })
    .map(annotation => annotation.body.value)

  // Group transcriptions by edition name
  const transcriptionsByEdition = allTranscriptions.reduce((acc, html) => {
    const editionName = getEditionName(html)
    if (!acc[editionName]) {
      acc[editionName] = []
    }
    acc[editionName].push(html)
    return acc
  }, {})

  // Combine HTML for editions with multiple transcriptions
  const combinedTranscriptions = Object.entries(transcriptionsByEdition).map(([editionName, htmlArray]) => {
    if (htmlArray.length === 1) {
      return htmlArray[0]
    }

    const parser = new DOMParser()
    const firstDoc = parser.parseFromString(htmlArray[0], "text/html")
    const firstWorkBody = firstDoc.querySelector(".work-body")
    const combinedDoc = parser.parseFromString('<div class="work-body"></div>', "text/html")
    const combinedWorkBody = combinedDoc.querySelector(".work-body")

    if (firstWorkBody.dataset.edition) {
      combinedWorkBody.dataset.edition = firstWorkBody.dataset.edition
    }
    if (firstWorkBody.dataset.exhibit) {
      combinedWorkBody.dataset.exhibit = firstWorkBody.dataset.exhibit
    }

    htmlArray.forEach(html => {
      const doc = parser.parseFromString(html, "text/html")
      const workBody = doc.querySelector(".work-body")

      const title = workBody.querySelector("h3")
      const stanzas = workBody.querySelectorAll(".stanza")

      if (title) {
        const titleClone = title.cloneNode(true)
        combinedWorkBody.appendChild(titleClone)
      }

      stanzas.forEach(stanza => {
        const clone = stanza.cloneNode(true)
        combinedWorkBody.appendChild(clone)
      })

      if (html !== htmlArray[htmlArray.length - 1]) {
        const spacer = combinedDoc.createElement("div")
        spacer.style.height = "2em"
        combinedWorkBody.appendChild(spacer)
      }
    })

    return combinedWorkBody.outerHTML
  })

  return combinedTranscriptions
}
