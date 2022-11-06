import { computed, observable } from "@dependable/state";
import { route, params, location } from "@dependable/nano-router";
import { Story } from "./models/Story.js";
import { Comment } from "./models/Comment.js";
import { EntityCache } from "./utils/EntityCache.js";

export const pageSize = 20;
export const shown = observable(pageSize);
export const storiesStatus = observable("uninitialized", {
  id: "storiesStatus",
});

export const topStoryIds = observable([], { id: "topStoryIds" });

export const isLoadMoreVisible = computed(() => topStoryIds().length > shown());

export const isHome = computed(() => route() === "home");

export const storyCache = new EntityCache(Story);
export const storyById = (id) => storyCache.getById(id);

export const commentCache = new EntityCache(Comment);
export const commentById = (id) => commentCache.getById(id);

export const topStories = computed(() =>
  topStoryIds()
    .slice(0, shown())
    .map((id) => storyById(id))
);
