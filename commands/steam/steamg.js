//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const fs = require('fs');
//**********************       class      ****************************
class SteamGameCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'steamg',
      group: 'steam',
      memberName: 'steamg',
      description: 'find and displays infos about a steam game'
    });
  }

  async run(message, args){
    //v!steamgame [gameName]

    //**********************
    var max = gameList.applist.apps.length;
    var name = "undefined";
    var appID = 0;
    var i;
    var games = [];
    //**********************
    for (i = 0; i < max; i++) { 
      if(gameList.applist.apps[i].name.toLowerCase() === args.toLowerCase()){
        name = gameList.applist.apps[i].name;
        appID = gameList.applist.apps[i].appid;
        console.log(appID);
        break;
      }
      if(gameList.applist.apps[i].name.toLowerCase().includes(args.toLowerCase()) && games.length < 20){
        games.push(gameList.applist.apps[i].name);
      }
    }
    //**********************
    var arrayOfGames = "";
    games.sort();
    for (i = 1; i < games.length; i++) {
      arrayOfGames += games[i] + '\n';
    }
    //**********************
    if(name === "undefined"){
      return message.channel.send(`Désolé voyageur, mais je n'ai pas trouvé ce jeu, peut être l'a tu mal écrit. Essaye avec : \n${arrayOfGames}`)
    }
    var statURL = `https://store.steampowered.com/api/appdetails?appids=${appID}&cc=fr`;
    var statGame = await (await fetch(statURL)).json();
    var splashURL = statGame[appID].data.header_image;
    //**********************
    var description = statGame[appID].data.short_description;
    var text = description.replace(/&quot;/g, '\\"');
    //**********************
    var prix = '0';
    if(statGame[appID].data.is_free === true){
      prix = 'free';
    }else if (statGame[appID].data.release_date.coming_soon === true){
      prix = `coming soon`;
    }else{
      prix = `${statGame[appID].data.price_overview.final / 100} €`;
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
