//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
//**********************       class      ****************************
class RemoveRoleCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'removerole',
      group: 'moderation',
      memberName: 'removerole',
      description: 'remove a role to a user'
    });
  }

  async run(message, args){
    //vega!removerole @user role

    var argsArray = args.split(' ');
    argsArray.splice(0, 1);
    var arg1 = argsArray.join();

    if(!message.member.hasPermission("MANAGE_ROLES"))
        return message.reply("Désolé voyageur, mais tu n'a pas le droit de faire ça");
    let roleMember = message.guild.member(message.mentions.users.first() ||
        message.guild.members.get(args[0]));
    if(!roleMember)
        return message.channel.send("Désolé, mais ce voyageur n'existe pas");
    let role = arg1;
    if(!role)
        return message.channel.send("Quel rôle dois-je ajouter ??");
    let guildRole = message.guild.roles.find(`name`, role);
    if(!guildRole)
        return message.channel.send("Désolé, mais ce rôle n'existe pas");

    if(!roleMember.roles.has(guildRole.id))
        return message.reply("Désolé, mais ce voyageur n'a pas ce rôle");

    await(roleMember.removeRole(guildRole.id));
    
    try {
        await roleMember.send(`Désolé, jeune voyageur, mais tu t'es vu retirer le role : ${guildRole.name}`);
        message.channel.send(`<@${roleMember.id}> s'est vu retirer le role : ${guildRole.name}`);
    } catch (e) {
        message.channel.send(`<@${roleMember.id}> s'est vu retirer le role : ${guildRole.name}`);
        }
    }
}
module.exports = RemoveRoleCommand;