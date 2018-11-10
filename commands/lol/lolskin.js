//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const botconfig = require("../../clefs.json");
const r2 = require('r2');
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

    var champion = encodeURIComponent(args[0]);

    var url = `http://ddragon.leagueoflegends.com/cdn/${botconfig.ddragon}/data/fr_FR/champion/${champion}.json`;
    var perso = await loadPlayer();
    console.log(perso.data[`${champion}`]);
    perso = perso.data[`${champion}`];
    var skins = perso.skins;
    var row = Object.keys(skins).length;
  
    var arrayOfSkins = "";
    var i;
    for (i = 1; i < row; i++) {
        arrayOfSkins += perso.skins[i].name + '\n';
      }
  
    const embed = {
      "color": 4612550,
      "author": {
        "name": "Miko | 巫女",
        "icon_url": bot.user.avatarURL
      },
      "image": {
       "url": "https://cdn.discordapp.com/embed/avatars/0.png"
     },
      "fields": [
        {
          "name": "Noms",
          "value":`${arrayOfSkins}`,
          "inline": true
        },
        {
          "name": "Prix",
          "value": "try exceeding some of them!",
          "inline": true
        },
      ]
    };
  
    message.channel.send("test", {embed});
  
    async function loadPlayer(){
      try {
        var response = await r2.get(url).json
      } catch (e) {
          console.log(e)
      }
      return response;
    }
  }
}
module.exports = LolSkinCommand;