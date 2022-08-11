import { html } from "@dependable/view";
import { isLoadMoreVisible } from "../state.js";
import { css } from "stylewars";

const buttonsStyles = css`
  & {
    margin-top: 20px;
    text-align: center;
  }
`;

const loadMoreStyles = css`
  & {
    border: none;
    background: none;
    color: #666;
    outline: none;
  }
  &:focus-visible {
    outline: blue auto 1px;
  }
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

export class LoadMore {
  constructor() {
    this.onLoadMore = () => {
      this.context.api.loadMoreStories();
    };
  }

  render() {
    return (
      isLoadMoreVisible() &&
      html`
        <div className=${buttonsStyles}>
          <button onClick=${this.onLoadMore} className=${loadMoreStyles}>
            Load more
          </button>
        </div>
      `
    );
  }
}
