import { computed, observable } from "@dependable/state";
import * as apiFunctions from "./api.js";
import { route, params, location } from "@dependable/nano-router";

export const api = observable(apiFunctions);

export const pageSize = 20;
const shown = observable(pageSize);
export const storiesStatus = observable("uninitialized");
const topStories = observable([]);
export const stories = computed(() => topStories().slice(0, shown()));

const isExpanded = (id) =>
  computed(() => route() === "story" && params().id === String(id));

export class Comment {
  constructor({ id }) {
    this.id = String(id);
    this.status = observable("uninitialized");
    this.answers = observable([]);
  }

  async load() {
    if (this.status() === "uninitialized") {
      this.status("loading");

      try {
        const response = await api().loadComment(this.id);

        this.text = response.text;
        this.time = response.time;
        this.by = response.by;
        this.parentId = response.parent;
        this.answers((response.kids || []).map((id) => new Comment({ id })));

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

class Story {
  constructor({ id }) {
    this.id = String(id);
    this.status = observable("uninitialized");
    this.isExpanded = isExpanded(id);
    this.comments = observable([]);
  }

  async load() {
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

        this.comments((response.kids || []).map((id) => new Comment({ id })));

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

export const loadTopStories = async ({ reload = false } = {}) => {
  if (reload || storiesStatus() === "uninitialized") {
    storiesStatus("loading");
    try {
      const topStoryIds = await api().loadTopStories();
      topStories(topStoryIds.map((id) => new Story({ id })));
      storiesStatus("loaded");
    } catch (e) {
      storiesStatus("failed");
    }
  }
};

export const reloadTopStories = async () => {
  shown(pageSize);
  await loadTopStories({ reload: true });
};

export const loadMoreVisible = computed(() => topStories().length > shown());

export const loadMoreStories = () => {
  shown(shown() + pageSize);
};
