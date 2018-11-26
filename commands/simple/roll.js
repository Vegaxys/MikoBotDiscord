//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class RollCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'roll',
      group: 'simple',
      memberName: 'roll',
      description: 'get a random number between min and max'
    });
  }

  async run(message, args){
    //v!roll [min] [max]

    var argsArray = args.split(' ');
    var arg0 = argsArray[0];
    argsArray.splice(0, 1);
    var arg1 = argsArray.join(" ");

    let min = parseInt(arg0, 10);
    let max = parseInt(arg1, 10);

  
    var randomNumber = 0;
    randomNumber = Math.random();
    randomNumber *= (max + 1) - min;
    randomNumber += min;
    randomNumber = Math.floor(randomNumber);
  
    let levelEmbed = new Discord.RichEmbed()
      .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
      .setTitle(":game_dice: Lancé de dé :game_dice: ")
      .setColor("#2e7d32")
      .addField("Résultat", randomNumber)
      .setFooter(`Nombre généré entre ${min} et ${max}`)
    message.channel.send(levelEmbed);
  }
}
module.exports = RollCommand;
