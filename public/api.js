import { topStoryIds, storiesStatus, shown, pageSize } from "./state.js";
import { storyById, clearStoryCache } from "./models/Story.js";
import { commentById, clearCommentCache } from "./models/Comment.js";

export class Api {
  async fetch(...args) {
    const response = await fetch(...args);

    return response.json();
  }

  async loadItem(id) {
    return this.fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  }

  async loadStory(story) {
    if (story.status() === "uninitialized") {
      story.status("loading");

      try {
        const response = await this.loadItem(story.id);

        story.title = response.title;
        story.score = response.score;
        story.by = response.by;
        story.time = response.time;
        story.url = response.url;
        story.descendants = response.descendants;
        story.comments((response.kids || []).map(commentById));

        story.status("loaded");
      } catch (e) {
        console.error(e);
        story.status("failed");
      }
    }
  }

  async loadComment(comment) {
    if (comment.status() === "uninitialized") {
      comment.status("loading");

      try {
        const response = await this.loadItem(comment.id);

        comment.text = response.text;
        comment.time = response.time;
        comment.by = response.by;
        comment.parentId = response.parent;
        comment.answers((response.kids || []).map(commentById));

        comment.status("loaded");
      } catch (e) {
        console.error(e);
        comment.status("failed");
      }
    }
  }

  async loadCommentAnswers(comment) {
    for (const answer of comment.answers()) {
      this.loadComment(answer);
    }
  }

  async loadStoryComments(story) {
    for (const comment of story.comments()) {
      this.loadComment(comment);
    }
  }

  async loadTopStories({ reload = false } = {}) {
    if (reload || storiesStatus() === "uninitialized") {
      storiesStatus("loading");
      try {
        const response = await this.fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );

        topStoryIds(response.map(String));

        storiesStatus("loaded");
      } catch (e) {
        console.error(e);
        storiesStatus("failed");
      }
    }
  }

  async reloadTopStories() {
    shown(pageSize);
    clearStoryCache();
    clearCommentCache();

    await this.loadTopStories({ reload: true });
  }

  loadMoreStories() {
    shown(shown() + pageSize);
  }
}
