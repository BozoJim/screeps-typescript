import { StructureHelper } from "utils/StructureHelper";
import { CreepHelper } from "utils/CreepHelper";

export class Upgrader {
  static run(creep: Creep) {
    let source: Source = creep.pos.findClosestByPath(FIND_SOURCES)!;
    let controller: StructureController = creep.room.controller!;
    let resource: Resource | null = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    let container = StructureHelper.closestContainerOrStorageForPickup(creep);

    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
    }
    if (creep.carry.energy === 0) {
      creep.memory.working = false;
    }

    if (creep.memory.working) {
      CreepHelper.upgradeTo(creep, controller);
    } else {
      if (container) {
        CreepHelper.withdrawTo(creep, container, RESOURCE_ENERGY);
      } else if (resource) {
        CreepHelper.pickupTo(creep, resource);
      } else {
        CreepHelper.harvestTo(creep, source);
      }
    }
  }
}
