import { StructureHelper } from "utils/StructureHelper";

export class Tower {
  static run(room: Room) {
    let towers = StructureHelper.towersInRoom(room);
    for (let tower of towers) {
      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      // prefer to attack hostiles, otherwise repair.
      if (closestHostile) {
        tower.attack(closestHostile);
      } else {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: structure => structure.hits < structure.hitsMax && structure.hits < 25000
        });
        if (closestDamagedStructure && tower.energy > 500) { // save 500 energy to attack
          tower.repair(closestDamagedStructure);
        }
      }
    }
  }
}
