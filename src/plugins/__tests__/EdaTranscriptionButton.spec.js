/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import pluginConfig, { EdaTranscriptionButton } from "../EdaTranscriptionButton"

// Manually mock the image import since Jest cannot handle image imports directly
jest.mock("../../assets/ornament-large.png", () => "mock-eda-icon.png")

// Mock the utility function
jest.mock("../transcriptionUtils", () => ({
  getEdaTranscription: jest.fn()
}))

// Create a simple Redux store factory function using Redux Toolkit
const createMockStore = (initialState) => {
  return configureStore({
    reducer: (state = initialState) => state,
    preloadedState: initialState
  })
}

describe("EdaTranscriptionButton", () => {
  // Test if component renders a hidden div when no transcriptions
  describe("when no transcriptions are available", () => {
    it("should render a hidden div for DOM manipulation", () => {
      const { container } = render(
        <EdaTranscriptionButton transcriptions={[]} />
      )

      // Should render a hidden div instead of null
      expect(container.firstChild).not.toBeNull()
      expect(container.firstChild).toHaveStyle({ display: "none" })
    })

    it("should hide parent button element when no transcriptions are available", () => {
      // Create parent button structure to match Mirador's DOM
      document.body.innerHTML = `
        <button class="test-parent-button" data-testid="parent-button">
          <span>
            <div id="button-container"></div>
          </span>
        </button>
      `
      const buttonContainer = document.getElementById("button-container")

      // Render component into the button container
      render(
        <EdaTranscriptionButton transcriptions={[]} />,
        { container: buttonContainer }
      )

      // Wait for useLayoutEffect to execute
      // The button should be hidden through DOM manipulation
      const parentButton = document.querySelector('[data-testid="parent-button"]')
      expect(parentButton).toHaveStyle({ display: "none" })
      expect(parentButton).toHaveStyle({ visibility: "hidden" })
      expect(parentButton).toHaveAttribute("tabIndex", "-1")
      expect(parentButton.classList).toContain("eda-button-hidden")
    })

    it("should render a hidden div when transcriptions is undefined", () => {
      const { container } = render(
        <EdaTranscriptionButton transcriptions={undefined} />
      )

      // Should render a hidden div instead of null
      expect(container.firstChild).not.toBeNull()
      expect(container.firstChild).toHaveStyle({ display: "none" })
    })
  })

  // Test if component renders properly when transcriptions are available
  describe("when transcriptions are available", () => {
    it("should render an image with EDA icon", () => {
      const transcriptions = ['<div class="work-body" data-exhibit="emily-dickinson-archive">Sample Transcription</div>']

      render(
        <EdaTranscriptionButton transcriptions={transcriptions} />
      )

      const imgElement = screen.getByAltText("EDA Transcriptions")
      expect(imgElement).toBeInTheDocument()
      expect(imgElement).toHaveAttribute("src", "mock-eda-icon.png")
      expect(imgElement).toHaveStyle({
        height: "1.5rem",
        width: "1.5rem"
      })
    })

    it("should NOT hide parent button when transcriptions are available", () => {
      // Create parent button structure to match Mirador's DOM
      document.body.innerHTML = `
        <button class="test-parent-button" data-testid="parent-button">
          <span>
            <div id="button-container"></div>
          </span>
        </button>
      `
      const buttonContainer = document.getElementById("button-container")

      const transcriptions = ['<div class="work-body" data-exhibit="emily-dickinson-archive">Sample Transcription</div>']

      // Render component into the button container
      render(
        <EdaTranscriptionButton transcriptions={transcriptions} />,
        { container: buttonContainer }
      )

      // Wait for useLayoutEffect to execute
      // The button should NOT be hidden since transcriptions exist
      const parentButton = document.querySelector('[data-testid="parent-button"]')
      expect(parentButton).not.toHaveStyle({ display: "none" })
      expect(parentButton).not.toHaveStyle({ visibility: "hidden" })
      expect(parentButton).not.toHaveAttribute("tabIndex", "-1")
      expect(parentButton.classList).not.toContain("eda-button-hidden")
    })
  })

  // Test the connected component with Redux store
  describe("connected component", () => {
    // Mock implementation for getEdaTranscription
    let store

    beforeEach(() => {
      // Create the mock store with initial state
      const initialState = {
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
                            value: '<div class="work-body" data-exhibit="emily-dickinson-archive">Sample Transcription</div>'
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

      store = createMockStore(initialState)

      // Import the function directly to mock its implementation
      const { getEdaTranscription } = require("../transcriptionUtils")
      getEdaTranscription.mockImplementation(() => ['<div class="work-body" data-exhibit="emily-dickinson-archive">Sample Transcription</div>'])
    })

    it("should connect to Redux and receive transcriptions from state", () => {
      // Get the connected component from the default export array
      const buttonPluginConfig = pluginConfig[0]
      const ConnectedComponent = buttonPluginConfig.component

      render(
        <Provider store={store}>
          <ConnectedComponent />
        </Provider>
      )

      // The component should render because the mocked getEdaTranscription returns transcriptions
      const imgElement = screen.getByAltText("EDA Transcriptions")
      expect(imgElement).toBeInTheDocument()
    })

    it("should render a hidden element when no transcriptions in state", () => {
      // Create a store with no transcriptions
      const emptyStore = createMockStore({})

      // Import and mock getEdaTranscription to return an empty array
      const { getEdaTranscription } = require("../transcriptionUtils")
      getEdaTranscription.mockImplementation(() => [])

      // Get the connected component from the default export array
      const buttonPluginConfig = pluginConfig[0]
      const ConnectedComponent = buttonPluginConfig.component

      render(
        <Provider store={emptyStore}>
          <ConnectedComponent handleClick={() => { }} />
        </Provider>
      )

      // With our updated implementation, the component returns a hidden div
      const hiddenElement = document.querySelector('[data-testid="eda-hidden-container"]')
      expect(hiddenElement).not.toBeNull()
      expect(hiddenElement).toHaveStyle({ display: "none" })
    })
  })

  // Test the static properties
  describe("static properties", () => {
    it("should have the correct value property", () => {
      expect(EdaTranscriptionButton.value).toBe("edaTranscription")
    })
  })

  // Test the plugin configuration
  describe("plugin configuration", () => {
    it("should have the correct target and mode", () => {
      const buttonPluginConfig = pluginConfig[0]

      expect(buttonPluginConfig.target).toBe("WindowSideBarButtons")
      expect(buttonPluginConfig.mode).toBe("add")
      // The connected component is now an object due to how React-Redux works
      // We can verify it"s a valid component by checking if it has render method or is a React component
      expect(buttonPluginConfig.component).toBeDefined()
    })
  })
})
