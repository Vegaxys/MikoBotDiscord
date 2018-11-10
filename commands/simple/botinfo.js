//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class BotInfoCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'botinfo',
      group: 'simple',
      memberName: 'botinfo',
      description: 'displays infos about Miko'
    });
  }

  async run(message, args){
    //v!botinfo

    let botIcon = bot.user.displayAvatarURL;

    // a nice bot, commands :
    //
    // v!botinfo: displays bot infos.
    // v!serverinfo: displays server infos.
    //
    // v!8ball [question]: ask the princess something.
    // v!roll [min] [max]: displays a random number between min and max.
    //
    // v!addrole [@user] [Discord_role]: add a role to the user.
    // v!removerole [@user] [Discord_role]: remove a role to the user.
    //
    // v!report [@user] [reason]: report a user and send this in the waifu_chat.
    //
    // v!coins: displays the amount od coins of the user.
    // v!level: displays the level of the user.
    // v!Mlevel [@user]: displays the level of the @user(only for moderator).
    //
    // v!miaou: displays a random cat picture.
    // v!nya: displays a random cat picture.
    // v!waf: displays a random dog picture.
    // v!woof: displays a random dog picture with information.
    //
    // //************ONLY FOR MODERATOR************//
    //
    // v!ban [@user] [reason]: ban a user and send a report in the waifu_chat.
    // v!kick [@user] [reason]: kick a user and send a report in the waifu_chat.
    // v!tempmute [@user] [time]: mute @user for X seconds.
    // v!clear [length]: delete X messages.

    let botembed = new Discord.RichEmbed()
      .setDescription("Description de Miko, pretresse de la Commune Au Thé")
      .setColor("#6200EE")
      .setThumbnail(botIcon)
      .addField("Bot Name", bot.user.username + ", Aka la gardienne du Thé Vert")
      .addField("Created On", bot.user.createdAt);
   message.channel.send(botembed);
    }
}
module.exports = BotInfoCommand;