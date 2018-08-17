import { SourceLocation } from "estree";
import { SourceFindPosition, SourceNode } from "source-map";

export class CreepHelper {
  static transferTo(creep: Creep, target: Structure, resource: ResourceConstant): any {
    if (creep.transfer(target, resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
  static buildTo(creep: Creep, constructionSite: ConstructionSite) {
    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
      creep.moveTo(constructionSite);
    }
  }

  static harvestTo(creep: Creep, source: Source) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }

  static pickupTo(creep: Creep, destination: Resource) {
    if (creep.pickup(destination) == ERR_NOT_IN_RANGE) {
      creep.moveTo(destination);
    }
  }

  static storeTo(creep: Creep, destination: StructureContainer | StructureStorage, resource: ResourceConstant) {
    if (creep.transfer(destination, resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(destination);
    }
  }

  static upgradeTo(creep: Creep, controller: StructureController) {
    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
  }

  static withdrawTo(creep: Creep, destination: StructureContainer | StructureStorage, resource: ResourceConstant) {
    if (creep.withdraw(destination, resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(destination);
    }
  }
}

// Creep.prototype.harvestTo = function(source: Source) {
//   return CreepHelper.harvest(this, source);
// };
