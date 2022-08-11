import { observable, computed } from "@dependable/state";
import { Comment } from "./Comment.js";
import { route, params } from "@dependable/nano-router";

const isExpanded = (id) =>
  computed(() => route() === "story" && params().id === String(id));

export class Story {
  constructor({ id, api }) {
    this.id = String(id);
    this.api = api;
    this.status = observable("uninitialized");
    this.isExpanded = isExpanded(id);
    this.comments = observable([]);
  }

  async load() {
    const api = this.api;

    if (this.status() === "uninitialized") {
      this.status("loading");

      try {
        const response = await api().loadStory(this.id);

        this.title = response.title;
        this.score = response.score;
        this.by = response.by;
        this.time = response.time;
        this.url = response.url;
        this.descendants = response.descendants;

        this.comments(
          (response.kids || []).map((id) => new Comment({ id, api }))
        );

        this.status("loaded");
      } catch (e) {
        console.error(e);
        this.status("failed");
      }
    }
  }

  loadComments() {
    for (const comment of this.comments()) {
      comment.load();
    }
  }
}
