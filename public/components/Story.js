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
    if (this.ref && this.props.isExpanded) {
      this.ref.scrollIntoView(true);
      document.documentElement.scrollBy(0, -45);
    }
  }

  didMount() {
    this.scrollIntoViewIfNecessary();
  }

  didUpdate() {
    this.scrollIntoViewIfNecessary();
  }

  render({ story, isExpanded }) {
    this.context.api.loadStory(story);

    if (story.status() !== "loaded") {
      return html`<${StoryPlaceholder} />`;
    }

    return html`
      <${StoryCard} ref=${this.setRef}>
        <${StoryTitle}>
          <${StoryLink} story=${story} />
        <//>
        <${StoryByline} story=${story} showCommentLink=${!isExpanded} />
        ${isExpanded && html`<${Details} story=${story} />`}
      <//>
    `;
  }
}
