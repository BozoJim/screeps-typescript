import { ErrorMapper } from "utils/ErrorMapper";
import { CreepManager } from "roles/CreepManager";
import { BuildingManager } from "structures/BuildingManager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  CreepManager.run();

  for (let name in Game.rooms) {
    let room = Game.rooms[name];
    BuildingManager.run(room);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
