//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class BanCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'ban',
      group: 'moderation',
      memberName: 'ban',
      description: 'ban a user from this server and send a report'
    });
  }

  async run(message, args){
    //v!ban @user reason

    var argsArray = args.split(' ');
    argsArray.splice(0, 1);
    var arg1 = argsArray.join();

    //Attraper la personne a ban
    let banUser = message.guild.member(message.mentions.users.first());
    if(!banUser)
      return message.channel.send("Désolé, mais cette personne n'existe pas");

    //regarder les 22 prochains mots
    let reason = arg1;

    if(!message.member.hasPermission("MANAGE_MEMBERS")){
      return message.channel.send("t'a pas les droits");
    }
    if(banUser.hasPermission("MANAGE_MEMBERS")){
      return message.channel.send("cette personne ne peut pas etre ban");
    }
    
    //Créer le billet de ban
    let banEmbed = new Discord.RichEmbed()
      .setDescription("Kick")
      .setColor("#2e7d32")
      .addField("Banned User :", `${banUser}with ID : ${banUser.id}`)
      .addField("Banned by :", `<@${message.author.id}>with ID : ${message.author.id}`)
      .addField("Banned in Channel :", message.channel)
      .addField("Time :", message.createdAt)
      .addField("Reason :", reason)
      ;
      //Chercher le channel 'incident' et tester s'il existe
      let banChannel = message.guild.channels.find(`name`, "waifu_chat");
      if(!banChannel)
        return message.channel.send("Couldn't find waifu_chat channel");
      //supprimer le message qui vien d'etre mis
      message.delete().catch(O_o=>{});

      message.guild.member(banUser).ban(reason);
      banChannel.send(banEmbed);
  }
}
module.exports = BanCommand;