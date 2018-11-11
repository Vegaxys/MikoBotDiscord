//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const querystring = require('querystring');
//**********************       class      ****************************
class OsuPlayerCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'osuplayer',
      group: 'osu',
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

    if(mode === "normal")
        mode = 0;
    if(mode === "taiko")
        mode = 1;
    if(mode === "ctb")
        mode = 2;
    if(mode === "mania")
        mode = 3;

    var encodedPseudo = encodeURIComponent(arg02);

    //****************************************************** get l'image */

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

    //****************************************************** get les donnés */
    var query_player = {
        'u':encodedPseudo,
        'k':botconfig.osuAPI,
        'm': mode
    }
    let playerString = querystring.stringify(query_player);
    var url = `https://osu.ppy.sh/api/get_user?${playerString}`;
    var player = await (await fetch(url)).json();
    var playerPage = `https://osu.ppy.sh/users/${player[0].user_id}`;

    var playerEmbed = new Discord.RichEmbed()
        .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
        .setThumbnail(`https://ignitegame.000webhostapp.com/Miko/osu/osu.png`)
        .setColor("#2e7d32")
        .addField(`Profil de  ${arg02}`, `
            Ici depuis ${player[0].join_date}
            Score total : ${player[0].total_score.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')}
            Score Ranked : ${player[0].ranked_score.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')}
            [see more](${playerPage}) `)
        .setImage(`https://lemmmy.pw/osusig/sig.php?${queryString}`)
        .setFooter("Powered by lemmmy.pw");

    message.channel.send(playerEmbed);
  }
}
module.exports = OsuPlayerCommand;