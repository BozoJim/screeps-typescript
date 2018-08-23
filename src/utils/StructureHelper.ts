export class StructureHelper {
  static constructionSites(room: Room): ConstructionSite[] {
    return room.find(FIND_CONSTRUCTION_SITES);
  }

  static sources(room: Room): Source[] {
    return room.find(FIND_SOURCES);
  }

  // find closest container/storage that has at least the amount of energy a creep needs
  static closestContainerOrStorageForPickup(creep: Creep): StructureContainer | StructureStorage | null {
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure =>
        (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) &&
        structure.store[RESOURCE_ENERGY] > (creep.carryCapacity - creep.carry.energy)
    });
    return <StructureContainer | StructureStorage>target;
  }

  // find closest spawner or extension that is not full
  static closestSpawnOrExtension(creep: Creep) {
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure =>
        (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
        structure.energy < structure.energyCapacity
    });
    return target;
  }

  // find closest construction site
  static closestConstructionSite(creep: Creep): ConstructionSite | null {
    let target: ConstructionSite | null = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    return target;
  }

  // find all extensions in current room
  static extensionsInRoom(room: Room): StructureExtension[] | null {
    let extensions = room.find(FIND_MY_STRUCTURES, {
      filter: (structure: Structure) => {
        return structure.structureType == STRUCTURE_EXTENSION
      }
    })
    return <StructureExtension[] | null>extensions;
  }

  // find all towers in current room
  static towersInRoom(room: Room): StructureTower[] {
    let towers = room.find(FIND_MY_STRUCTURES, {
      filter: (structure: Structure) => {
        return structure.structureType == STRUCTURE_TOWER
      }
    })
    return <StructureTower[]>towers;
  }

  // find any structure or construction site with a range
  static structuresOrConstructionWithin(focus: Source | Structure, search: StructureConstant, range: number): number {
    let structures: Structure[] = focus.pos.findInRange(FIND_STRUCTURES, range, {
      filter: (structure: Structure) => {
        return structure.structureType == search
      }
    });
    let constructionSites: ConstructionSite[] = focus.pos.findInRange(FIND_CONSTRUCTION_SITES, range, {
      filter: (construction: ConstructionSite) => {
        return construction.structureType
      }
    });
    let targets: number = Array.prototype.push.apply(structures, constructionSites)
    return targets;
  }
}
