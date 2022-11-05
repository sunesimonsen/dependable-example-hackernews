import { observable } from "@dependable/state";

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

export const clearCommentCache = () => {
  commentCache({});
};

export class Comment {
  static create(id) {
    return {
      id,
      status: observable("uninitialized"),
      answers: observable([]),
    };
  }
}
