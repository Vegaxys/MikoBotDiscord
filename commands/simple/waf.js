//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class WafCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'waf',
      group: 'simple',
      memberName: 'waf',
      description: 'display a random dog picture'
    });
  }

  async run(message, args){
    //v!waf
    var body = await (await fetch(`https://random.dog/woof.json`)).json();
    console.log(body);
    
    let dogEmbed = new Discord.RichEmbed()
      .setColor("#2e7d32")
      .addField("Look at this dog !", `regardez ce magnifique chien !! ^OwO^`)
      .setImage(body.url);

  message.channel.send(dogEmbed);
  }
}
module.exports = WafCommand;
