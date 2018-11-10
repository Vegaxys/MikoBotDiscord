//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
//**********************       class      ****************************
class SayCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'say',
      group: 'simple',
      memberName: 'say',
      description: 'delete and repeat a sentence'
    });
  }

  async run(message, args){
    //v!say [sentence]
    
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`Désolé voyageur, mais tu n'a pas le droit de faire ça`);

  message.delete().catch();
  return message.channel.send(args);
  }
}
module.exports = SayCommand;
