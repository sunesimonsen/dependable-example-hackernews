import { html } from "@dependable/htm";
import { LinkButton } from "./LinkButton.js";

export class CommentsLink {
  render({ story }) {
    if (story.descendants > 0) {
      return html`
        <${LinkButton} route="story" params=${{ id: story.id }}>
          ${story.descendants} comments
        <//>
      `;
    }
  }
}
