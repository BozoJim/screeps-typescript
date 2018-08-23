import { BuildRoads } from "./BuildRoads";
import { BuildContainers } from "./BuildContainers";
import { Visuals } from "./Visuals";

export class BuildingManager {
  static run(room: Room) {
    if (Game.time % 100 == 0) {
      BuildRoads.run(room);
      BuildContainers.run(room);
    }
    Visuals.run(room);
  }
}
