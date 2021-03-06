export class Visuals {
  static run(room: Room) {
    this.labelConstructionSites(room);
    this.labelSpawn(room);
  }

  private static labelConstructionSites(room: Room) {
    let constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    for (let constructionSite of constructionSites) {
      let percent: number = Math.round(
        constructionSite.progress / constructionSite.progressTotal * 100
      )
      // first letter of the construction type and percent. C:50
      room.visual.text(
        constructionSite.structureType.charAt(0).toUpperCase() + ":" + percent,
        constructionSite.pos,
        { font: 0.4, opacity: 0.9 }
      )
    }
  }

  // small text a bit near spawner. Spawning: Hauler:10
  private static labelSpawn(room: Room) {
    let spawns: StructureSpawn[] = room.find(FIND_MY_SPAWNS)
    for (let spawn of spawns) {
      if (spawn.spawning) {
        room.visual.text(
          "Spawning: " + spawn.spawning.name + ":" + spawn.spawning.remainingTime,
          spawn.pos.x + 1, spawn.pos.y,
          { align: "left", font: 0.4, opacity: 0.9 }
        )
      }
    }
  }
}
