//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class HugCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'hug',
      group: 'pictures',
      memberName: 'hug',
      description: 'gives a hug to a user'
    });
  }

  async run(message, args){
    //v!nekogirl [sentence]
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Désolé voyageur, mais tu doit attendre 5 secondes pour redonner un câlin.");
    } else {
        var body = await (await fetch(`https://nekos.life/api/hug`)).json();
        var randomSentances = [
          "Envie d'un gros câlin, sentir la chaleur de tes mains, avoir ce doux frisson d'une tendre passion...",
          "Un câlin vaut bien un festin.",
          "Prends soin de ceux que tu aimes. Un petit câlin fait du bien.",
          "Ne touchez jamais un animal si ce n'est que pour lui faire un énorme câlin.",
          "La vieillesse aime bien faire un câlin avec le temps.",
          "Le câlin est le seul qui apaise les gros chagrins.",
          "Le câlin n'a pas d'heure, il est salutaire de jour comme de nuit.",
          "A vilain chagrin, câlin boute-en-train !",
          "Un câlin est plus fort que mille chagrins.",
          "Les câlins, mieux que l'esperanto, parlent une langue universelle.",
          "La tendresse a des secondes qui battent plus lentement que les autres.",
          "Petit câlin - qui fait du bien - petit matin - main dans la main.",
          "Chat câlin, maître serein, Chat lointain, maître chagrin."
        ];
        var result = Math.floor(Math.random() * randomSentances.length);
        var sentence = "";
        if(args === ""){
          sentence = randomSentances[result];
        }else{
          sentence = args;
        }
        
        let hugEmbed = new Discord.RichEmbed()
            .setColor("#2e7d32")
            .addField(":love_letter:  A hug for you :love_letter: ", sentence)
            .setImage(body.url)
            .setFooter('Powered by nekos.life');
        message.channel.send(hugEmbed);
      // Adds the user to the set so that they can't talk for a minute
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, 5000);
    }
  }
}
module.exports = HugCommand;