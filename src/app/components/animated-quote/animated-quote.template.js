import { htmlToElement } from "../../../utils/html-to-elem"

export default (text) => htmlToElement(`
<div class="quote-wrapper" id="quote-wrapper-js">
    <article class="quote quote--animate">${text}</article>
</div>
`)