import { observable } from "@dependable/state";

export class Story {
  static create(id) {
    return {
      id,
      comments: observable([]),
    };
  }
}
