if (me === undefined || me.username != "admin") {
cancel("No authorization", 401);
}