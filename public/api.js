import { searches, stories, comments, shown, pageSize } from "./state.js";
import { Story } from "./models/Story.js";
import { Comment } from "./models/Comment.js";

export class Api {
  async fetch(...args) {
    const response = await fetch(...args);

    return response.json();
  }

  async loadItem(id) {
    return this.fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  }

  async loadStory(id) {
    return stories.initialize(id, async () => {
      const response = await this.loadItem(id);

      const story = Story.create(id);
      story.title = response.title;
      story.score = response.score;
      story.by = response.by;
      story.time = response.time;
      story.url = response.url;
      story.descendants = response.descendants;
      story.comments(response.kids || []);

      return story;
    });
  }

  async loadComment(id) {
    return comments.initialize(id, async () => {
      const response = await this.loadItem(id);

      const comment = Comment.create(id);
      comment.text = response.text;
      comment.time = response.time;
      comment.by = response.by;
      comment.parentId = response.parent;
      comment.answers(response.kids || []);

      return comment;
    });
  }

  async loadCommentAnswers(comment) {
    for (const id of comment.answers()) {
      this.loadComment(id);
    }
  }

  async loadStoryComments(story) {
    for (const id of story.comments()) {
      this.loadComment(id);
    }
  }

  async loadTopStories() {
    searches.initialize("top-stories", async () => {
      const response = await this.fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
      );

      return response.map(String);
    });
  }

  async reloadTopStories() {
    shown(pageSize);
    searches.clear();
    stories.clear();
    comments.clear();

    await this.loadTopStories();
  }

  loadMoreStories() {
    shown(shown() + pageSize);
  }
}
