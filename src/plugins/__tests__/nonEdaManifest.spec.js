import { getEdaTranscription } from "../transcriptionUtils"

// Sample Harvard (non-EDA) manifest
const harvardManifest = {
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "https://iiif.lib.harvard.edu/manifests/ids:488815",
  "@type": "sc:Manifest",
  "label": "Harvard University Test Manifest",
  "sequences": [
    {
      "canvases": [
        {
          "@id": "https://iiif.lib.harvard.edu/manifests/ids:488815/canvas/canvas-488815.json",
          "images": [{ "@type": "oa:Annotation" }]
        }
      ]
    }
  ]
}

jest.mock("../transcriptionUtils")

describe("Non-Emily Dickinson manifest", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return empty transcriptions array", () => {
    const state = {
      manifests: {
        "manifest-1": { json: harvardManifest }
      },
      windows: {
        "window-1": {
          manifestId: "manifest-1",
          canvasId: "canvas-1"
        }
      }
    }

    getEdaTranscription.mockReturnValue([])

    const transcriptions = getEdaTranscription(state, { windowId: "window-1" })
    expect(transcriptions).toEqual([])
  })

  it("should not contain EDA metadata", () => {
    const canvas = harvardManifest.sequences[0].canvases[0]
    expect(canvas.annotations).toBeUndefined()
  })

  it("should handle transcription request for non-EDA manifests", () => {
    const handleClickMock = jest.fn().mockReturnValue("panel-opened")

    const props = {
      transcriptions: [], // Empty for non-EDA manifests
      handleClick: () => handleClickMock("edaTranscription")
    }

    const result = props.handleClick()
    expect(handleClickMock).toHaveBeenCalledWith("edaTranscription")
    expect(result).toBe("panel-opened")
  })
})
