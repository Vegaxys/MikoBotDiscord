//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class KickCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'kick',
      group: 'moderation',
      memberName: 'kick',
      description: 'kick a user from this server and send a report'
    });
  }

  async run(message, args){
    //Attraper la personne a kick
    //v!kick @user reason
    let kickedUser = message.guild.member(message.mentions.users.first() ||
        message.guild.members.get(args[0]));
    if(!kickedUser)
        return message.channel.send("Désolé, mais cette personne n'existe pas");
    
    //regarder les 22 prochains mots
    let reason = args.join(" ").slice(22);

    if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("t'a pas les droits");
    if(kickedUser.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("cette personne ne peut pas etre kick");

    //Créer le billet de kick
    let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#2e7d32")
        .addField("Kicked User :", `${kickedUser}with ID : ${kickedUser.id}`)
        .addField("Kicked by :", `<@${message.author.id}>with ID : ${message.author.id}`)
        .addField("Kicked in Channel :", message.channel)
        .addField("Time :", message.createdAt)
        .addField("Reason :", reason);
    //Chercher le channel 'incident' et tester s'il existe
    let kickChannel = message.guild.channels.find(`name`, "waifu_chat");
    if(!kickChannel)
        return message.channel.send("Couldn't find waifu_chat channel");
    //supprimer le message qui vien d'etre mis
    message.delete().catch(O_o=>{});

    message.guild.member(kickedUser).kick(reason);
    kickChannel.send(kickEmbed);
    }
}
module.exports = KickCommand;