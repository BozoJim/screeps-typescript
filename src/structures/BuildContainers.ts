import { StructureHelper } from "utils/StructureHelper";

export class BuildContainers {
  static run(room: Room) {
    let sources: Array<Source> = StructureHelper.sources(room);
    let controller: StructureController = room.controller!;

    for (let source of sources) {
      this.buildContainers(source, 1)
    }

    this.buildContainers(controller, 2)

  }

  private static findContainers(focus: Source | StructureController) {
    let containers = StructureHelper.structuresOrConstructionWithin(focus, STRUCTURE_CONTAINER, 2)
    return containers;
  }

  private static buildContainers(target: Source | StructureController, max: number) {
    let buildSites = target.room.lookForAtArea(LOOK_TERRAIN, target.pos.y - 1, target.pos.x - 1, target.pos.y + 1, target.pos.x + 1, true);
    for (let buildSite of buildSites) {
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
