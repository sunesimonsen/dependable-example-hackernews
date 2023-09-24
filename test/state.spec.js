import {
  searches,
  topStoryIds,
  shown,
  isLoadMoreVisible,
  isHome,
} from "../public/state.js";
import { route } from "@dependable/nano-router";
import { FakePromise } from "fake-promise";
import { LOADING, LOADED } from "@dependable/cache";
import { expect } from "./expect.js";

describe("state", () => {
  describe("topStoryIds", () => {
    describe("when search is loading", () => {
      beforeEach(() => {
        const fakePromise = new FakePromise();

        searches.load("top-stories", () => fakePromise);
      });

      it("reflects the searches status", () => {
        const [ids, status] = topStoryIds();

        expect(ids, "to equal", []);
        expect(status, "to equal", LOADING);
      });
    });

    describe("when the search is loaded", () => {
      beforeEach(async () => {
        shown(4);
        await searches.load("top-stories", [0, 1, 2, 3, 4, 5, 6, 7]);
      });

      it("returns the shown number of ids", () => {
        const [ids, status] = topStoryIds();

        expect(ids, "to equal", [0, 1, 2, 3]);
        expect(status, "to equal", LOADED);
      });
    });
  });

  describe("isLoadMoreVisible", () => {
    describe("when there is more to be shown", () => {
      beforeEach(async () => {
        shown(4);
        await searches.load("top-stories", [0, 1, 2, 3, 4, 5, 6, 7]);
      });

      it("returns true", () => {
        expect(isLoadMoreVisible, "to satisfy", true);
      });
    });

    describe("when there is no more to be shown", () => {
      beforeEach(async () => {
        shown(8);
        await searches.load("top-stories", [0, 1, 2, 3, 4, 5, 6, 7]);
      });

      it("returns false", () => {
        expect(isLoadMoreVisible, "to satisfy", false);
      });
    });
  });

  describe("home", () => {
    it("returns true when the route is home", () => {
      route("home");

      expect(isHome(), "to equal", true);
    });

    it("returns false when the route is not home", () => {
      route("story");

      expect(isHome(), "to equal", false);
    });
  });
});
