import { inherits } from "util";
import { StructureHelper } from "utils/StructureHelper";

export class SpawnCreeps {
  static run(room: Room) {
    var roles = this.buildRoles(room);
    this.spawn(room, roles);
  }

  // tiered approach to build each creep role
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
              WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
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
            parts: [
              CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE
            ]
          },
          4: {
            parts: [
              CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE
            ]
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
    let tier = this.countExtensions(room);
    let spawns = room.find(FIND_MY_SPAWNS);
    for (let spawn of spawns) {
      for (let role in roles) {
        var creeps_of_role = _.filter(Game.creeps, creep => creep.memory.role == role);
        let newName = role + Game.time;
        console.log(role + ": " + creeps_of_role.length);
        if (creeps_of_role.length < roles[role]["count"]) {
          if (
            spawn.spawnCreep(roles[role]["tier"][tier]["parts"], newName, {
              memory: { role: role, room: room.name, working: false }
            })
          ) {
            console.log("Spawning new " + role + ": " + newName);
          }
        }
      }
    }
  }

  // count the number of extensions in the room. Select a tier from the hash above.
  static countExtensions(room: Room) {
    let extensions = StructureHelper.extensionsInRoom(room);
    if (extensions == null) {
      return 1
    }
    switch (true) {
      case extensions != null && extensions.length < 5:
        return 1
      case extensions.length < 10:
        return 2
      case extensions.length < 15:
        return 3
      default:
        return 4;
    }
  }
}
