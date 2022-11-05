import { html } from "@dependable/view";
import { Stories } from "./Stories.js";
import { DefaultLayout } from "./DefaultLayout.js";
import { CommentAndAnswers } from "./CommentAndAnswers.js";
import { route, params } from "@dependable/nano-router";
import { commentById } from "../models/Comment.js";

export class RootView {
  render() {
    switch (route()) {
      case "comment":
        const { id } = params();

        return html`
          <${DefaultLayout}>
            <${CommentAndAnswers} comment=${commentById(id)} />
          <//>
        `;
      default:
        return html`<${DefaultLayout}><${Stories} /><//>`;
    }
  }
}
