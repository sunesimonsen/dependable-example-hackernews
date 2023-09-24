import { html } from "@dependable/view";
import { Stories } from "./Stories.js";
import { DefaultLayout } from "./DefaultLayout.js";
import { CommentAndAnswers } from "./CommentAndAnswers.js";
import { route, params } from "@dependable/nano-router";

export class RootView {
  render() {
    switch (route()) {
      case "comment":
        return html`
          <${DefaultLayout}>
            <${CommentAndAnswers} id=${params().id} />
          <//>
        `;
      default:
        return html`<${DefaultLayout}><${Stories} /><//>`;
    }
  }
}
