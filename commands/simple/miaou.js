//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const botconfig = require("../../clefs.json");
const querystring = require('querystring');
const r2 = require('r2');
const CAT_API_URL   = "https://api.thecatapi.com/";
//**********************       class      ****************************
class MiaouCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'miaou',
      group: 'simple',
      memberName: 'miaou',
      description: 'display a random cat picture'
    });
  }

  async run(message, args){
    //v!miaou
    try{
      var headers = {'X-API-KEY': botconfig.catAPI,}
      var query_params = {
        'mime_types':'jpg,png', 
        'size':'small',  
        'sub_id': message.author.username,
        'limit' : 1
      }
      // convert this obejc to query string
      let queryString = querystring.stringify(query_params);
      let url = CAT_API_URL + `v1/images/search?${queryString}`;
      var images = await (await fetch(url, {headers})).json();

      // get the Image, and first Breed from the returned object.
      var image = images[0];

      // use the *** to make text bold, and * to make italic
      let miaouEmbed = new Discord.RichEmbed()
        .setColor("#2e7d32")
        .setImage(image.url)
        .addField("Look at this cat !", `regardez ce magnifique petit minou !! ^OwO^`)
        .setFooter("Powered by CatAPI");
      message.channel.send(miaouEmbed);
      // if you didn't want to see the text, just send the file
  
    }catch(error)
    {
      console.log(error)
    }
  }
}
module.exports = MiaouCommand;
