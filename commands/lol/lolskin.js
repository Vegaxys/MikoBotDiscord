//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
var skins = require('../../skins.json');
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

    var url = `http://ddragon.leagueoflegends.com/cdn/${configbot.ddragon}/data/en_US/champion/${champion}.json`;
    var perso = await (await fetch(url)).json();

    perso = perso.data[`${champion}`];
    var championSkins = perso.skins;
    var row = Object.keys(championSkins).length;

    var arrayOfSkins = "";
    var arrayOfPRrix = "";
    var skinEmote = bot.emojis.find(emoji => emoji.name === "SKIN");


    var currentSkins = skins[`${champion}`].skins;
    console.log(Object.keys(currentSkins)[1].id);

    // for (var i = 1; i < row; i++) {
    //   for (var x = 1; x < row; x++) {
    //     if(Object.keys(currentSkins)[x] == perso.skins[i].name){

    //     }
    //   }
    //   arrayOfPRrix += skins[`${champion}`][`${perso.skins[i].name}`].cost + '\n';
    // }


    for (var i = 1; i < row; i++) {
        arrayOfSkins += `${skinEmote} `+ perso.skins[i].name + '\n';
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