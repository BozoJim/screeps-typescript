import { CreepHelper } from "utils/CreepHelper";

export class Miner {
  static run(creep: Creep) {
    let source: Source = creep.pos.findClosestByPath(FIND_SOURCES)!;

    // Get to the source and start dropping energy. The haulers will take it from there.
    CreepHelper.harvestTo(creep, source);
    creep.drop(RESOURCE_ENERGY);
  }
}
