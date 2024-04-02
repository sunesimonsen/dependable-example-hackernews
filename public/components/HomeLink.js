import { html } from "@dependable/htm";
import { css } from "stylewars";
import { Link } from "@dependable/nano-router";

const logo = new URL("../images/y18.gif", import.meta.url);

const logoStyles = css`
  & {
    border: thin solid white;
  }

  @media only screen and (width <= 1000px) {
    & {
      height: 1em;
      width: 1em;
    }
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
