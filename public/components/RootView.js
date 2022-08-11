import { html } from "@dependable/view";
import { Stories } from "./Stories.js";
import { DefaultLayout } from "./DefaultLayout.js";
import { CommentAndAnswers } from "./CommentAndAnswers.js";
import { route, params } from "@dependable/nano-router";
import { api } from "../state.js";
import { Comment } from "../models/Comment.js";

export class RootView {
  render() {
    switch (route()) {
      case "comment":
        const { id } = params();

        return html`
          <${DefaultLayout}>
            <${CommentAndAnswers} comment=${new Comment({ id, api })} />
          <//>
        `;
      default:
        return html`<${DefaultLayout}><${Stories} /><//>`;
    }
  }
}
