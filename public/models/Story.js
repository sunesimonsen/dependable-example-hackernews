import { observable, computed } from "@dependable/state";
import { Comment } from "./Comment.js";
import { route, params } from "@dependable/nano-router";

export class Story {
  static create(id) {
    return {
      id: String(id),
      status: observable("uninitialized"),
      comments: observable([]),
    };
  }
}
