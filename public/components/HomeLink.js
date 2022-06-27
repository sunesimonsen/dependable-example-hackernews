import { html } from "@dependable/view";
import { css } from "stylewars";
import { Link } from "@dependable/nano-router";

const logo = new URL("../images/y18.gif", import.meta.url);

const logoStyles = css`
  & {
    border: thin solid white;
    width: 20px;
    height: 20px;
  }
`;

const brandStyles = css`
  & {
    margin: 0 10px;
  }
`;

const homeStyles = css`
  & {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 8px 20px;
  }

  &:hover {
    background: rgb(222 90 2);
  }

  &:active {
    background: rgb(195 78 0);
  }
`;

export class HomeLink {
  render() {
    return html`
      <${Link} className=${homeStyles} route="home">
        <img src=${logo} className=${logoStyles} />
        <span className=${brandStyles}>Hacker News</span>
      <//>
    `;
  }
}
