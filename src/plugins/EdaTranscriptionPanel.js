import React, { useState, createRef } from "react"
import CompanionWindow from "mirador/dist/es/src/containers/CompanionWindow"
import { compose } from "redux"
import { connect } from "react-redux"
import { getEdaTranscription } from "./transcriptionUtils"
import { withStyles } from "@material-ui/core/styles"
import {
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core"

/**
 * EDA Transcription Panel Component
 * Displays transcription options and the transcription content
 * Manages state for selected edition, editorial marks, and line breaks
 * @param {Object} props.classes - JSS classes for styling
 * @param {array} props.transcriptions - Array of transcription HTML strings
 * @param {string} props.windowId - ID of the current window
 * @param {string} props.id - ID for the companion window
 */

const EdaTranscriptionPanel = ({ classes, transcriptions, windowId, id }) => {
  const [selectedEdition, setSelectedEdition] = useState(0)
  const [showPhysicalLinebreaks, setShowPhysicalLinebreaks] = useState(true)
  const [hideEdits, setHideEdits] = useState(false)
  const currentTranscription = transcriptions[selectedEdition] || ""
  const contentRef = createRef()

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

  const sectionClasses = [
    classes.section,
    showPhysicalLinebreaks ? "show-linebreaks" : "",
    hideEdits ? "hide-edits" : "",
  ].filter(Boolean).join(" ")

  // CompanionWindow pulls the resizing functionality from Mirador
  // the paperClassName prop allows styles to the underlying container
  return (
    <CompanionWindow
      title="EDA Transcription"
      windowId={windowId}
      id={id}
      paperClassName={classes.paper}
    >
      {/* handle the case when the panel is opened but no transcriptions exist */}
      {(!transcriptions || transcriptions.length === 0) && (
        <div className={classes.root}>
          <div className={classes.section}>
            <Typography variant="body1" className={classes.noTranscriptionsMessage}>
              Emily Dickinson Archive transcriptions are not available for this manuscript.
            </Typography>
          </div>
        </div>
      )}

      <div className={classes.root}>
        <div className={classes.controls}>
          {transcriptions.length > 0 && (
            <FormControl className={classes.formControl}>
              <Typography variant="body2" className={classes.editionLabel}>
                Edition
              </Typography>
              <Select
                value={selectedEdition}
                onChange={handleEditionChange}
                variant="outlined"
                margin="dense"
                className={classes.selectInput}
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
        </div>

        <div
          ref={contentRef}
          className={sectionClasses}
          dangerouslySetInnerHTML={{ __html: currentTranscription }}
        />
      </div>
    </CompanionWindow>
  )
}

const styles = (theme) => ({
  "@global": {
    ".react-draggable": {
      minWidth: "350px !important", // this must match the paper minWidth
    }
  },
  root: {
    height: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    minWidth: "350px", // this must match the companion window minWidth
  },
  controls: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  editionLabel: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    fontSize: "0.875rem",
  },
  selectInput: {
    width: 300
  },
  section: {
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
      marginBottom: theme.spacing(1.875)
    },
    "& .page-break": {
      borderWidth: "1px 0 0 0",
      borderStyle: "dotted",
      display: "block !important",
    },
  },
  noTranscriptionsMessage: {
    padding: "16px"
  },
})

const mapStateToProps = (state, { windowId }) => ({
  transcriptions: getEdaTranscription(state, windowId),
})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)

export default {
  component: enhance(EdaTranscriptionPanel),
  companionWindowKey: "edaTranscription"
}

