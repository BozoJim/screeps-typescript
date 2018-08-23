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
      room.visual.text(
        constructionSite.structureType.charAt(0).toUpperCase() + ":" + percent,
        constructionSite.pos,
        { font: 0.4, opacity: 0.9 }
      )
    }
  }

  private static labelSpawn(room: Room) {
    let spawns: Array<StructureSpawn> = room.find(FIND_MY_SPAWNS)
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
