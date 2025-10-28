/** @jest-environment jsdom */
import React from "react"
import { render, screen } from "@testing-library/react"
import EdaTranscriptionButton from "../EdaTranscriptionButton"

// Mock the EDA icon import
jest.mock("../../assets/ornament-large.png", () => "mock-eda-icon.png")

describe("EdaTranscriptionButton", () => {
  it("should render with an EDA icon", () => {
    render(<EdaTranscriptionButton />)

    const imgElement = screen.getByAltText("EDA Transcriptions")
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute("src", "mock-eda-icon.png")
    expect(imgElement).toHaveAttribute("value", "edaTranscription")
    expect(imgElement).toHaveStyle({
      height: "1.5rem",
      width: "1.5rem"
    })
  })

  it("should have the correct value property", () => {
    expect(EdaTranscriptionButton.value).toBe("edaTranscription")
  })
})

