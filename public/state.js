import { computed, observable } from "@dependable/state";
import { route, params, location } from "@dependable/nano-router";
import { Story } from "./models/Story.js";
import { Comment } from "./models/Comment.js";

export const pageSize = 20;
export const shown = observable(pageSize);
export const storiesStatus = observable("uninitialized", {
  id: "storiesStatus",
});

export const topStoryIds = observable([], { id: "topStoryIds" });

export const isLoadMoreVisible = computed(() => topStoryIds().length > shown());

export const isHome = computed(() => route() === "home");

export const storyCache = observable({}, { id: "stories" });

export const storyById = (id) => {
  const stories = storyCache();
  if (stories[id]) {
    return stories[id];
  } else {
    const newStory = Story.create(id);

    storyCache({
      ...stories,
      [id]: newStory,
    });

    return newStory;
  }
};

export const commentCache = observable({}, { id: "comments" });

export const commentById = (id) => {
  const comments = commentCache();
  if (comments[id]) {
    return comments[id];
  } else {
    const newComment = Comment.create(id);

    commentCache({
      ...comments,
      [id]: newComment,
    });

    return newComment;
  }
};

export const clearCache = () => {
  storyCache({});
  commentCache({});
};

export const shownTopStoryIds = computed(() => topStoryIds().slice(0, shown()));
