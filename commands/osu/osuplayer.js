//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const querystring = require('querystring');
//**********************       class      ****************************
class OsuPlayerCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'osuplayer',
      group: 'simple',
      memberName: 'osuplayer',
      description: 'display the osu profile of a player'
    });
  }

  async run(message, args){
    //v!osuplayer [mode] [player]

    var argsArray = args.split(' ');
    argsArray.splice(0, 1);
    var arg1 = argsArray.join(" ");

    let playerName = arg1;
    let mode = argsArray[0];
    let colors = ["red", "orange", "yellow", "green", "blue", "purple",
    "pink", "black"]
    let randomColor = Math.floor(Math.random() * colors.length);

    if(mode === "normal")
        mode = 0;
    if(mode === "taiko")
        mode = 1;
    if(mode === "ctb")
        mode = 2;
    if(mode === "mania")
        mode = 3;

    var encodedPseudo = encodeURIComponent(playerName);

    var query_params = {
        'colour':colors[randomColor],
        'uname':encodedPseudo,
        'mode':mode,
        'countryrank':true,
        'opaqueavatar':true,
        'onlineindicator': 'undefined',
        'xpbar': true,
        'darktriangles':true,
        'avatarrounding':10,
        'xpbarhex' : true
    }
    let queryString = querystring.stringify(query_params);

    var playerEmbed = new Discord.RichEmbed()
        .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
        .setTitle(`Profil de  ${playerName}`)
        .setThumbnail(`https://ignitegame.000webhostapp.com/Miko/osu/osu.png`)
        .setColor("#2e7d32")
        .setImage(`https://lemmmy.pw/osusig/sig.php?${queryString}`)
        .setFooter("Powered by lemmmy.pw");

    message.channel.send(playerEmbed);
  }
}
module.exports = OsuPlayerCommand;