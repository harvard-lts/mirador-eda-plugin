import React, { useMemo } from "react"
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
  const transcriptions = useSelector(getEdaTranscription, shallowEqual)
  const hasTranscriptions = Boolean(transcriptions && transcriptions.length > 0)
  console.log("EDA transcriptions available:", hasTranscriptions);
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

  // if transcriptions exist, add EDA Transcriptions button and hide Annotations button
  const plugin = hasTranscriptions
    ? [...(targetProps.PluginComponents || []), EdaTranscriptionButton]
    : targetProps.PluginComponents

  return (
    <TargetComponent
      {...targetProps}
      t={customTranslation}
      panels={{ ...targetProps.panels, annotations: !hasTranscriptions }}
      PluginComponents={plugin}
    />
  )
}

export default {
  target: "WindowSideBarButtons",
  mode: "wrap",
  component: EdaSideBarButtonsWrapper
}
