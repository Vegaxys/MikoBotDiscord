//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class ReportCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'report',
      group: 'moderation',
      memberName: 'report',
      description: 'report a user and send it'
    });
  }

  async run(message, args){
    //v!report @user [reason]
    var argsArray = args.split(' ');
    argsArray.splice(0, 1);
    var arg1 = argsArray.join(" ");

    let reportedUser = message.guild.member(message.mentions.users.first());

    if(!reportedUser)
        return message.channel.send("Désolé, mais cette personne n'existe pas");

    //regarder les 22 prochains mots
    let reason = arg1;
    var date = message.createdAt;

    //Créer le billet de report
    let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#2e7d32")
        .addField("Reported User :", `${reportedUser}with ID : ${reportedUser.id}`)
        .addField("Reported by :", `${message.author}with ID : ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time :", `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
        .addField("Reason :", reason);

    //Chercher le channel 'report' et tester s'il existe
    let reportChannel = message.guild.channels.find(`name`, "waifu_chat");
    if(!reportChannel)
        return message.channel.send("Couldn't find report channel");

    //supprimer le message qui vien d'etre mis
    message.delete().catch(O_o=>{});
    reportChannel.send(reportEmbed);
    }
}
module.exports = ReportCommand;
