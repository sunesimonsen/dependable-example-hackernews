import { computed, observable } from "@dependable/state";
import { route, params, location } from "@dependable/nano-router";
import { Story } from "./models/Story.js";
import { Comment } from "./models/Comment.js";

export const pageSize = 20;
export const shown = observable(pageSize);
export const storiesStatus = observable("uninitialized");
export const topStories = observable([]);
export const stories = computed(() => topStories().slice(0, shown()));

export const loadMoreVisible = computed(() => topStories().length > shown());

export const loadMoreStories = () => {
  shown(shown() + pageSize);
};

export const isHome = computed(() => route() === "home");
