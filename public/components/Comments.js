import { html } from "@dependable/view";
import { css } from "stylewars";
import { Comment } from "./Comment.js";

const styles = css`
  & {
    padding: 0;
    margin: 0;
  }
`;

export class Comments {
  render({ story }) {
    const comments = story
      .comments()
      .map(
        (id) => html`<${Comment} showAnswersLink id=${id} />`
      );

    return html`
      <ul className=${styles}>
        ${comments}
      </ul>
    `;
  }
}
