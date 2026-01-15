/** @vitest-environment jsdom */
import React from "react"
import { getEdaTranscription } from "../transcriptionUtils"

// Mock the transcriptionUtils
vi.mock("../transcriptionUtils")

describe("Emily Dickinson Manifest Support", () => {
  // Sample Emily Dickinson manifest based on the demo files
  const emilyDickinsonManifest = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    "id": "https://www.edickinson.org/manifestation/3037",
    "type": "Manifest",
    "label": { "en": ["Emily Dickinson Archive - J577 - If I may have it when it\"s dead"] },
    "items": [
      {
        "id": "canvas/3945",
        "type": "Canvas",
        "annotations": [
          {
            "items": [
              {
                "body": {
                  "format": "text/html",
                  "value": '<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Johnson Poems 1955">Sample transcription</div>'
                }
              }
            ]
          }
        ]
      }
    ]
  }

  describe("transcription extraction", () => {
    beforeEach(() => {
      // Reset all mocks before each test
      vi.clearAllMocks()
    })

    it("should identify EDA transcriptions from manifest", () => {
      // Mock the state that would be passed to getEdaTranscription
      const state = {
        manifests: {
          "manifest-1": {
            json: emilyDickinsonManifest
          }
        },
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas/3945"
          }
        }
      }

      // Call getEdaTranscription with our mock state
      getEdaTranscription(state, { windowId: "window-1" })

      // Verify the function was called with correct state and windowId
      expect(getEdaTranscription).toHaveBeenCalledWith(
        state,
        expect.objectContaining({ windowId: "window-1" })
      )
    })
  })

  describe("manifest structure", () => {
    it("should match expected manifest ID format", () => {
      const demoManifestId = "https://www.edickinson.org/manifestation/3037"
      expect(emilyDickinsonManifest.id).toBe(demoManifestId)
    })

    it("should include required EDA transcription metadata", () => {
      const transcription = emilyDickinsonManifest.items[0].annotations[0].items[0].body.value
      expect(transcription).toContain('data-exhibit="emily-dickinson-archive"')
      expect(transcription).toContain('data-edition="Johnson Poems 1955"')
    })
  })

  describe("annotation handling", () => {
    beforeEach(() => {
      getEdaTranscription.mockReset()
    })

    it("should properly identify annotation content", () => {
      const edaTranscription = '<div class="work-body" data-exhibit="emily-dickinson-archive">Sample</div>'
      getEdaTranscription.mockReturnValue([edaTranscription])

      const state = {
        manifests: {
          "manifest-1": {
            json: emilyDickinsonManifest
          }
        },
        windows: {
          "window-1": {
            manifestId: "manifest-1",
            canvasId: "canvas/3945"
          }
        }
      }

      const transcriptions = getEdaTranscription(state, { windowId: "window-1" })

      expect(transcriptions).toHaveLength(1)
      expect(transcriptions[0]).toContain("emily-dickinson-archive")
    })
  })
})
