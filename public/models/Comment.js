import { observable } from "@dependable/state";

export class Comment {
  static create(id) {
    return {
      id,
      status: observable("uninitialized"),
      answers: observable([]),
    };
  }
}
