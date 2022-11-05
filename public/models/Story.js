import { observable } from "@dependable/state";

export class Story {
  static create(id) {
    return {
      id,
      status: observable("uninitialized"),
      comments: observable([]),
    };
  }
}
