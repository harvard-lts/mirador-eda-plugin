import React from "react"
import { useSelector, shallowEqual } from "react-redux"
import { getEdaTranscription } from "./transcriptionUtils"
import EdaTranscriptionButton from "./EdaTranscriptionButton"

// /**
//  * Wrapper for the WindowSideBarButtons component
//  * Sets "EDA Transcriptions" for the tooltip text translations for EDA Transcriptions button
//  * Hides the Annotation button when EDA transcriptions are available
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

  // if transcriptions exist, return the EDA Transcriptions button and hide all other plugin buttons
  const edaPlugin = hasTranscriptions ? [EdaTranscriptionButton] : targetProps.PluginComponents

  return (
    <TargetComponent
      {...targetProps}
      t={customTranslation}
      PluginComponents={edaPlugin}
    />
  )
}

export default {
  target: "WindowSideBarButtons",
  mode: "wrap",
  component: EdaSideBarButtonsWrapper
}
