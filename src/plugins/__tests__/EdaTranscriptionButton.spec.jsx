/** @vitest-environment jsdom */
import React from "react"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import EdaTranscriptionButton from "../EdaTranscriptionButton.jsx"
import { getEdaTranscription } from "../transcriptionUtils"

// Mock transcriptionUtils so we control whether transcriptions "exist"
vi.mock("../transcriptionUtils", () => ({
  getEdaTranscription: vi.fn()
}))

const store = {
  getState: () => ({}),
  subscribe: vi.fn(),
  dispatch: vi.fn()
}

// The default export is the Mirador plugin descriptor; the rendered tab is its
// `component`.
const { component: Button } = EdaTranscriptionButton

const renderButton = (hasTranscriptions) => {
  getEdaTranscription.mockReturnValue(hasTranscriptions ? ["some transcription"] : [])
  return render(
    <Provider store={store}>
      <Button windowId="w1" />
    </Provider>
  )
}

describe("EdaTranscriptionButton", () => {
  it("registers as a WindowSideBarButtons add plugin", () => {
    // In Mirador 4 the sidebar reads buttons from the plugin registry, so the
    // descriptor must target WindowSideBarButtons in mode "add".
    expect(EdaTranscriptionButton.target).toBe("WindowSideBarButtons")
    expect(EdaTranscriptionButton.mode).toBe("add")
  })

  it("exposes the companion-window value on the component", () => {
    // Mirador reads `.value` off the component to wire up the tab / companion
    // window key; it must match EdaTranscriptionPanel's companionWindowKey.
    expect(Button.value).toBe("edaTranscription")
  })

  it("ships the tooltip translation in its config", () => {
    expect(
      EdaTranscriptionButton.config.translations.en.openCompanionWindow_edaTranscription
    ).toBe("EDA Transcriptions")
  })

  it("renders a TitleIcon when transcriptions exist", () => {
    renderButton(true)
    expect(screen.getByTestId("eda-transcription-icon")).toBeInTheDocument()
  })

  it("renders nothing when no transcriptions exist", () => {
    renderButton(false)
    expect(screen.queryByTestId("eda-transcription-icon")).not.toBeInTheDocument()
  })
})
