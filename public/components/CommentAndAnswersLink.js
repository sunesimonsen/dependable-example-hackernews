import { html } from "@dependable/htm";
import { LinkButton } from "./LinkButton.js";

export class CommentAndAnswersLink {
  render({ comment }) {
    if (comment.answers().length > 0) {
      return html`
        <${LinkButton} route="comment" params=${{ id: comment.id }}>
          ${comment.answers().length} answers
        <//>
      `;
    }
  }
}
