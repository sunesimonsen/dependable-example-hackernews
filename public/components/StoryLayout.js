import { html } from "@dependable/view";
import { css } from "stylewars";
import { Skeleton } from "./Skeleton.js";

const itemStyles = css`
  & {
    position: relative;
    line-height: 24px;
    list-style-type: none;
    background: white;
    padding: 20px;
    border-radius: 4px;
    overflow: hidden;
  }
`;

const titleStyles = css`
  & {
    display: block;
    font-size: 1.5em;
    line-height: 1.5em;
    color: black;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 8px;
  }
`;

export class StoryTitle {
  render({ children, ...other }) {
    return html`<div className=${titleStyles} ...${other}>${children}</div>`;
  }
}

export class StoryCard {
  render({ children, ...other }) {
    return html`<li className=${itemStyles} ...${other}>${children}</li>`;
  }
}

export class StoryPlaceholder {
  render() {
    return html`
      <${StoryCard}>
        <${StoryTitle}><${Skeleton} /><//>
        <div><${Skeleton} /></div>
      <//>
    `;
  }
}
