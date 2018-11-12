//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class SteamGameCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'steamgame',
      group: 'steam',
      memberName: 'steamgame',
      description: 'find and displays infos about a steam game'
    });
  }

  async run(message, args){
    //v!steamgame [gameName]
    var listURL = 'http://api.steampowered.com/ISteamApps/GetAppList/v2';

    if(gameList == '[object Object]'){
      gameList = await (await fetch(listURL)).json();
    }
    //**********************
    var max = gameList.applist.apps.length;
    var name = "undefined";
    var appID = 0;
    var i;
    //**********************
    for (i = 0; i < max; i++) { 
        if(gameList.applist.apps[i].name === args){
          name = gameList.applist.apps[i].name;
          appID = gameList.applist.apps[i].appid;
          break;
        }
    }
    //**********************
    if(name === "undefined"){
      return message.channel.send("Désolé voyageur, mais je n'ai pas trouvé ce jeu, peut être l'a tu mal écrit (Pense aux majuscules).")
    }
    var statURL = `https://store.steampowered.com/api/appdetails?appids=${appID}&cc=fr`;
    var statGame = await (await fetch(statURL)).json();
    var splashURL = statGame[appID].data.header_image;
    //**********************
    var description = statGame[appID].data.short_description;
    var text = description.replace(/&quot;/g, '\\"');
    //**********************
    var prix = 0;
    if(statGame[appID].data.is_free == true){
      prix = 'free';
    }else{
      statGame[appID].data.price_overview.final / 100;
    }
    //**********************
    var meracritique = 0;
    if(statGame[appID].data.hasOwnProperty('metacritic')){
      meracritique = statGame[appID].data.metacritic.score;
    }else{
      meracritique = 'null';
    }
    //**********************
    var gameEmbed = new Discord.RichEmbed()
      .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
      .setThumbnail(`${botconfig.resources}/steam/Steam.png`)
      .setColor("#2e7d32")
      .addField(`DÉVELOPPEUR:`, `${statGame[appID].data.developers}`, true)
      .addField(`PRIX:`, `${prix}`, true)
      .addField(`DATE DE SORTIE:`, `${statGame[appID].data.release_date.date}`, true)
      .addField(`METACRITIQUE:`, `${meracritique}`, true)
      .addField(`Page de ${statGame[appID].data.name}`, `${text} [see more](${statGame[appID].data.website})`)
      .setImage(splashURL);

    return message.channel.send(gameEmbed);
  }
}
module.exports = SteamGameCommand;
