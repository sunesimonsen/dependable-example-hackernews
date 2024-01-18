import { html } from "@dependable/view";
import { css } from "stylewars";
import { formatRelativeHours } from "../utils/time.js";
import { CommentsLink } from "./CommentsLink.js";

const styles = css`
  & {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    color: grey;
  }

  @media only screen and (width <= 1000px) {
    & {
      font-size: larger;
    }
  }
`;

export class StoryByline {
  render({ story, showCommentLink }) {
    return html`
      <div className=${styles}>
        <span>${story.score} points by ${story.by}</span>
        <span>${formatRelativeHours(story.time)}</span>
        ${showCommentLink && html`<${CommentsLink} story=${story} />`}
      </div>
    `;
  }
}
