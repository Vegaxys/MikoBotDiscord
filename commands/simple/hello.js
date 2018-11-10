//**********************    Constantes    ****************************
const commando = require("discord.js-commando");

//**********************       class      ****************************
class HelloCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'hello',
      group: 'simple',
      memberName: 'hello',
      description: 'says hello in chat'
    });
  }

  async run(message, args){
    //v!hello
    let reponses = [
      "Bien le bonjour à toi jeune voyageur",
      "Bonjour",
      "Salutation!",
      "Tu as le bonjour de la princesse Miko, soit en reconnaissant",
      "Bonjour, belle journée n'est ce pas ?",
      "Bonsoir"];
    let result = Math.floor(Math.random() * reponses.length);
    console.log('yo');
    return message.channel.send(reponses[result]);
  }
}
module.exports = HelloCommand;
