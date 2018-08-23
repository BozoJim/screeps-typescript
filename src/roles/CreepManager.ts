import { Hauler } from "./Hauler";
import { Miner } from "./Miner";
import { SpawnCreeps } from "spawn/SpawnCreeps";
import { Upgrader } from "./Upgrader";
import { Builder } from "./Builder";

export class CreepManager {
  static run() {
    CreepManager.perform();
    CreepManager.spawn();
  }

  static perform() {
    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      switch (creep.memory.role) {
        case "builder":
          Builder.run(creep);
          break;
        case "miner":
          Miner.run(creep);
          break;
        case "hauler":
          Hauler.run(creep);
          break;
        case "upgrader":
          Upgrader.run(creep);
          break;
      }
    }
  }

  static spawn() {
    // Only spawn every 50 ticks. This ensures a separation so that all creeps of an individual role
    // should be at least 50 ticks apart.
    if (Game.time % 50 == 0) {
      for (let name in Game.rooms) {
        SpawnCreeps.run(Game.rooms[name]);
      }
    }
  }
}
