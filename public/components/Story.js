import { html } from "@dependable/htm";
import { StoryByline } from "./StoryByline.js";
import { Details } from "./Details.js";
import { StoryCard, StoryTitle, StoryPlaceholder } from "./StoryLayout.js";
import { StoryLink } from "./StoryLink.js";
import { stories } from "../state.js";
import { LOADED } from "@dependable/cache";

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

  didRender() {
    this.scrollIntoViewIfNecessary();
    this.context.api.loadStory(this.props.id);
  }

  render({ id, isExpanded }) {
    const [story, status] = stories.byId(id);

    if (status !== LOADED) {
      return html`<${StoryPlaceholder} />`;
    }

    return html`
      <${StoryCard} ref=${this.setRef}>
        <${StoryTitle}><${StoryLink} story=${story} /><//>
        <${StoryByline} story=${story} showCommentLink=${!isExpanded} />
        ${isExpanded && html`<${Details} story=${story} />`}
      <//>
    `;
  }
}
