//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class NyaCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'nya',
      group: 'pictures',
      memberName: 'nya',
      description: 'display a random cat picture'
    });
  }

  async run(message, args){
    //v!nya
    var body = await (await fetch(`http://aws.random.cat/meow`)).json();

    let catEmbed = new Discord.RichEmbed()
      .setColor("#2e7d32")
      .addField("Look at this cat !", `regardez ce magnifique petit minou !! ^OwO^`)
      .setImage(body.file);

  message.channel.send(catEmbed);
  }
}
module.exports = NyaCommand;
