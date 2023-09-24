import { html } from "@dependable/view";
import { css } from "stylewars";
import { Comment } from "./Comment.js";
import { LOADED } from "@dependable/cache";
import { comments } from "../state.js";

const styles = css`
  & {
    padding: 0;
    margin: 0;
  }
`;

export class Answers {
  render({ commentId }) {
    const [comment, status] = comments.byId(commentId);

    if (status !== LOADED) return null;

    const answers = comment
      .answers()
      .map((answer) => html` <${Comment} showAnswersLink id=${answer} /> `);

    return html`
      <ul className=${styles}>
        ${answers}
      </ul>
    `;
  }
}
