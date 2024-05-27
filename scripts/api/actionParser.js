class ActionParser {
    runAction(player, action) {
        let command = action.startsWith('/') ? action.substring(1) : action;
        player.runCommand(command);
    }
}
export default new ActionParser();