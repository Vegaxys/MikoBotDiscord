//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
//**********************       class      ****************************
class ClearCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'clear',
      group: 'moderation',
      memberName: 'clear',
      description: 'delete X messages in this channel'
    });
  }

  async run(message, args){
    //v!clear [number]

    if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send(`Désolé voyageur, mais tu n'a pas le droit de faire ça`);
    if(!args)
        return message.channel.send(`Combien de messages dois-je supprimer ?`);
    message.channel.bulkDelete(args).then(() => {
        message.channel.send(`${args} messages ont été supprimés`).then(msg => msg.delete(5000));
        });
    }
}
module.exports = ClearCommand;