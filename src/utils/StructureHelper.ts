export class StructureHelper {
  static constructionSites(room: Room): Array<ConstructionSite> {
    return room.find(FIND_CONSTRUCTION_SITES);
  }

  static sources(room: Room): Array<Source> {
    return room.find(FIND_SOURCES);
  }

  static closestContainerOrStorageForPickup(creep: Creep): StructureContainer | StructureStorage | null {
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure =>
        (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) &&
        structure.store[RESOURCE_ENERGY] > (creep.carryCapacity - creep.carry.energy)
    });
    return <StructureContainer | StructureStorage>target;
  }

  static closestSpawnOrExtension(creep: Creep) {
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure =>
        (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
        structure.energy < structure.energyCapacity
    });
    return target;
  }

  static closestConstructionSite(creep: Creep) {
    let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    return target;
  }
}
