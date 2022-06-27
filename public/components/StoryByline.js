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
`;

export class StoryByline {
  render({ story }) {
    return html`
      <div className=${styles}>
        <span>${story.score} points by ${story.by}</span>
        <span>${formatRelativeHours(story.time)}</span>
        ${!story.isExpanded() && html`<${CommentsLink} story=${story} />`}
      </div>
    `;
  }
}
