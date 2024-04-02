import { html } from "@dependable/htm";
import { css } from "stylewars";
import { Skeleton } from "./Skeleton.js";

const itemStyles = css`
  & {
    position: relative;
    line-height: 24px;
    list-style-type: none;
    background: white;
    padding: 1.4em;
    border-radius: 4px;
    overflow: hidden;
  }
`;

const titleStyles = css`
  & {
    display: block;
    font-size: 1.4em;
    line-height: 1.4em;
    color: black;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 0.4em;
  }

  @media only screen and (width <= 1000px) {
    & {
      font-size: 1.6em;
      line-height: 1.2em;
      margin-bottom: 0.8em;
    }
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
