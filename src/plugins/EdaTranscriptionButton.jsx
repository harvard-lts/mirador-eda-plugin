import TitleIcon from "@mui/icons-material/Title"

/**
 * A button component that displays a T icon
 * The button triggers the opening of the EDA Transcriptions companion window 
 */

const EdaTranscriptionButton = () => {
  return (
    <TitleIcon data-testid="eda-transcription-icon" />
  )
}

// this needs to match the companionWindowKey in EdaTranscriptionPanel.js
EdaTranscriptionButton.value = "edaTranscription"

export default EdaTranscriptionButton

