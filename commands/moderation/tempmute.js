//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const ms = require("ms");
//**********************       class      ****************************
class TempMuteCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'tempmute',
      group: 'moderation',
      memberName: 'tempmute',
      description: 'mute a user for a moment'
    });
  }

  async run(message, args){
    //v!tempmute @user [time]
    var argsArray = args.split(' ');
    argsArray.splice(0, 1);
    var arg1 = argsArray.join(" ");

    let muteUser = message.guild.member(message.mentions.users.first());

    if(!message.member.hasPermission("MUTE_MEMBERS"))
      return message.reply("Désolé voyageur, mais tu n'a pas le droit de faire ça");
    if(!muteUser)
      return message.reply("Désolé, mais cette personne n'existe pas");
    if(muteUser.hasPermission("MANAGE_MESSAGES"))
      return message.reply("cette personne ne peut pas etre mute");
    //Tester si le tag "puni" existe
    let muteRole = message.guild.roles.find(`name`, "Puni");

    if(!muteRole){
      message.guild.createRole({name: 'Puni',color : '#b71c1c'})
      .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
      .catch(console.error)
    }
    let mutetime = arg1;

    if(!mutetime)
      return message.reply("Missing : time in min");

    await(muteUser.addRole(muteRole.id));
    message.reply(`<@${muteUser.id}> has been muted for${ms(mutetime)}`);

    message.delete().catch(O_o=>{});

    setTimeout(function(){
      muteUser.removeRole(muteRole.id);
      message.channel.send(`<@${muteUser.id}> has been unmuted !`)
    }, ms(mutetime));
  }
}
module.exports = TempMuteCommand;