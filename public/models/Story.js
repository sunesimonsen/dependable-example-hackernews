import { observable } from "@dependable/state";

export const storyCache = observable({}, { id: "stories" });

export class Story {
  static create(id) {
    return {
      id,
      status: observable("uninitialized"),
      comments: observable([]),
    };
  }
}

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

export const clearStoryCache = () => {
  storyCache({});
};
