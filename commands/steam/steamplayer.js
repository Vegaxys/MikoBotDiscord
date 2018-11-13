//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class SteamPlayerCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'steamplayer',
      group: 'steam',
      memberName: 'steamplayer',
      description: 'find and displays profile page of a user'
    });
  }

  async run(message, args){
    //v!steamplayer [gameName]

    var playerName = args;
    var encodedPseudo = encodeURIComponent(playerName);
    //**********************
    var steamID_URL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${botconfig.steamAPI}&vanityurl=${encodedPseudo}`;
    var steamID = await (await fetch(steamID_URL)).json();
    var user_ID = steamID.response.steamid;
    //**********************
    var userURL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${botconfig.steamAPI}&steamids=${user_ID}`;
    var userJSON = await (await fetch(userURL)).json();
    var player = userJSON.response.players[0];
    //**********************
    var playerStatURL = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${botconfig.steamAPI}&steamid=${user_ID}&format=json`;
    var userJSON = await (await fetch(userURL)).json();
    //finir li'integration de la commande.


    var playerEmbed = new Discord.RichEmbed()
      .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
      .setTitle(`Profil de  ${player.personaname}`)
      .setThumbnail(player.avatarmedium)
      .setColor("#2e7d32")
      .addField(`Date de création`, `${player.timecreated.toUTCString()}`, true)
      .addField(`Nationalité`, `${player.loccountrycode}`)
      .addField(`Date de création`, `${player.timecreated.toUTCString()}`, true)
      ;
    message.channel.send(playerEmbed);
    //**********************

    //**********************

    //**********************

    //**********************

    //**********************

    //**********************

    //**********************
    // var gameEmbed = new Discord.RichEmbed()
    //   .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
    //   .setThumbnail(`${botconfig.resources}/steam/Steam.png`)
    //   .setColor("#2e7d32")
    //   .addField(`DÉVELOPPEUR:`, `${statGame[appID].data.developers}`, true)
    //   .addField(`PRIX:`, `${prix}`, true)
    //   .addField(`DATE DE SORTIE:`, `${statGame[appID].data.release_date.date}`, true)
    //   .addField(`METACRITIQUE:`, `${meracritique}`, true)
    //   .addField(`Page de ${statGame[appID].data.name}`, `${text} [see more](${statGame[appID].data.website})`)
    //   .setImage(splashURL);

    // return message.channel.send(gameEmbed);
  }
}
module.exports = SteamPlayerCommand;
