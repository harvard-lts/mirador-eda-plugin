import React from "react"
import edaIcon from "../assets/ornament-large.png"

/**
 * A button component that displays the EDA icon for the EDA Transcriptions companion window
 */

const EdaTranscriptionButton = () => {
  return (
    <img
      src={edaIcon}
      alt="EDA Transcriptions"
      style={{ height: "1.5rem", width: "1.5rem" }}
      value="edaTranscription"
    />
  )
}

// this needs to match the companionWindowKey in EdaTranscriptionPanel.js
EdaTranscriptionButton.value = "edaTranscription"

export default EdaTranscriptionButton

