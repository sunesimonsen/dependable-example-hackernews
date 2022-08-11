import { Story } from "./models/Story.js";
import { Comment } from "./models/Comment.js";
import { topStories, storiesStatus, shown, pageSize } from "./state.js";

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
        story.comments((response.kids || []).map(Comment.create));

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
        comment.answers((response.kids || []).map(Comment.create));

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
        const topStoryIds = await this.fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );

        topStories(topStoryIds.map(Story.create));

        storiesStatus("loaded");
      } catch (e) {
        console.error(e);
        storiesStatus("failed");
      }
    }
  }

  async reloadTopStories() {
    shown(pageSize);
    await this.loadTopStories({ reload: true });
  }
}
