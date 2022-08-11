import { computed, observable } from "@dependable/state";
import * as apiFunctions from "./api.js";
import { route, params, location } from "@dependable/nano-router";
import { Story } from "./models/Story.js";
import { Comment } from "./models/Comment.js";

export const api = observable(apiFunctions);

export const pageSize = 20;
const shown = observable(pageSize);
export const storiesStatus = observable("uninitialized");
const topStories = observable([]);
export const stories = computed(() => topStories().slice(0, shown()));

export const loadTopStories = async ({ reload = false } = {}) => {
  if (reload || storiesStatus() === "uninitialized") {
    storiesStatus("loading");
    try {
      const topStoryIds = await api().loadTopStories();
      topStories(topStoryIds.map((id) => new Story({ id, api })));

      storiesStatus("loaded");
    } catch (e) {
      console.error(e);
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

export const isHome = computed(() => route() === "home");
