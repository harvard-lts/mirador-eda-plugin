import { useSelector, shallowEqual } from "react-redux"
import { getEdaTranscription } from "./transcriptionUtils"

// /**
//  * Wrapper for the WindowSideBarButtons component.
//  * Sets "EDA Transcriptions" for the tooltip text translations for the EDA
//  * Transcriptions button, and hides the Annotations tab when EDA transcriptions
//  * are available.
//  *
//  * The EDA Transcriptions button itself is NOT injected here. In Mirador 4,
//  * WindowSideBarButtons builds its plugin tabs from the global plugin registry
//  * (mode: "add" plugins targeting WindowSideBarButtons) and ignores any
//  * PluginComponents passed via props. EdaTranscriptionButton therefore registers
//  * itself as its own plugin (see EdaTranscriptionButton.jsx).
//  *
//  * @param {Object} props - Component props
//  * @param {React.Component} props.TargetComponent - The component to wrap
//  * @param {Object} props.targetProps - Other props passed to the component
//  */

const EdaSideBarButtonsWrapper = ({ TargetComponent, ...targetProps }) => {
  // shallowEqual prevents re-renders unless transcriptions actually change
  const transcriptions = useSelector(state => getEdaTranscription(state, targetProps.windowId), shallowEqual)
  const hasTranscriptions = Boolean(transcriptions && transcriptions.length > 0)

  // sets the translation for the EDA Transcriptions button tooltip
  const customTranslation = (key, opts) => {
    if (key === "openCompanionWindow" &&
      opts &&
      opts.context === "edaTranscription") {
      return "EDA Transcriptions"
    }

    const originalTranslation = targetProps.t || (key => key)
    return originalTranslation(key, opts)
  }

  return (
    <TargetComponent
      {...targetProps}
      t={customTranslation}
      panels={{ ...targetProps.panels, annotations: !hasTranscriptions }}
    />
  )
}

export default {
  name: "EdaSideBarButtonsWrapper",
  target: "WindowSideBarButtons",
  mode: "wrap",
  component: EdaSideBarButtonsWrapper
}
