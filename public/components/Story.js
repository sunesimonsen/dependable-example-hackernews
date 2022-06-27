import { html } from "@dependable/view";
import { css } from "stylewars";
import { StoryByline } from "./StoryByline.js";
import { Details } from "./Details.js";
import { StoryCard, StoryTitle, StoryPlaceholder } from "./StoryLayout.js";
import { StoryLink } from "./StoryLink.js";

export class Story {
  constructor() {
    this.setRef = (ref) => {
      this.ref = ref;
    };
  }

  scrollIntoViewIfNecessary() {
    const story = this.props.story;
    if (this.ref && story.isExpanded()) {
      this.ref.scrollIntoView(true);
      // this.context.router.navigate({ state: null, replace: true });
    }
  }

  didMount() {
    this.scrollIntoViewIfNecessary();
  }

  didUpdate() {
    this.scrollIntoViewIfNecessary();
  }

  render({ story }) {
    story.load();

    if (story.status() !== "loaded") {
      return html`<${StoryPlaceholder} />`;
    }

    return html`
      <${StoryCard} ref=${this.setRef}>
        <${StoryTitle}>
          <${StoryLink} story=${story} />
        <//>
        <${StoryByline} story=${story} />
        ${story.isExpanded() && html`<${Details} story=${story} />`}
      <//>
    `;
  }
}
