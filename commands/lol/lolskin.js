//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const Request = require('request');
const Cheerio = require('cheerio');
//**********************       class      ****************************
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

    var url = `http://ddragon.leagueoflegends.com/cdn/${configbot.ddragon}/data/fr_FR/champion/${champion}.json`;
    var perso = await (await fetch(url)).json();

    perso = perso.data[`${champion}`];
    var skins = perso.skins;
    var row = Object.keys(skins).length;

    var i;
    var arrayOfSkins = "";
    var arrayOfPRrix = "";
    var skin = bot.emojis.find(emoji => emoji.name === "SKIN");

    for (i = 1; i < row; i++) {
        arrayOfSkins += `${skin} `+ perso.skins[i].name + '\n';
      }
    i = 0;
    for (i = 1; i < row; i++) {
      arrayOfPRrix += perso.skins[i].name + '\n';
    }

    var nudePicture = new Discord.RichEmbed()
    .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
    .setColor("#2e7d32")
    .setTitle(`Liste des skins de ${perso.name}, ${perso.title}`)
    .addField(`Skins`, `${arrayOfSkins}`, true)
    .addField(`Prix`, `${arrayOfPRrix}`, true)
    message.channel.send(nudePicture);
  }
}
module.exports = LolSkinCommand;