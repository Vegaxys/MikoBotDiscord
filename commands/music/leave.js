const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  if(message.guild.voiceConnection){
    message.guild.voiceConnection.disconnect();
    message.reply("Déconnexion au chat vocal réussi !");
  }else{
    return message.channel.send(`Désolé ${message.author.username}, mais je dois être sur un chat vocal pour être déconnecté`);
  }
}

module.exports.help = {
  name : "leave"
}
