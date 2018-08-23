import { SourceLocation } from "estree";
import { SourceFindPosition, SourceNode } from "source-map";

export class CreepHelper {
  // transfer resource to target or move to that target.
  static transferTo(creep: Creep, target: StructureExtension | StructureStorage, resource: ResourceConstant): any {
    if (creep.transfer(target, resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }

  // build a construction site or move to that site
  static buildTo(creep: Creep, constructionSite: ConstructionSite) {
    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
      creep.moveTo(constructionSite);
    }
  }

  // harvest a source or move to that source
  static harvestTo(creep: Creep, source: Source) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }

  // pick up a resource or move to that resource
  static pickupTo(creep: Creep, destination: Resource) {
    if (creep.pickup(destination) == ERR_NOT_IN_RANGE) {
      creep.moveTo(destination);
    }
  }

  // upgrade a controller or move to that controller
  static upgradeTo(creep: Creep, controller: StructureController) {
    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
  }

  // withdraw a resource from container/storage or move to that container/storage
  static withdrawTo(creep: Creep, destination: StructureContainer | StructureStorage, resource: ResourceConstant) {
    if (creep.withdraw(destination, resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(destination);
    }
  }
}

// Creep.prototype.harvestTo = function(source: Source) {
//   return CreepHelper.harvest(this, source);
// };
