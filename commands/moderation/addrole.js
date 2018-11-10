//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
//**********************       class      ****************************
class AddRoleCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'addrole',
      group: 'moderation',
      memberName: 'addrole',
      description: 'add a role to a user'
    });
  }

  async run(message, args){
    //vega!addrole @user role

    var argsArray = args.split(' ');
    argsArray.splice(0, 1);
    var arg1 = argsArray.join();

    if(!message.member.hasPermission("MANAGE_ROLES"))
        return message.reply("Désolé voyageur, mais tu n'a pas le droit de faire ça");
    let roleMember = message.guild.member(message.mentions.users.first());
    if(!roleMember)
        return message.channel.send("Désolé, mais ce voyageur n'existe pas");
    let role = arg1;
    if(!role)
        return message.channel.send("Quel rôle dois-je ajouter ??");
    let guildRole = message.guild.roles.find(`name`, role);
    if(!guildRole)
        return message.channel.send("Désolé, mais ce rôle n'existe pas");

    //Si il a deja le role
    if(roleMember.roles.has(guildRole.id))
        return message.channel.send("Désolé, mais ce voyageur a deja ce rôle");
    await(roleMember.addRole(guildRole.id));

    try {
        await roleMember.send(`Félicitation, jeune voyageur ! Tu as obtenu le role : ${guildRole.name}`)
        } catch (e) {
        message.channel.send(`Félicitation à <@${roleMember.id}>! il a obtenu le role : ${guildRole.name}`);
        }
    }
}
module.exports = AddRoleCommand;