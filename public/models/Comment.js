import { observable } from "@dependable/state";

export class Comment {
  constructor({ id, api }) {
    this.id = String(id);
    this.api = api;
    this.status = observable("uninitialized");
    this.answers = observable([]);
  }

  async load() {
    const api = this.api;

    if (this.status() === "uninitialized") {
      this.status("loading");

      try {
        const response = await api().loadComment(this.id);

        this.text = response.text;
        this.time = response.time;
        this.by = response.by;
        this.parentId = response.parent;
        this.answers(
          (response.kids || []).map((id) => new Comment({ id, api }))
        );

        this.status("loaded");
      } catch (e) {
        console.error(e);
        this.status("failed");
      }
    }
  }

  async loadAnswers() {
    for (const answer of this.answers()) {
      answer.load();
    }
  }
}
