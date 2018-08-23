import { BuildRoads } from "./BuildRoads";
import { BuildContainers } from "./BuildContainers";
import { Tower } from "./Tower";
import { Visuals } from "./Visuals";

export class BuildingManager {
  static run(room: Room) {
    // only build every 100 ticks to reduce CPU and unnecessary roads.
    if (Game.time % 100 == 0) {
      BuildRoads.run(room);
      BuildContainers.run(room);
      Tower.run(room);
    }
    Visuals.run(room);
  }
}
