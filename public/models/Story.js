import { observable, computed } from "@dependable/state";
import { Comment } from "./Comment.js";
import { route, params } from "@dependable/nano-router";

const isExpanded = (id) =>
  computed(() => route() === "story" && params().id === String(id));

export class Story {
  static create(id) {
    return {
      id: String(id),
      status: observable("uninitialized"),
      isExpanded: isExpanded(id),
      comments: observable([]),
    };
  }
}
