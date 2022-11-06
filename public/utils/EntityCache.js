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

      const entity = this.model.create(id);
      this.cache({
        ...this.cache(),
        [id]: entity,
      });

      this.accessors[id] = newAccessor;

      return entity;
    }

    return accessor();
  }
}
