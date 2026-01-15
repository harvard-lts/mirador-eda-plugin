/**
 * @vitest-environment jsdom
 */
import { getEdaTranscription } from "../transcriptionUtils"
import {
  transcriptionF3B,
  transcriptionF9A,
  differentEditionTranscription
} from "../testFixtures/combinedEditionsTranscriptions"

describe("in transcriptionUtils", () => {
  describe("the getEdaTranscription function should return an empty array when", () => {
    it("state is empty", () => {
      const emptyState = {}
      expect(getEdaTranscription(emptyState)).toEqual([])
    })

    it("there are no windows in state", () => {
      const stateWithoutWindows = {
        windows: {}
      }
      expect(getEdaTranscription(stateWithoutWindows)).toEqual([])
    })

    it("the manifest is missing", () => {
      const stateWithoutManifest = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {}
      }
      expect(getEdaTranscription(stateWithoutManifest)).toEqual([])
    })

    it("the manifest has no json", () => {
      const stateWithManifestNoJson = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": { foo: "bar" }
        }
      }
      expect(getEdaTranscription(stateWithManifestNoJson)).toEqual([])
    })

    it("the canvas is not found", () => {
      const stateWithMissingCanvas = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": {
            json: {
              items: [
                { id: "different-canvas" }
              ]
            }
          }
        }
      }
      expect(getEdaTranscription(stateWithMissingCanvas)).toEqual([])
    })

    it("the canvas exists but has no annotations", () => {
      const stateWithCanvasNoAnnotations = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": {
            json: {
              items: [
                { id: "canvas-1" }
              ]
            }
          }
        }
      }
      expect(getEdaTranscription(stateWithCanvasNoAnnotations)).toEqual([])
    })

    it("the annotations exist but don't contain a work-body class", () => {
      const stateWithNonWorkBodyAnnotations = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": {
            json: {
              items: [
                {
                  id: "canvas-1",
                  annotations: [
                    {
                      items: [
                        {
                          body: {
                            format: "text/html",
                            value: "<div>Not a work-body class</div>"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      }
      expect(getEdaTranscription(stateWithNonWorkBodyAnnotations)).toEqual([])
    })

    it("annotations exist but don't contain data-exhibit=\"emily-dickinson-archive\"", () => {
      const stateWithNonArchiveAnnotations = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": {
            json: {
              items: [
                {
                  id: "canvas-1",
                  annotations: [
                    {
                      items: [
                        {
                          body: {
                            format: "text/html",
                            value: '<div class="work-body">Missing Emily Dickinson Archive attribute</div>'
                          }
                        },
                        {
                          body: {
                            format: "text/html",
                            value: '<div class="work-body" data-exhibit="some-other-archive">Wrong archive attribute</div>'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      }
      expect(getEdaTranscription(stateWithNonArchiveAnnotations)).toEqual([])
    })

    it("there is a non-EDA manifest", () => {
      const harvardManifest = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "https://iiif.lib.harvard.edu/manifests/ids:488815",
        "@type": "sc:Manifest",
        "label": "Harvard University, Harvard College Library Harvard-Yenching Library, W171744_1",
        "sequences": [
          {
            "canvases": [
              {
                "@id": "https://iiif.lib.harvard.edu/manifests/ids:488815/canvas/canvas-488815.json",
                "images": [
                  {
                    "@id": "https://iiif.lib.harvard.edu/manifests/ids:488815/annotation/anno-488815.json",
                    "@type": "oa:Annotation"
                  }
                ]
              }
            ]
          }
        ]
      }

      const stateWithHarvardManifest = {
        windows: {
          "window-1": {
            manifestId: "harvard-manifest",
            canvasId: "https://iiif.lib.harvard.edu/manifests/ids:488815/canvas/canvas-488815.json"
          }
        },
        manifests: {
          "harvard-manifest": {
            json: harvardManifest
          }
        }
      }

      // Harvard manifest doesn't have EDA transcriptions
      expect(getEdaTranscription(stateWithHarvardManifest)).toEqual([])
    })
  })

  describe("the getEdaTranscription function should extract transcriptions", () => {
    it("that have a work-body class and emily-dickinson-archive attribute", () => {
      const workBodyHtml1 = '<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Edition 1">Transcription 1</div>'
      const workBodyHtml2 = '<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Edition 2">Transcription 2</div>'

      const stateWithTranscriptions = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": {
            json: {
              items: [
                {
                  id: "canvas-1",
                  annotations: [
                    {
                      items: [
                        {
                          body: {
                            format: "text/html",
                            value: workBodyHtml1
                          }
                        },
                        {
                          body: {
                            format: "text/html",
                            value: workBodyHtml2
                          }
                        },
                        {
                          // This should be skipped (not text/html)
                          body: {
                            format: "text/plain",
                            value: '<div class="work-body">Ignored</div>'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      }

      const result = getEdaTranscription(stateWithTranscriptions, "window-1")
      expect(result).toHaveLength(2) // One for each edition
      expect(result.some(html => html.includes('Edition 1'))).toBe(true)
      expect(result.some(html => html.includes('Edition 2'))).toBe(true)
    })

    it("from multiple annotation pages", () => {
      const workBodyHtml1 = '<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Edition 1">Transcription 1</div>'
      const workBodyHtml2 = '<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Edition 2">Transcription 2</div>'

      const stateWithMultipleAnnotationPages = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": {
            json: {
              items: [
                {
                  id: "canvas-1",
                  annotations: [
                    {
                      items: [
                        {
                          body: {
                            format: "text/html",
                            value: workBodyHtml1
                          }
                        }
                      ]
                    },
                    {
                      items: [
                        {
                          body: {
                            format: "text/html",
                            value: workBodyHtml2
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      }

      const result = getEdaTranscription(stateWithMultipleAnnotationPages, "window-1")
      expect(result).toHaveLength(2) // One for each edition
      expect(result.some(html => html.includes('Edition 1'))).toBe(true)
      expect(result.some(html => html.includes('Edition 2'))).toBe(true)
    })
  })

  describe("the getEdaTranscription function should handle", () => {
    it("missing annotation items array safely", () => {
      const stateWithMissingItems = {
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas-1"
          }
        },
        manifests: {
          "manifest-1": {
            json: {
              items: [
                {
                  id: "canvas-1",
                  annotations: [
                    {
                      // No items array
                    },
                    {
                      items: [
                        {
                          // No body
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      }

      // Should not throw errors with optional chaining
      expect(() => getEdaTranscription(stateWithMissingItems)).not.toThrow()
      expect(getEdaTranscription(stateWithMissingItems)).toEqual([])
    })
  })

  describe("the getEdaTranscription function should", () => {
    const createMockState = (transcriptions) => ({
      windows: {
        "window-1": {
          manifestId: "manifest-1",
          canvasId: "canvas-1"
        }
      },
      manifests: {
        "manifest-1": {
          json: {
            items: [{
              id: "canvas-1",
              annotations: [{
                items: transcriptions.map(transcription => ({
                  body: {
                    format: "text/html",
                    value: transcription
                  }
                }))
              }]
            }]
          }
        }
      }
    })

    it("combines transcriptions from the same edition while preserving titles", () => {
      const state = createMockState([transcriptionF3B, transcriptionF9A])
      const result = getEdaTranscription(state, "window-1")

      // Should return one combined transcription
      expect(result).toHaveLength(1)

      const normalizedResult = result[0].replace(/\s+/g, " ").trim()

      // The combined transcription should contain both titles
      expect(normalizedResult).toContain("F3B - On this wondrous sea")
      expect(normalizedResult).toContain("F9A - Oh if remembering were forgetting")

      // Should preserve the edition information
      expect(normalizedResult).toContain('data-edition="Franklin Variorum 1998"')

      // Should contain content from both poems (checking for unique phrases)
      expect(normalizedResult).toMatch(/wondrous sea.*sailing silently/)
      expect(normalizedResult).toMatch(/Oh.*if remembering were forgetting/)
    })

    it("keeps transcriptions from different editions separate", () => {
      const state = createMockState([transcriptionF3B, differentEditionTranscription])
      const result = getEdaTranscription(state, "window-1")

      // Should return two separate transcriptions
      expect(result).toHaveLength(2)

      // Should preserve different edition information
      expect(result.find(t => t.includes("Franklin Variorum 1998"))).toBeTruthy()
      expect(result.find(t => t.includes("Poems 1896"))).toBeTruthy()
    })

    it("maintains original transcription when only one exists", () => {
      const state = createMockState([transcriptionF3B])
      const result = getEdaTranscription(state, "window-1")

      expect(result).toHaveLength(1)
      expect(result[0]).toBe(transcriptionF3B)
    })
  })
})
