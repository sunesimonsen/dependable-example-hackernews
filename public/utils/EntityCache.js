import { computed, observable } from "@dependable/state";

export class EntityCache {
  constructor(Model) {
    this.cache = observable({}, { id: `${Model.name}Cache` });
    this.accessors = {};
    this.model = Model;
  }

  clear() {
    this.accessors = {};
    this.cache({});
  }

  getById(id) {
    const accessor = this.accessors[id];

    if (!accessor) {
      const newAccessor = computed(() => this.cache()[id]);
      this.accessors[id] = newAccessor;

      const currentCache = this.cache();

      if (id in currentCache) {
        return currentCache[id];
      } else {
        const entity = this.model.create(id);
        this.cache({
          ...currentCache,
          [id]: entity,
        });
        return entity;
      }
    }

    return accessor();
  }
}
