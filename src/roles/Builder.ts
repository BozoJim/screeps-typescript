import { StructureHelper } from "utils/StructureHelper";
import { CreepHelper } from "utils/CreepHelper";

export class Builder {
  static run(creep: Creep) {
    let constructionSite: ConstructionSite | null = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    let source: Source | null = creep.pos.findClosestByPath(FIND_SOURCES)!;
    let resource: Resource | null = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
      filter: resource => resource.amount > creep.carryCapacity - creep.carry.energy
    });

    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
    }
    if (creep.carry.energy === 0) {
      creep.memory.working = false;
    }

    if (creep.memory.working) {
      if (constructionSite) {
        CreepHelper.buildTo(creep, constructionSite);
      }
    } else {
      if (resource) {
        CreepHelper.pickupTo(creep, resource);
      } else {
        CreepHelper.harvestTo(creep, source);
      }
    }

    if (!constructionSite) {
      creep.suicide();
    }
  }
}
