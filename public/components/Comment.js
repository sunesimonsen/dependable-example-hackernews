import { html } from "@dependable/view";
import { css } from "stylewars";
import { Skeleton } from "./Skeleton.js";
import { Html } from "./Html.js";
import { formatRelativeHours } from "../utils/time.js";
import { CommentAndAnswersLink } from "./CommentAndAnswersLink.js";

const styles = css`
  & {
    list-style-type: none;
    font-size: smaller;
  }

  & p,
  & pre {
    margin: 0.5em 0;
  }

  & pre {
    font-size: larger;
  }

  & + & {
    margin-top: 15px;
    border-top: thin solid #ccc;
    padding-top: 15px;
  }
`;

const bylineStyles = css`
  & {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    color: grey;
    margin-top: 5px;
  }
`;

export class Comment {
  render({ comment, showAnswersLink }) {
    this.context.api.loadComment(comment);

    if (comment.status() !== "loaded") {
      return html`
        <li className=${styles}>
          <div><${Skeleton} /></div>
          <div><${Skeleton} /></div>
          <div><${Skeleton} /></div>
        </li>
      `;
    }

    if (!comment) return null;

    return html`
      <li className=${styles}>
        <div>
          <${Html}>${comment.text}<//>
        </div>
        <div className=${bylineStyles}>
          <span>by ${comment.by}</span>
          <span>${formatRelativeHours(comment.time)}</span>
          ${showAnswersLink &&
          html`<${CommentAndAnswersLink} comment=${comment} />`}
        </div>
      </li>
    `;
  }
}
