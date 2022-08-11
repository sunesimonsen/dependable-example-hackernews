import { html } from "@dependable/view";
import { loadMoreVisible, loadMoreStories } from "../state.js";
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
  render() {
    return (
      loadMoreVisible() &&
      html`
        <div className=${buttonsStyles}>
          <button onClick=${loadMoreStories} className=${loadMoreStyles}>
            Load more
          </button>
        </div>
      `
    );
  }
}
