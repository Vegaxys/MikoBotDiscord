//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
//**********************       class      ****************************
class JoinChannelCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'join',
      group: 'music',
      memberName: 'join',
      description: 'join the vocal channel'
    });
  }

  async run(message, args){
    //v!join
    if(message.member.voiceChannel){
      if(!message.guild.voiceConnection){
        message.member.voiceChannel.join().then(connection =>{
          message.reply("Connexion au chat vocal réussie !");
        });
      }
    }else{
      message.channel.send(`Désolé ${message.author.username}, mais je ne sais pas où tu te trouve`)
    }
  }
}
module.exports = JoinChannelCommand;
