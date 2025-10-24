import React, { useLayoutEffect, useRef } from "react"
import { connect } from "react-redux"
import { getEdaTranscription } from "./transcriptionUtils"
import edaIcon from "../assets/ornament-large.png"

/**
 * A button component that displays the EDA icon when transcriptions are available
 * and completely hides itself when no transcriptions are available
 * @param {array} props.transcriptions - Array of transcription HTML strings
 */

export const EdaTranscriptionButton = ({ transcriptions }) => {
  const containerRef = useRef(null)

  // DOM manipulation to hide the EDA button when there are no transcriptions
  useLayoutEffect(() => {
    const hasTranscriptions = transcriptions && transcriptions.length > 0

    if (!hasTranscriptions && containerRef.current) {
      const buttonElement = containerRef.current.closest("button")

      if (buttonElement) {
        const hideButton = (element) => {
          element.style.display = "none"
          element.style.visibility = "hidden"
          element.tabIndex = -1
          element.style.pointerEvents = "none"
          element.classList.add("eda-button-hidden") // used for tests
        }
        hideButton(buttonElement)
      }
    }
  }, [transcriptions])

  return (
    <>
      {(!transcriptions || transcriptions.length === 0) && (
        <div ref={containerRef} data-testid="eda-hidden-container" style={{ display: "none" }} />
      )}
      <img
        src={edaIcon}
        alt="EDA Transcriptions"
        style={{ height: "1.5rem", width: "1.5rem" }}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    transcriptions: getEdaTranscription(state)
  }
}

// this needs to match the companionWindowKey in EdaTranscriptionPanel.js
EdaTranscriptionButton.value = "edaTranscription"

export default [
  {
    target: "WindowSideBarButtons",
    mode: "add",
    component: connect(mapStateToProps)(EdaTranscriptionButton)
  }
]

