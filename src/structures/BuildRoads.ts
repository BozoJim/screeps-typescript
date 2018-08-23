import { StructureHelper } from "utils/StructureHelper";

export class BuildRoads {
  static run(room: Room) {
    let sources: Source[] = StructureHelper.sources(room);
    // TODO: I don't believe rooms are guaranteed to have a container
    let controller: StructureController = room.controller!;
    sources.forEach(source => {
      let path: PathStep[] = this.findPath(source.pos, controller.pos, room);
      for (let loc of path) {
        if (room.createConstructionSite(loc.x, loc.y, STRUCTURE_ROAD) == 0) {
          // log if a road is being constructed
          console.log("Creating road at: " + room.name + ", " + loc.x + ", " + loc.y)
        }
      }
    });
  }

  static findPath(from: RoomPosition, to: RoomPosition, room: Room) {
    let path: PathStep[] = room.findPath(from, to, {
      // route around creeps. This can create a parking lot if you have too many creeps...
      ignoreCreeps: false,
      ignoreRoads: true,
      swampCost: 1
    });
    return path;
  }
}
