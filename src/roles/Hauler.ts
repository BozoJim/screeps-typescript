import { CreepHelper } from "utils/CreepHelper";
import { StructureHelper } from "utils/StructureHelper";

export class Hauler {
  static run(creep: Creep) {
    let source: Source = creep.pos.findClosestByPath(FIND_SOURCES)!;
    let controller: StructureController = creep.room.controller!;
    let resource: Resource | null = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
    }
    if (creep.carry.energy === 0) {
      creep.memory.working = false;
    }

    // Collect energy until you fill up, then deposit it in the nearest spawn/extension.
    if (creep.memory.working) {
      let closestTarget = StructureHelper.closestSpawnOrExtension(creep)!;
      CreepHelper.transferTo(creep, closestTarget, RESOURCE_ENERGY);
    } else {
      if (resource) {
        CreepHelper.pickupTo(creep, resource);
      } else {
        CreepHelper.harvestTo(creep, source);
      }
    }
  }
}
