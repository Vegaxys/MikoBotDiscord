//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class PatCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'pat',
      group: 'pictures',
      memberName: 'pat',
      description: 'gives a pat to a user'
    });
  }

  async run(message, args){
    //v!nekogirl [sentence]
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Désolé voyageur, mais tu doit attendre 5 secondes pour redonner un câlin.");
    } else {
        var body = await (await fetch(`https://nekos.life/api/pat`)).json();
        var randomSentances = [
          "Les caresses des yeux sont les plus adorables.",
          "Les caresses n'ont jamais transformé un tigre en chaton.",
          "Il est dans l'amour de certaines caresses que l'amour nous apprend.",
          "La chair des femmes se nourrit de caresses comme l'abeille de fleurs.",
          "Mon plus grand malheur fut toujours de ne pouvoir résister aux caresses.",
          "Si tu ne sais pas quoi faire de tes mains, transforme-les en caresses.",
          "Faire des compliments à celle qu'on aime est la première façon de faire des caresses.",
          "Le chat ne nous caresse pas, il se caresse à nous.",
          "Quand on veut la fille, on caresse le bonhomme.",
          "Un chant d'amour est comme une caresse mise en musique.",
          "Caresse : une calotte de velours.",
          "Les chats sont des êtres faits pour emmagasiner la caresse.",
          "Tout compliment est une caresse."
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
            .addField(":hugging: A pat for you :hugging:", sentence)
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
module.exports = PatCommand;