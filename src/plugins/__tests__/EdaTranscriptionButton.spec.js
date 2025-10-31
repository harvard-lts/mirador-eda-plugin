/** @jest-environment jsdom */
import React from "react"
import { render, screen } from "@testing-library/react"
import EdaTranscriptionButton from "../EdaTranscriptionButton"

describe("EdaTranscriptionButton", () => {
  it("should render with a TitleIcon", () => {
    render(<EdaTranscriptionButton />)
    const icon = screen.getByTestId("eda-transcription-icon")
    expect(icon).toBeInTheDocument()
  })

  it("should have the correct value property", () => {
    expect(EdaTranscriptionButton.value).toBe("edaTranscription")
  })
})

