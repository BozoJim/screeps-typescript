import { inherits } from "util";
import { StructureHelper } from "utils/StructureHelper";

export class SpawnCreeps {
  static run(room: Room) {
    var roles = this.buildRoles(room);
    this.spawn(room, roles);
  }

  static buildRoles(room: Room) {
    let construcion_count = StructureHelper.constructionSites(room).length;
    let source_count = StructureHelper.sources(room).length;
    var roles = {
      builder: {
        count: Math.ceil(construcion_count / 4),
        tier: {
          1: { parts: [WORK, WORK, CARRY, MOVE] },
          2: { parts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] },
          3: { parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] },
          4: {
            parts: [
              WORK,
              WORK,
              WORK,
              WORK,
              WORK,
              WORK,
              CARRY,
              CARRY,
              CARRY,
              CARRY,
              CARRY,
              CARRY,
              MOVE,
              MOVE,
              MOVE,
              MOVE,
              MOVE,
              MOVE
            ]
          }
        }
      },
      hauler: {
        count: source_count,
        tier: {
          1: { parts: [WORK, WORK, CARRY, MOVE] },
          2: { parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] },
          3: {
            parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
          },
          4: {
            parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
          }
        }
      },
      miner: {
        count: source_count,
        tier: {
          1: { parts: [WORK, WORK, CARRY, MOVE] },
          2: { parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE] },
          3: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] },
          4: { parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE] }
        }
      },
      upgrader: {
        count: 3,
        tier: {
          1: { parts: [WORK, WORK, CARRY, MOVE] },
          2: { parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE] },
          3: { parts: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE] },
          4: { parts: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE] }
        }
      }
    };
    return roles;
  }

  static spawn(room: Room, roles: any) {
    let spawns = room.find(FIND_MY_SPAWNS);
    for (let spawn of spawns) {
      for (let role in roles) {
        var creeps_of_role = _.filter(Game.creeps, creep => creep.memory.role == role);
        let newName = role + Game.time;
        console.log(role + ": " + creeps_of_role.length);
        if (creeps_of_role.length < roles[role]["count"]) {
          if (
            spawn.spawnCreep(roles[role]["tier"][1]["parts"], newName, {
              memory: { role: role, room: room.name, working: false }
            })
          ) {
            console.log("Spawning new " + role + ": " + newName);
          }
        }
      }
    }
  }

  // static creepName(role: any) {
  //   for (let creepCounter = 0; ; creepCounter++) {
  //     console.log(role + "_" + creepCounter);
  //     for (const name in Memory.creeps) {
  //       if (!(role + "_" + creepCounter in Game.creeps)) {
  //         console.log(role + "_" + creepCounter);
  //         return "role" + "_" + creepCounter;
  //       }
  //     }
  //   }
  // }
}
