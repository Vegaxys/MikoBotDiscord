//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class LolPlayerCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'lolplayer',
      group: 'lol',
      memberName: 'lolplayer',
      description: 'find and displays infos about a league player'
    });
  }

  async run(message, args){
    //v!lolplayer [player]
   
    args = args.split(' ');
    var server = args[0];
    args.splice(0, 1);
    var playerName = args.join(" ");
  
    var encodedPseudo = encodeURIComponent(playerName);
    var url = 'https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + encodedPseudo + '?api_key=' + botconfig.riotAPI;
    var player = await (await fetch(url)).json();
    var image = `http://ddragon.leagueoflegends.com/cdn/${configbot.ddragon}/img/profileicon/` + player.profileIconId + ".png";
  
    var playerEmbed = new Discord.RichEmbed()
      .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
      .setTitle(`Profil de  ${player.name}`)
      .setThumbnail(image)
      .setColor("#2e7d32")
      .addField(`Niveau`, `Niveau ${player.summonerLevel}`, true)
      .addField(`Serveur`, `Serveur ${server}`, true);
  
    message.channel.send(playerEmbed);
  }
}
module.exports = LolPlayerCommand;