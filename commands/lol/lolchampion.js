//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const botconfig = require("../../botconfig.json");
const Discord = require('discord.js');
const r2 = require('r2');
//**********************       class      ****************************
class LolChampionCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'lolchampion',
      group: 'lol',
      memberName: 'lolchampion',
      description: 'find and displays infos about a league champion'
    });
  }

  async run(message, args){
    //v!lolchampion [champion]
    var champion = encodeURIComponent(args);

    var url = `http://ddragon.leagueoflegends.com/cdn/${botconfig.ddragon}/data/fr_FR/champion/${champion}.json`;
    var iconURL = `http://ddragon.leagueoflegends.com/cdn/${botconfig.ddragon}/img/champion/${champion}.png`;
    var splashURL = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
    var loreURL = `https://universe.leagueoflegends.com/fr_FR/story/champion/${champion}/`
    console.log(args);
    console.log(url);
    var perso = await (await fetch(url)).json();
    perso = perso.data[`${champion}`];

    var championEmbed = new Discord.RichEmbed()
      .setAuthor(`Miko | 巫女`, message.author.avatarURL)
      .setTitle(`Page de ${perso.name}, ${perso.title}`)
      .setThumbnail(iconURL)
      .setColor("#2e7d32")
      .setURL("https://universe.leagueoflegends.com/fr_FR/")
      .addField(`Description`, `${perso.blurb} [see more](${loreURL}) `)
      .setImage(splashURL);

    message.channel.send(championEmbed);
  }
}
module.exports = LolChampionCommand;
