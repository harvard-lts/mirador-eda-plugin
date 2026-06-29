import { useState, useRef } from "react"
import { CompanionWindow } from "mirador"
import { connect } from "react-redux"
import { getEdaTranscription } from "./transcriptionUtils"
import { styled } from "@mui/material/styles"
import GlobalStyles from "@mui/material/GlobalStyles"
import {
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material"

/**
 * EDA Transcription Panel Component
 * Displays transcription options and the transcription content
 * Manages state for selected edition, editorial marks, and line breaks
 * @param {array} props.transcriptions - Array of transcription HTML strings
 * @param {string} props.windowId - ID of the current window
 * @param {string} props.id - ID for the companion window
 */

// Class name applied to the CompanionWindow paper element. The width rules live
// in the GlobalStyles block below because CompanionWindow expects a className
// string (paperClassName), not an sx object.
const PAPER_CLASS = "eda-transcription-paper"

// Global rules: the resize handle min-width and the companion window paper
// width. Previously expressed via JSS `@global` in withStyles.
const globalStyles = (theme) => ({
  ".react-draggable": {
    [theme.breakpoints.down("sm")]: {
      minWidth: "235px !important",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "350px !important", // this must match the paper minWidth
    },
  },
  [`.${PAPER_CLASS}`]: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "235px",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "350px", // this must match the companion window minWidth
    },
  },
})

const Root = styled("div")({
  height: "100%",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
})

const Controls = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}))

// The transcription content. Toggle classes (show-linebreaks / hide-edits)
// switch the display of injected markup. The nested selectors target the HTML
// set via dangerouslySetInnerHTML.
const Section = styled("div")(({ theme }) => ({
  flex: 1,
  fontSize: ".875em",
  lineHeight: theme.typography.body2.lineHeight,
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.background.paper,
  borderRight: `0.5px solid ${theme.palette.divider}`,
  overflow: "auto",
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  "& .line": {
    display: "block",
  },
  "& ins:before": {
    content: '"["',
    fontWeight: theme.typography.fontWeightBold,
  },
  "& ins:after": {
    content: '"]"',
    fontWeight: theme.typography.fontWeightBold,
  },
  "& rt": {
    fontSize: "0.833em",
  },
  "& .work-body": {
    whiteSpace: "nowrap",
    "& h3, & h4": {
      fontWeight: theme.typography.fontWeightBold,
      whiteSpace: "normal",
    },
    "& br": {
      display: "none",
    },
  },
  "&.show-linebreaks .work-body br": {
    display: "block",
  },
  "&.hide-edits ins": {
    display: "none",
  },
  "&.hide-edits rt": {
    display: "none",
  },
  "& .stanza": {
    marginBottom: theme.spacing(1.875),
  },
  "& .page-break": {
    borderWidth: "1px 0 0 0",
    borderStyle: "dotted",
    display: "block !important",
  },
}))

const EdaTranscriptionPanel = ({ transcriptions, windowId, id }) => {
  const [selectedEdition, setSelectedEdition] = useState(0)
  const [showPhysicalLinebreaks, setShowPhysicalLinebreaks] = useState(true)
  const [hideEdits, setHideEdits] = useState(false)
  const currentTranscription = transcriptions[selectedEdition] || ""
  const contentRef = useRef(null)

  const getEditionLabel = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const workBody = doc.querySelector(".work-body")
    return workBody?.dataset?.edition || "Unknown Edition"
  }

  const handleEditionChange = (event) => {
    setSelectedEdition(event.target.value)
  }

  const handleLinebreaksChange = (event) => {
    setShowPhysicalLinebreaks(event.target.checked)
  }

  const handleEditsChange = (event) => {
    setHideEdits(event.target.checked)
  }

  const sectionClassName = [
    "section",
    showPhysicalLinebreaks ? "show-linebreaks" : "",
    hideEdits ? "hide-edits" : "",
  ].filter(Boolean).join(" ")

  // CompanionWindow pulls the resizing functionality from Mirador
  // the paperClassName prop allows styles to the underlying container
  return (
    <>
      <GlobalStyles styles={globalStyles} />
      <CompanionWindow
        title="EDA Transcription"
        windowId={windowId}
        id={id}
        paperClassName={PAPER_CLASS}
        // Mirador exports the UNconnected CompanionWindow (`Nw`) as
        // `CompanionWindow`; the connected variant (`ii`) that maps these from
        // the companion-window's Redux record is internal and not exported. So
        // we must supply them ourselves — without isDisplayed the paper renders
        // with `display: none` and collapses to 0×0 (only the ins:before/after
        // "[]" marks leak through), and without position it docks as "null"
        // instead of in the left sidebar.
        isDisplayed
        position="left"
        // `direction` is normally injected by the connected wrapper from the
        // viewer's text-direction state; the unconnected component reads
        // O[direction].opposite and throws on undefined, so default it to ltr.
        direction="ltr"
      >
        {/* handle the case when the panel is opened but no transcriptions exist */}
        {(!transcriptions || transcriptions.length === 0) && (
          <Root>
            <div>
              <Typography variant="body1" sx={{ padding: "16px" }}>
                Emily Dickinson Archive transcriptions are not available for this manuscript.
              </Typography>
            </div>
          </Root>
        )}

        <Root>
          <Controls>
            {transcriptions.length > 0 && (
              <FormControl sx={{ marginBottom: 1, width: "100%" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginBottom: 0.5, fontSize: "0.875rem" }}
                >
                  Edition
                </Typography>
                <Select
                  value={selectedEdition}
                  onChange={handleEditionChange}
                  variant="outlined"
                  margin="dense"
                  sx={{ width: { xs: 230, sm: 300 } }}
                  disabled={transcriptions.length === 1}
                >
                  {transcriptions.map((transcription, index) => (
                    <MenuItem key={index} value={index}>
                      {getEditionLabel(transcription)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={hideEdits}
                  onChange={handleEditsChange}
                  name="edits"
                  color="primary"
                />
              }
              label="Hide Edits"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPhysicalLinebreaks}
                  onChange={handleLinebreaksChange}
                  name="linebreaks"
                  color="primary"
                />
              }
              label="Physical Line Breaks"
            />
          </Controls>

          <Section
            ref={contentRef}
            className={sectionClassName}
            dangerouslySetInnerHTML={{ __html: currentTranscription }}
          />
        </Root>
      </CompanionWindow>
    </>
  )
}

const mapStateToProps = (state, { windowId }) => ({
  transcriptions: getEdaTranscription(state, windowId),
})

export default {
  name: "EdaTranscriptionPanel",
  component: connect(mapStateToProps)(EdaTranscriptionPanel),
  companionWindowKey: "edaTranscription",
}
