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

    args = args.split(' ');
    var arg01 = args[0];
    args.splice(0, 1);
    var arg02 = args.join(" ");

    let mode = arg01;
    let colors = ["red", "orange", "yellow", "green", "blue", "purple",
    "pink", "black"]
    let randomColor = Math.floor(Math.random() * colors.length);

    console.log(mode);

    if(mode === "normal")
        mode = 0;
    if(mode === "taiko")
        mode = 1;
    if(mode === "ctb")
        mode = 2;
    if(mode === "mania")
        mode = 3;

    var encodedPseudo = encodeURIComponent(arg02);

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
        .setTitle(`Profil de  ${arg02}`)
        .setThumbnail(`https://ignitegame.000webhostapp.com/Miko/osu/osu.png`)
        .setColor("#2e7d32")
        .setImage(`https://lemmmy.pw/osusig/sig.php?${queryString}`)
        .setFooter("Powered by lemmmy.pw");

    message.channel.send(playerEmbed);
  }
}
module.exports = OsuPlayerCommand;