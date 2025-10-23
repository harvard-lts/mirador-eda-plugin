/**
 * Test fixture representing a transcription from the Franklin Variorum 1998 edition.
 * Contains Emily Dickinson's poem "F431A - If I may have it when it's dead"
 * with editorial markup including line breaks, alternate readings, and page breaks.
 * 
 * Structure:
 * - Root div with work-body class and edition metadata
 * - H3 header with poem title
 * - Multiple stanza paragraphs
 * - Each line wrapped in span with line number
 * - Editorial marks:
 *   - <br class="emily"> for original line breaks
 *   - <br class="emily author"> for editorial breaks
 *   - <ins class="alternate"> for variant readings
 *   - <span class="page-break"> for page transitions
 */

const franklinVariorum1998 = `
<div class="work-body" data-exhibit="emily-dickinson-archive" data-edition="Franklin Variorum 1998">
  <h3>F431A - If I may have it when it's dead </h3>
  
  <p class="stanza linebreak-emily" data-number="0">
    <span class="line" data-line="1">If I may have it, when it's<br class="emily"> dead,<br class="emily author"/></span>
    <span class="line" data-line="2">I'll be contented - so - <br class="emily author"/></span>
    <span class="line" data-line="3">If just as soon as Breath<br class="emily"> is out <br class="emily author"/></span>
    <span class="line" data-line="4">It shall belong to me - <br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="1">
    <span class="line" data-line="5">Until they lock it in the<br class="emily"> Grave,<br class="emily author"/></span>
    <span class="line" data-line="6">'Tis <ins class="alternate">Wealth I cannot weigh. • Right [I cannot weigh.]</ins>
      Bliss I cannot weigh - <br class="emily author"/></span>
    <span class="line" data-line="7">For tho' they lock Thee in<br class="emily"> the Grave, <br class="emily author"/></span>
    <span class="line" data-line="8">Myself - can <ins class="alternate">hold</ins>
      own the key - <br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="2">
    <span class="line" data-line="9">Think of it Lover! I and Thee <br class="emily author"/></span>
    <span class="line" data-line="10">Permitted - face to face to be -<br class="emily author"/></span>
    <span class="line" data-line="11">After a Life - a Death -<br class="emily"> we'll say - <br class="emily author"/></span>
    <span class="line" data-line="12">For Death was That - <br class="emily author"/></span>
    <span class="line" data-line="13">And This - is Thee -<span class="page-break"></span>
      <br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="3">
    <span class="line" data-line="14">I'll tell Thee All - how <ins class="alternate">Blank -</ins>
      Bald<br class="emily"> it grew - <br class="emily author"/></span>
    <span class="line" data-line="15">How Midnight felt, at first -<br class="emily"> to me -<br class="emily author"/></span>
    <span class="line" data-line="16">How all the Clocks stopped<br class="emily"> in the World - <br class="emily author"/></span>
    <span class="line" data-line="17">And Sunshine pinched me -<br class="emily"> 'Twas so cold - <br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="4">
    <span class="line" data-line="18">Then how the Grief got sleepy -<br class="emily"> some - <br class="emily author"/></span>
    <span class="line" data-line="19">As if my soul were deaf and<br class="emily"> dumb - <br class="emily author"/></span>
    <span class="line" data-line="20">Just making signs - <ins class="alternate">it seemed</ins>
      across -<br class="emily"> to Thee -<br class="emily author"/></span>
    <span class="line" data-line="21">That this way - thou could'st<br class="emily"> <ins class="alternate">speak to -</ins>
      notice me - <br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="5">
    <span class="line" data-line="22">I'll tell you how I tried to keep <br class="emily author"/></span>
    <span class="line" data-line="23">A smile, to show you, when<br class="emily"> this Deep<span class="page-break"></span>
      <br class="emily author"/></span>
    <span class="line" data-line="24">All Waded - We look back<br class="emily"> for Play, <br class="emily author"/></span>
    <span class="line" data-line="25">At those Old Times - in Calvary.<br class="emily author"/></span>
  </p>

  <p class="stanza linebreak-emily" data-number="6">
    <span class="line" data-line="26">Forgive me, if the Grave <ins class="alternate">seem</ins>
      come<br class="emily"> slow - <br class="emily author"/></span>
    <span class="line" data-line="27">For <ins class="alternate">eagerness -</ins>
      Coveting to look at Thee - <br class="emily author"/></span>
    <span class="line" data-line="28">Forgive me, if to <ins class="alternate">touch • greet</ins>
      stroke<br class="emily"> thy frost <br class="emily author"/></span>
    <span class="line" data-line="29"> <ins class="alternate">[Out]fables -</ins>
      Outvisions Paradise!  <br class="emily author"/></span>
  </p>
</div>
`

export default franklinVariorum1998
