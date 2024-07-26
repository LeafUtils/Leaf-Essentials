import { world, system } from '@minecraft/server';

world.beforeEvents.playerBreakBlock.subscribe(e => {
    const player = e.player;
    if (player.hasTag('Spawn')) {
        e.cancel = true;
        system.run(() => {
            player.onScreenDisplay.setActionBar("§cYou can't do that here");
        });
    }
});
world.beforeEvents.playerPlaceBlock.subscribe(e=>{
    const player = e.player;
    if (player.hasTag('Spawn')) {
        e.cancel = true;
        system.run(() => {
            player.onScreenDisplay.setActionBar("§cYou can't do that here");
        });
    }
});
world.beforeEvents.playerInteractWithBlock.subscribe( e=> {
    const player = e.player;
    if (player.hasTag('Spawn')) {
        e.cancel = true;
        system.run(() => {
            player.onScreenDisplay.setActionBar("§cYou can't do that here");
        });
    }
});
world.beforeEvents.playerInteractWithEntity.subscribe( e=> {
    const player = e.player;
    if (player.hasTag('Spawn')) {
        e.cancel = true;
        system.run(() => {
            player.onScreenDisplay.setActionBar("§cYou can't do that here");
        });
    }
});
function loop() {
    for(const player of world.getPlayers()) {
        if(player.hasTag('Spawn')) {
            player.onScreenDisplay.setActionBar("§aSpawn");
    }
    }
}
system.runInterval(() => {
    loop();
}, 1);