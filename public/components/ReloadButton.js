import { html } from "@dependable/view";
import { css } from "stylewars";
import { ReloadIcon } from "./icons.js";
import { searches } from "../state.js";
import { LOADED } from "@dependable/cache";

const reloadStyles = css`
  & {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    color: white;
    border: none;
    height: 36px;
    width: 36px;
    cursor: pointer;
    outline: none;
    padding: 10px;
  }

  &:hover {
    background: rgb(222 90 2);
  }

  &:active {
    background: rgb(195 78 0);
  }
`;

const loadingStyles = css`
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  & {
    animation: spin 2s linear infinite;
    animation-delay: 0.5s;
  }
`;

export class ReloadButton {
  constructor() {
    this.onReload = () => {
      this.context.api.reloadTopStories();
    };
  }

  render() {
    const [, status] = searches.byId("top-stories");

    return html`
      <button
        onClick=${this.onReload}
        className=${reloadStyles}
        title="refresh"
      >
        <${ReloadIcon} className=${status !== LOADED && loadingStyles} />
      </button>
    `;
  }
}
