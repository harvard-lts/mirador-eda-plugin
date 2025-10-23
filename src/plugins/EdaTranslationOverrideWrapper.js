/**
 * Wrapper component to control tooltip text translations for EDA Transcriptions button
 * @param {React.Component} props.TargetComponent - The component to wrap
 * @param {Object} props.otherProps - Other props passed to the component
 */

const EdaTranslationOverrideWrapper = ({ TargetComponent, ...otherProps }) => {
  const customT = (key, args) => {
    if (key === "openCompanionWindow" &&
      args &&
      args.context === "edaTranscription") {
      return "EDA Transcriptions"
    }

    const originalT = otherProps.t || (key => key)
    return originalT(key, args)
  }
  return <TargetComponent {...otherProps} t={customT} />
}

export default {
  target: "WindowSideBarButtons",
  mode: "wrap",
  component: EdaTranslationOverrideWrapper
}
