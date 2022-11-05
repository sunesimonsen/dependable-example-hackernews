import { computed, observable } from "@dependable/state";
import { route, params, location } from "@dependable/nano-router";
import { Story, storyCache } from "./models/Story.js";
import { Comment, commentCache } from "./models/Comment.js";

export const pageSize = 20;
export const shown = observable(pageSize);
export const storiesStatus = observable("uninitialized", {
  id: "storiesStatus",
});

export const topStoryIds = observable([], { id: "topStoryIds" });

export const isLoadMoreVisible = computed(() => topStoryIds().length > shown());

export const isHome = computed(() => route() === "home");

export const shownTopStoryIds = computed(() => topStoryIds().slice(0, shown()));
