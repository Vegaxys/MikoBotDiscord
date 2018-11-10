require('dotenv').config({path: 'H:/OneDrive - e-artsup/MikoBotDiscord/Clefs/.env'});
const Commando = require('discord.js-commando');
const aws = require('aws-sdk');
global.bot = new Commando.Client({
    commandPrefix: 'v!',
    owner: '200366887031406592',
    disableEveryone: true
});
global.configbot = require('./botconfig.json');
global.botconfig = {
    catAPI: process.env.catAPI,
    dogAPI: process.env.dogAPI,
    weatherAPI: process.env.weatherAPI,
    token: process.env.token
  };

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
    bot.user.setActivity("Osu", {type : 'PLAYING'});
  });

bot.login(botconfig.token);