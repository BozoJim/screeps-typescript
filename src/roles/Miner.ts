import { CreepHelper } from "utils/CreepHelper";

export class Miner {
  static run(creep: Creep) {
    let source: Source = creep.pos.findClosestByPath(FIND_SOURCES)!;

    CreepHelper.harvestTo(creep, source);
    creep.drop(RESOURCE_ENERGY);
  }
}
