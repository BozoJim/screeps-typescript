import { StructureHelper } from "utils/StructureHelper";

export class BuildRoads {
  static run(room: Room) {
    let sources: Array<Source> = StructureHelper.sources(room);
    let controller: StructureController = room.controller!;
    sources.forEach(source => {
      let path: Array<PathStep> = this.findPath(source.pos, controller.pos, room);
      for (let loc of path) {
        room.createConstructionSite(loc.x, loc.y, STRUCTURE_ROAD);
      }
    });
  }

  static findPath(from: RoomPosition, to: RoomPosition, room: Room) {
    let path: Array<PathStep> = room.findPath(from, to, {
      ignoreCreeps: true,
      ignoreRoads: true
    });
    return path;
  }
}