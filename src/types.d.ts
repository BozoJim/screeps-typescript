// example declaration file - remove these and add your own custom typings

// memory extension samples
// interface CreepMemory {
//   role: string;
//   room: string;
//   working: boolean;
// }

interface CreepMemory {
  [name: string]: any;
}
interface FlagMemory {
  [name: string]: any;
}
interface SpawnMemory {
  [name: string]: any;
}
interface RoomMemory {
  [name: string]: any;
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}

interface Creep {
  harvestTo(source: Source): number;
}
