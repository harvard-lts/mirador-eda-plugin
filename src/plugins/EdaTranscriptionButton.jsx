import { useSelector, shallowEqual } from "react-redux"
import TitleIcon from "@mui/icons-material/Title"
import { getEdaTranscription } from "./transcriptionUtils"

/**
 * A button component that displays a T icon in the WindowSideBarButtons tab bar.
 * The button triggers the opening of the EDA Transcriptions companion window.
 *
 * In Mirador 4, WindowSideBarButtons renders its plugin tabs from the global
 * plugin registry (mode: "add" plugins targeting WindowSideBarButtons) — it
 * reads the registered component's static `.value` to wire up the tab. The
 * wrapper's `PluginComponents` prop is ignored. So the button registers itself
 * as its own plugin and hides (renders null) when no EDA transcriptions exist.
 */

const EdaTranscriptionButton = ({ windowId }) => {
  // shallowEqual prevents re-renders unless transcriptions actually change
  const transcriptions = useSelector(
    state => getEdaTranscription(state, windowId),
    shallowEqual
  )
  const hasTranscriptions = Boolean(transcriptions && transcriptions.length > 0)

  if (!hasTranscriptions) return null

  return (
    <TitleIcon data-testid="eda-transcription-icon" />
  )
}

// this needs to match the companionWindowKey in EdaTranscriptionPanel.jsx;
// Mirador uses it as the tab value / companion window content key.
EdaTranscriptionButton.value = "edaTranscription"

export default {
  name: "EdaTranscriptionButton",
  target: "WindowSideBarButtons",
  mode: "add",
  component: EdaTranscriptionButton,
  // Mirador 4's sidebar Tab renders its tooltip/aria-label from i18next via
  // useTranslation() — t("openCompanionWindow", { context: "edaTranscription" })
  // — not from any `t` prop. i18next resolves that to the key
  // `openCompanionWindow_edaTranscription`. Mirador deep-merges each plugin's
  // `config` into the global config, so shipping the translation here labels the
  // tab "EDA Transcriptions" for every consumer without extra config.
  config: {
    translations: {
      en: {
        openCompanionWindow_edaTranscription: "EDA Transcriptions",
      },
    },
  },
}
