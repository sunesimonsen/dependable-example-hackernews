import { html } from "@dependable/view";
import { css } from "stylewars";
import { Story } from "./Story.js";
import { LoadMore } from "./LoadMore.js";
import { topStoryIds } from "../state.js";
import { params } from "@dependable/nano-router";
import { LOADED } from "@dependable/cache"

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

  renderItems() {
    const [ids, status] = topStoryIds()

    if (status !== LOADED) return null

    return ids.map(
      (id) =>
        html`
          <${Story}
            key=${id}
            id=${id}
            isExpanded=${params().id === id}
          />
        `
    );
  }

  render() {
    return html`
      <div className=${containerStyles}>
        <ol className=${listStyles}>
          ${this.renderItems()}
        </ol>
        <${LoadMore} />
      </div>
    `;
  }
}
