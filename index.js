require('dotenv').config({path: 'C:./Clefs/.env'}); //H:/OneDrive - e-artsup/MikoBotDiscord/Clefs/.env
const Commando = require('discord.js-commando');
const express = require('express');
const app = express();
global.configbot = require('./botconfig.json');
global.gameList = require('./gameList.json');
global.botconfig = {
    commandPrefix: process.env.commandPrefix,   //WARNING
    catAPI: process.env.catAPI,
    dogAPI: process.env.dogAPI,
    weatherAPI: process.env.weatherAPI,
    token: process.env.token,                   //WARNING
    osuAPI: process.env.osuAPI,
    riotAPI: process.env.riotAPI,
    resources: process.env.resources
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
        ['osu', 'Osu'],
        ['weather', 'Weather']])
    .registerDefaultGroups()
    .registerCommandsIn(__dirname + '/commands');

bot.on("ready", () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Osu", {type : 'PLAYING'});
  });

app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
  });
app.listen(process.env.PORT);

bot.on('error', console.error);

bot.login(botconfig.token);
