import { html } from "@dependable/view";
import { css } from "stylewars";
import { Story } from "./Story.js";
import { LoadMore } from "./LoadMore.js";
import { shownTopStoryIds } from "../state.js";
import { storyById } from "../models/Story.js";
import { params } from "@dependable/nano-router";

const containerStyles = css`
  & {
    margin: 0 auto;
    width: 90vw;
    box-sizing: border-box;
    max-width: 800px;
  }
`;

const listStyles = css`
  & {
    display: grid;
    grid-gap: 8px;
    padding: 0;
    margin: 0;
  }
`;

export class Stories {
  didMount() {
    this.context.api.loadTopStories();
  }

  render() {
    const topStories = shownTopStoryIds().map((id) => {
      const story = storyById(id);

      return html`
        <${Story}
          key=${story}
          story=${story}
          isExpanded=${params().id === id}
        />
      `;
    });

    return html`
      <div className=${containerStyles}>
        <ol className=${listStyles}>
          ${topStories}
        </ol>
        <${LoadMore} />
      </div>
    `;
  }
}
