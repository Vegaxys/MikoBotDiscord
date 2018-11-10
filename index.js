const Commando = require('discord.js-commando');
const botconfig = require("./clefs.json");
global.bot = new Commando.Client({
    commandPrefix: 'v!',
    owner: '200366887031406592',
    disableEveryone: true
});
const clientID = '508948603914420224';

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['simple', 'Simple'],
        ['lol', 'League of Legends'],
        ['moderation', 'Moderation'],
        ['music', 'Music'],
        ['osu', 'Osu'],
        ['weather', 'Weather']])
    .registerDefaultGroups()
    .registerCommandsIn(__dirname + '/commands');


bot.on('message', function(message){
    if(message.content == 'Hello'){
        message.reply('Hello');
    }
});
bot.on("ready", () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Justin Bieber", {type : 'LISTENING'});
  });

bot.login(botconfig.token);