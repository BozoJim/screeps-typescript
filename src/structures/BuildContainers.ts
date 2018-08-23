import { StructureHelper } from "utils/StructureHelper";

export class BuildContainers {
  static run(room: Room) {
    let sources: Source[] = StructureHelper.sources(room);
    // TODO: I don't believe rooms are guaranteed to have a container
    let controller: StructureController = room.controller!;
    for (let source of sources) {
      this.buildContainers(source, 1)
    }
    this.buildContainers(controller, 2)
  }

  // search for containers within 2 spaces of a source or controller
  private static findContainers(focus: Source | StructureController) {
    let containers = StructureHelper.structuresOrConstructionWithin(focus, STRUCTURE_CONTAINER, 2)
    return containers;
  }

  // construct <max> containers near an object.
  private static buildContainers(target: Source | StructureController, max: number) {
    let buildSites = target.room.lookForAtArea(LOOK_TERRAIN, target.pos.y - 1, target.pos.x - 1, target.pos.y + 1, target.pos.x + 1, true);
    for (let buildSite of buildSites) {
      // we have to count every time to ensure we don't place too many in a single tick.
      if (this.findContainers(target) < max) {
        if (target.room.createConstructionSite(buildSite.x, buildSite.y, STRUCTURE_CONTAINER) == 0) {
          // log if a container is being constructed
          console.log("Creating container at: " + target.room.name + ", " + buildSite.x + ", " + buildSite.y)
          break;
        }
      }
    }
  }
}
