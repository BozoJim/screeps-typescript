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

  static closestConstructionSite(creep: Creep): ConstructionSite | null {
    let target: ConstructionSite | null = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    return target;
  }

  static structuresOrConstructionWithin(focus: Source | Structure, search: StructureConstant, range: number): number {
    let structures: Array<Structure> = focus.pos.findInRange(FIND_STRUCTURES, range, {
      filter: (structure: Structure) => {
        return structure.structureType == search
      }
    });
    let constructionSites: Array<ConstructionSite> = focus.pos.findInRange(FIND_CONSTRUCTION_SITES, range, {
      filter: (construction: ConstructionSite) => {
        return construction.structureType
      }
    });
    let targets: number = Array.prototype.push.apply(structures, constructionSites)
    return targets;
  }
}
