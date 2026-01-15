/** @vitest-environment jsdom */
import React from "react"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import EdaSideBarButtonsWrapper from "../EdaSideBarButtonsWrapper"
import { getEdaTranscription } from "../transcriptionUtils"

// Mock transcriptionUtils
vi.mock("../transcriptionUtils", () => ({
  getEdaTranscription: vi.fn()
}))

// Mock base components that would be provided by Mirador
const MockButton = ({ value, onClick }) => (
  <button onClick={onClick} data-value={value}>
    {value}
  </button>
)

const MockSidebarButtons = ({
  PluginComponents = [],
  panels = {},
  t = (key) => key
}) => {
  return (
    <div>
      {/* Info button - always visible */}
      <MockButton value="information" onClick={() => { }} />

      {/* Rights button - always visible */}
      <MockButton value="rights" onClick={() => { }} />

      {/* Index button - always visible */}
      <MockButton value="index" onClick={() => { }} />

      {/* Annotations button - conditionally visible */}
      {panels.annotations !== false && (
        <MockButton value="annotations" onClick={() => { }} />
      )}

      {/* Plugin buttons */}
      {PluginComponents.map((Component, index) => (
        <Component key={index} />
      ))}
    </div>
  )
}

describe("EdaSideBarButtonsWrapper", () => {
  const createWrapper = (hasTranscriptions = false) => {
    // Mock the transcription selector
    getEdaTranscription.mockReturnValue(
      hasTranscriptions ? ["some transcription"] : []
    )

    // Mock store
    const store = {
      getState: () => ({}),
      subscribe: vi.fn(),
      dispatch: vi.fn()
    }

    // Get the wrapped component from the plugin config
    const { component: WrappedComponent } = EdaSideBarButtonsWrapper

    return render(
      <Provider store={store}>
        <WrappedComponent
          TargetComponent={MockSidebarButtons}
          panels={{}}
          t={(key, opts) => key}
        />
      </Provider>
    )
  }

  describe("when translations are false (no transcriptions)", () => {
    beforeEach(() => {
      createWrapper(false)
    })

    it("should display the information button", () => {
      const button = screen.getByText("information")
      expect(button).toBeInTheDocument()
    })

    it("should display the rights button", () => {
      const button = screen.getByText("rights")
      expect(button).toBeInTheDocument()
    })

    it("should display the index button", () => {
      const button = screen.getByText("index")
      expect(button).toBeInTheDocument()
    })

    it("should display the annotations button", () => {
      const button = screen.getByText("annotations")
      expect(button).toBeInTheDocument()
    })

    it("should not render the EDA button", () => {
      const button = screen.queryByAltText("EDA Transcriptions")
      expect(button).not.toBeInTheDocument()
    })
  })

  describe("when translations are true (has transcriptions)", () => {
    beforeEach(() => {
      createWrapper(true)
    })

    it("should display the information button", () => {
      const button = screen.getByText("information")
      expect(button).toBeInTheDocument()
    })

    it("should display the rights button", () => {
      const button = screen.getByText("rights")
      expect(button).toBeInTheDocument()
    })

    it("should display the index button", () => {
      const button = screen.getByText("index")
      expect(button).toBeInTheDocument()
    })

    it("should not display the annotations button", () => {
      const button = screen.queryByText("annotations")
      expect(button).not.toBeInTheDocument()
    })

    it("should display the EDA button", () => {
      createWrapper(true)
      const icons = screen.queryAllByTestId("eda-transcription-icon")
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe("translations", () => {
    it("should provide custom translation for EDA button tooltip", () => {
      let capturedTranslation
      const MockComponent = (props) => {
        // Capture the translation for testing
        capturedTranslation = props.t("openCompanionWindow", { context: "edaTranscription" })
        return null
      }

      const { component: Wrapped } = EdaSideBarButtonsWrapper
      render(
        <Provider store={{ getState: () => ({}), subscribe: vi.fn(), dispatch: vi.fn() }}>
          <Wrapped
            TargetComponent={MockComponent}
            t={(key) => key}
          />
        </Provider>
      )

      expect(capturedTranslation).toBe("EDA Transcriptions")
    })

    it("should pass through other translations", () => {
      let capturedTranslation
      const MockComponent = (props) => {
        // Capture the translation for testing
        capturedTranslation = props.t("someOtherKey", { context: "other" })
        return null
      }

      const { component: Wrapped } = EdaSideBarButtonsWrapper
      render(
        <Provider store={{ getState: () => ({}), subscribe: vi.fn(), dispatch: vi.fn() }}>
          <Wrapped
            TargetComponent={MockComponent}
            t={(key) => key}
          />
        </Provider>
      )

      expect(capturedTranslation).toBe("someOtherKey")
    })
  })
})
