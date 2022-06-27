import { html } from "@dependable/view";
import { params } from "@dependable/nano-router";
import { css } from "stylewars";

const styles = css`
  & {
    position: fixed;
    top: 50px;
    right: 20px;
    border: none;
    font-size: 30px;
    color: #9a9a86;
    cursor: pointer;
    outline: none;
    background: none;
  }

  &:hover {
    color: black;
  }
`;

export class BackButton {
  constructor() {
    this.onClick = () => {
      this.context.router.back();
    };
  }

  render() {
    return html`<button className=${styles} onClick=${this.onClick}>X</button>`;
  }
}
