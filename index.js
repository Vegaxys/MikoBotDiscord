//**********************    Constantes    ****************************
require('dotenv').config({path: 'C:./Clefs/.env'}); //H:/OneDrive - e-artsup/MikoBotDiscord/Clefs/.env
const Commando = require('discord.js-commando');
const express = require('express');
const app = express();
global.talkedRecently = new Set();
global.configbot = require('./botconfig.json');
global.gameList = require('./gameList.json');
global.champions = require('./champions.json');
//**********************       Code       ****************************
global.botconfig = {
    commandPrefix: process.env.commandPrefix,   //WARNING
    catAPI: process.env.catAPI,
    dogAPI: process.env.dogAPI,
    weatherAPI: process.env.weatherAPI,
    token: process.env.token,                   //WARNING
    osuAPI: process.env.osuAPI,
    riotAPI: process.env.riotAPI,
    steamAPI: process.env.steamAPI,
    resources: process.env.resources,
    luscious: process.env.luscious,
  };
global.bot = new Commando.Client({
commandPrefix: botconfig.commandPrefix,
owner: '200366887031406592',
disableEveryone: true });
bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['simple', 'Simple'],
        ['lol', 'League of Legends'],
        ['moderation', 'Moderation'],
        ['steam', 'Steam'],
        ['nsfw', 'Not Safe For Work'],
        ['pictures', 'Pictures'],
        ['osu', 'Osu'],
        ['weather', 'Weather']])
    .registerDefaultGroups()
    .registerCommandsIn(__dirname + '/commands');

bot.on("ready", () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("donner des câlins", {type : 'PLAYING'});
  });
app.listen(process.env.PORT);

bot.on('error', console.error);
bot.on("message", (message) => { 
    if(message.content.startsWith("<:brrr:")){
        message.channel.send(`Bonjour ${message.author.username}, bien dormi ?`);
    }
});

bot.login(botconfig.token);
