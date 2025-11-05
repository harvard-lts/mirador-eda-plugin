import EdaTranscriptionPanel from "./plugins/EdaTranscriptionPanel"
import EdaSideBarButtonsWrapper from "./plugins/EdaSideBarButtonsWrapper"

// suppressing a console warning message that has been fixed in Mirador v4
import "./plugins/utils/suppressWarnings"

export { 
  EdaSideBarButtonsWrapper,
  EdaTranscriptionPanel
};

export default [
  EdaSideBarButtonsWrapper,
  EdaTranscriptionPanel
];
