import { html } from "@dependable/view";
import { isLoadMoreVisible } from "../state.js";
import { css } from "stylewars";

const buttonsStyles = css`
  & {
    margin-top: 20px;
    text-align: center;
  }
  @media only screen and (width <= 1000px) {
    & {
      margin-top: 40px;
    }
  }
`;

const loadMoreStyles = css`
  & {
    border: none;
    background: none;
    color: #666;
    outline: none;
  }

  @media only screen and (width <= 1000px) {
    & {
      font-size: xx-large;
    }
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
