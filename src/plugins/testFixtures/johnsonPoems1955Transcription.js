/**
 * Test fixture representing a transcription from the Johnson Poems 1955 edition.
 * Contains Emily Dickinson's poem "J577 - If I may have it, when it's dead"
 * with editorial markup including revision annotations and line breaks.
 * 
 * Structure:
 * - Root div with work-body class and edition metadata
 * - H3 header with poem title
 * - Multiple stanza paragraphs
 * - Each line wrapped in span with line number
 * - Editorial marks:
 *   - <br class="emily author"> for line breaks
 *   - <ruby class="revision"> for variant readings
 *   - Empty stanzas at end for formatting
 */

const johnsonPoems1955 = `<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Johnson Poems 1955">
  <h3>J577 - If I may have it, when it's dead</h3>

  <p class="stanza linebreak-emily" data-number="0">
    <span class="line" data-line="1">If I may have it, when it's dead,<br class="emily author"/></span>
    <span class="line" data-line="2">I'll be contented -- <ruby class="revision"><rt>now --</rt></ruby>so --<br class="emily author"/></span>
    <span class="line" data-line="3">If just as soon as Breath is out<br class="emily author"/></span>
    <span class="line" data-line="4">It shall belong to me --<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="1">
    <span class="line" data-line="5">Until they lock it in the Grave,<br class="emily author"/></span>
    <span class="line" data-line="6">'Tis <ruby class="revision"><rt>Wealth I cannot weigh</rt></ruby>
      Bliss I cannot weigh --<br class="emily author"/></span>
    <span class="line" data-line="7">For tho' they lock Thee in the Grave,<br class="emily author"/></span>
    <span class="line" data-line="8">Myself -- can <ruby class="revision"> <rt>hold</rt></ruby>
  own the key --<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="2">
    <span class="line" data-line="9">Think of it Lover! I and Thee<br class="emily author"/></span>
    <span class="line" data-line="10">Permitted -- face to face to be --<br class="emily author"/></span>
    <span class="line" data-line="11">After a Life -- a Death -- We'll say --<br class="emily author"/></span>
    <span class="line" data-line="12">For Death was That<br class="emily author"/></span>
    <span class="line" data-line="13">And This -- is Thee --<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="3">
    <span class="line" data-line="14">I'll tell Thee All -- how <ruby class="revision"> <rt>Blank --</rt></ruby>Bald it grew --<br class="emily author"/></span>
    <span class="line" data-line="15">How Midnight felt, at first -- to me --<br class="emily author"/></span>
    <span class="line" data-line="16">How all the Clocks stopped in the World --<br class="emily author"/></span>
    <span class="line" data-line="17">And Sunshine pinched me -- 'Twas so cold --<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="4">
    <span class="line" data-line="18">Then how the Grief got sleepy -- some --<br class="emily author"/></span>
    <span class="line" data-line="19">As if my Soul were deaf and dumb --<br class="emily author"/></span>
    <span class="line" data-line="20">Just making signs -- <ruby class="revision"> <rt>it seemed</rt></ruby>across -- to Thee --<br class="emily author"/></span>
    <span class="line" data-line="21">That this way -- thou could'st <ruby class="revision"> <rt>speak to --</rt></ruby>notice me --<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="5">
    <span class="line" data-line="22">I'll tell you how I tried to keep<br class="emily author"/></span>
    <span class="line" data-line="23">A smile, to show you, when this Deep<br class="emily author"/></span>
    <span class="line" data-line="24">All Waded -- We look back for Play,<br class="emily author"/></span>
    <span class="line" data-line="25">At those Old Times -- in Calvary.<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="6">
    <span class="line" data-line="26">Forgive me, if the Grave come slow --<br class="emily author"/></span>
    <span class="line" data-line="27">For Coveting to look at Thee --<br class="emily author"/></span>
    <span class="line" data-line="28">Forgive me, if to stroke thy frost<br class="emily author"/></span>
    <span class="line" data-line="29">Outvisions Paradise!<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="7">
  </p>

  <p class="stanza linebreak-emily" data-number="8">
  </p>

  <p class="stanza linebreak-emily" data-number="9">
  </p>

  <p class="stanza linebreak-emily" data-number="10">
  </p>

  <p class="stanza linebreak-emily" data-number="11">
  </p>
</div>
`
export default johnsonPoems1955
