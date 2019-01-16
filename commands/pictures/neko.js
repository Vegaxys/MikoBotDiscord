//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class NekoCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'neko',
      group: 'pictures',
      memberName: 'neko',
      description: 'display a neko girl picture based on tags'
    });
  }

  async run(message, args){
    //v!nekogirl [arg]
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Désolé voyageur, mais tu doit attendre 10 secondes pour recommencer");
    } else {
        if(args == 'lewd'){
            var body = await (await fetch(`https://nekos.life/api/lewd/neko`)).json();
        }else{
            var body = await (await fetch(`https://nekos.life/api/neko`)).json();
        }
        let catEmbed = new Discord.RichEmbed()
            .setColor("#2e7d32")
            .addField("Look at this nekogirl !", `^OwO^`)
            .setImage(body.neko)
            .setFooter('Powered by nekos.life');
        message.channel.send(catEmbed);
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
        }, 10000);
    }
  }
}
module.exports = NekoCommand;