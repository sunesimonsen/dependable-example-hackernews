import { html } from "@dependable/view";
import { css } from "stylewars";
import { Comment } from "./Comment.js";

const styles = css`
  & {
    padding: 0;
    margin: 0;
  }
`;

export class Answers {
  render({ comment }) {
    if (comment.status() !== "loaded") {
      return null;
    }

    const answers = comment
      .answers()
      .map(
        (answer) => html` <${Comment} showAnswersLink comment=${answer} /> `
      );

    return html`
      <ul className=${styles}>
        ${answers}
      </ul>
    `;
  }
}
