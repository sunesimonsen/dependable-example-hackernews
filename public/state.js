import { computed, observable } from "@dependable/state";
import { route, params, location } from "@dependable/nano-router";
import { Story } from "./models/Story.js";
import { Comment } from "./models/Comment.js";
import { Cache, LOADED } from "@dependable/cache";

export const searches = new Cache('searches')
export const stories = new Cache('story');
export const comments = new Cache('comment');

export const pageSize = 20;
export const shown = observable(pageSize);

export const topStoryIds = computed(() => {
  const [ids, status, error] = searches.byId('top-stories')

  return [(ids || []).slice(0, shown()), status, error]
})

export const isLoadMoreVisible = computed(() => {
  const [ids, status] = searches.byId('top-stories')

  return status === LOADED && ids.length > shown()
});

export const isHome = computed(() => route() === "home");

