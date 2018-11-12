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
    var gameList = await (await fetch(listURL)).json();

    args = args.split(' ');
    var arg01 = args[0];
    args.splice(0, 1);
    var arg02 = args.join(" ");

    var max = gameList.applist.apps.length;
    var name = "undefined";
    var appID = 0;
    var i;
    console.log(max + " " + arg01);
    for (i = 0; i < max; i++) { 
        if(gameList.applist.apps[i].name === arg01){
          name = gameList.applist.apps[i].name;
          appID = gameList.applist.apps[i].appid;
          console.log(name);
          break;
        }
    }
    if(name === "undefined"){
      return message.channel.send("Désolé voyageur, mais je n'ai pas trouvé ce jeu, peut être l'a tu mal écrit.")
    }
    var statURL = `https://store.steampowered.com/api/appdetails?appids=${appID}&cc=fr`;
    var statGame = await (await fetch(statURL)).json();
 //   var data = statGame.${appID}.data;
    var gameEmbed = new Discord.RichEmbed()
      .setAuthor(`Miko | 巫女`, message.author.avatarURL)
      .setTitle(`Page de ${perso.name}, ${perso.title}`)
      .setThumbnail(iconURL)
      .setColor("#2e7d32")
      .setURL("https://universe.leagueoflegends.com/fr_FR/")
      .addField(`Description`, `${perso.blurb} [see more](${loreURL}) `)
      .setImage(splashURL);

    message.channel.send(gameEmbed);
  }
}
module.exports = SteamGameCommand;
