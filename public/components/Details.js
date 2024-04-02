import { html } from "@dependable/htm";
import { css } from "stylewars";
import { Comments } from "./Comments.js";
import { BackButton } from "./BackButton.js";

const detailsStyles = css`
  & {
    padding-top: 20px;
    padding-left: 15px;
  }
`;

export class Details {
  render({ story }) {
    return html`
      <div className=${detailsStyles}>
        <${Comments} story=${story} />
        <${BackButton} />
      </div>
    `;
  }
}
