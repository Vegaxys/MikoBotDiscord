//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class _8BallCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: '8ball',
      group: 'simple',
      memberName: '8ball',
      description: 'answers in a question'
    });
  }

  async run(message, args){
    //v!8ball question

  if(!args[2])
  return message.channel.send('Demande moi quelque chose, jeune voyageur.');
  let reponses = [
    "Essaye plus tard",
    "Essaye encore",
    "Pas d'avis",
    "C'est ton destin",
    "Le sort en est jeté",
    "Une chance sur deux",
    "Repose ta question",
    "D'après moi oui",
    "C'est certain ",
    "Oui absolument",
    "Tu peux compter dessus",
    "Sans aucun doute",
    "Très probable",
    "Oui",
    "C'est bien parti",
    "C'est non ",
    "Peu probable",
    "Faut pas rêver",
    "N'y compte pas",
    "Impossible "];

  let result = Math.floor(Math.random() * reponses.length);
  let question = args;

  let ballEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#2e7d32")
  .addField("Question du voyageur :", question)
  .addField("Réponse de la princesse :", reponses[result]);
  return message.channel.send(ballEmbed);
  }
}
module.exports = _8BallCommand;
