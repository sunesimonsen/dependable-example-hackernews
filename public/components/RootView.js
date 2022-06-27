import { html } from "@dependable/view";
import { Stories } from "./Stories.js";
import { DefaultLayout } from "./DefaultLayout.js";
import { CommentAndAnswers } from "./CommentAndAnswers.js";
import { route, params } from "@dependable/nano-router";
import { Comment } from "../model.js";

export class RootView {
  render() {
    switch (route()) {
      case "comment":
        const { id } = params();

        return html`
          <${DefaultLayout}>
            <${CommentAndAnswers} comment=${new Comment({ id })} />
          <//>
        `;
      default:
        return html`<${DefaultLayout}><${Stories} /><//>`;
    }
  }
}
