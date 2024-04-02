import { html } from "@dependable/htm";
import { css } from "stylewars";

const styles = css`
  & {
    color: black;
    text-decoration: none;
  }

  &:visited {
    color: grey;
  }
`;

export class StoryLink {
  render({ story }) {
    return html`
      <a
        href=${story.url}
        title=${story.title}
        className=${styles}
        target="_blank"
        rel="noopener"
      >
        ${story.title}
      </a>
    `;
  }
}
