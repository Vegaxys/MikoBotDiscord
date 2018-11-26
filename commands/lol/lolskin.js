//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
var skins = require('../../skins.json');
//**********************       class      ****************************
function getType(value) {
  if(value === 3250 || value === 2775)
    return bot.emojis.find(emoji => emoji.name === "ULTIME") + 'Ultime';
  if(value === 10)
    return bot.emojis.find(emoji => emoji.name === "HEXTECH") + 'Hextech';
  if(value === 1820)
    return bot.emojis.find(emoji => emoji.name === "LEGENDARY") + 'Legendary';
  if(value === 1350)
    return bot.emojis.find(emoji => emoji.name === "EPIC") + 'Epic';

  return bot.emojis.find(emoji => emoji.name === "NORMAL") + 'Normal';
}
class LolSkinCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'lolskin',
      group: 'lol',
      memberName: 'lolskin',
      description: 'find and displays infos about skins of a champion'
    });
  }

  async run(message, args){
    //v!lolskin [champion]

    var champion = encodeURIComponent(args);

    var url = `http://ddragon.leagueoflegends.com/cdn/${configbot.ddragon}/data/en_US/champion/${champion}.json`;
    var perso = await (await fetch(url)).json();

    perso = perso.data[`${champion}`];
    var championSkins = perso.skins;
    var row = Object.keys(championSkins).length;

    var arrayOfSkins = "";
    var arrayOfPrix = "";
    var arrayOfType = "";

    var skinEmote = bot.emojis.find(emoji => emoji.name === "SKIN");
    var rpEmote = bot.emojis.find(emoji => emoji.name === "RP");
    var hexEmote = bot.emojis.find(emoji => emoji.name === "GEM");

    var currentSkins = skins[`${champion}`].skins;

    for (var i = 1; i < row; i++) {
        arrayOfSkins += `${i} |${skinEmote} `+ perso.skins[i].name + '\n';
        if(currentSkins[`${Object.keys(currentSkins)[i]}`].cost == 10){
          arrayOfPrix += `${hexEmote} `+ currentSkins[`${Object.keys(currentSkins)[i]}`].cost + '\n';
        }else{
          arrayOfPrix += `${rpEmote} `+ currentSkins[`${Object.keys(currentSkins)[i]}`].cost + '\n';
        }
        arrayOfType += `${getType(currentSkins[`${Object.keys(currentSkins)[i]}`].cost)}` + '\n';
      }

    var nudePicture = new Discord.RichEmbed()
    .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
    .setColor("#2e7d32")
    .setTitle(`Liste des skins de ${perso.name}, ${perso.title}`)
    .addField(`Skins`, `${arrayOfSkins}`, true)
    .addField(`Prix`, `${arrayOfPrix}`, true)
    .addField(`Type`, `${arrayOfType}`, true)
    message.channel.send(nudePicture);
  }
}
module.exports = LolSkinCommand;