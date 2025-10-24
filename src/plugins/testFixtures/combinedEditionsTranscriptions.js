/**
 * Test fixtures containing multiple Emily Dickinson transcriptions used for testing
 * the transcription combination functionality.
 * 
 * Includes:
 * - F3B "On this wondrous sea" (Franklin Variorum 1998)
 * - F9A "Oh if remembering were forgetting" (Franklin Variorum 1998)
 * - A different edition transcription for testing separation
 * 
 * Structure of each transcription:
 * - Root div with work-body class and edition metadata
 * - H3 header with poem title
 * - Multiple stanza paragraphs
 * - Each line wrapped in span with line number
 * - <br class="emily author"> for line breaks
 */

export const transcriptionF3B = `<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Franklin Variorum 1998">
  <h3>F3B - On this wondrous sea </h3>

  <p class="stanza linebreak-emily" data-number="0">
    <span class="line" data-line="1">On this wondrous sea - sailing silently -<br class="emily author"/></span>
    <span class="line" data-line="2">Ho! Pilot! Ho!  <br class="emily author"/></span>
    <span class="line" data-line="3">Knowest thou the shore <br class="emily author"/></span>
    <span class="line" data-line="4">Where no breakers roar - <br class="emily author"/></span>
    <span class="line" data-line="5">Where the storm is o'er?<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="1">
    <span class="line" data-line="6">In the silent West <br class="emily author"/></span>
    <span class="line" data-line="7">Many - the sails at rest - <br class="emily author"/></span>
    <span class="line" data-line="8">The anchors fast.  <br class="emily author"/></span>
    <span class="line" data-line="9">Thither I pilot thee - <br class="emily author"/></span>
    <span class="line" data-line="10">Land! Ho! Eternity!<br class="emily author"/></span>
    <span class="line" data-line="11">Ashore at last!  <br class="emily author"/></span>
  </p>
</div>`

export const transcriptionF9A = `<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Franklin Variorum 1998">
  <h3>F9A - Oh if remembering were forgetting </h3>

  <p class="stanza linebreak-emily" data-number="0">
    <span class="line" data-line="1"><em>Oh</em> if remembering were forgetting -<br class="emily author"/></span>
    <span class="line" data-line="2">Then I remember not!  <br class="emily author"/></span>
    <span class="line" data-line="3">And if forgetting - recollecting - <br class="emily author"/></span>
    <span class="line" data-line="4">How near I had forgot!<span class="page-break"></span><br class="emily author"/></span>
    <span class="line" data-line="5">And if to miss - were merry -<br class="emily author"/></span>
    <span class="line" data-line="6">And to mourn were gay, <br class="emily author"/></span>
    <span class="line" data-line="7">How very blithe the maiden <br class="emily author"/></span>
    <span class="line" data-line="8">Who gathered these today!  <br class="emily author"/></span>
  </p>
</div>`

export const differentEditionTranscription = `<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Poems 1896">
  <h3>P96-165 - ETERNITY</h3>

  <p class="stanza linebreak-emily" data-number="0">
    <span class="line" data-line="1">On this wondrous sea,<br class="emily author"/></span>
    <span class="line" data-line="2">Sailing silently,<br class="emily author"/></span>
    <span class="line" data-line="3">Ho! pilot, ho!<br class="emily author"/></span>
  </p>
</div>`
