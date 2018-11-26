//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
//**********************       class      ****************************
class TodayCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'today',
      group: 'simple',
      memberName: 'today',
      description: 'displays info about today'
    });
  }

  async run(message, args){
    //v!today
    var todayJSON = {
      "date": "today",
      "fete": "",
      "citation": ""
    }
    request('https://operabaroque.fr/fete-jour.htm', function(error, response, html){
      var $ = cheerio.load(html);
      if(error)
        console.log(error);
      if(response){
        console.log(response.statusCode);
      }

      var longstring = $('h2').next().text();
      //***************************************** Date */
      var longDate  = longstring.slice(15);
      var date = longDate.split(' ').filter( word => word.length > 0);
      longDate = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

      //***************************************** Saints */
      var maxWord = longDate.length;
      var debutSaint = date.indexOf('saint(s)') + 2;
      var finSaint = date.indexOf('.\nVous');
      var saints = "";
      for (let i = debutSaint; i < finSaint; i++) {
        saints += date[i] + ", ";
        
      }
      
      todayJSON.date = longDate;
      todayJSON.fete = saints;

      let levelEmbed = new Discord.RichEmbed()
      .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
      .setTitle(":date: Fête du jour :date: ")
      .setColor("#2e7d32")
      .addField(`${todayJSON.date}`, `Bonjour à tous et à toutes, aujourd'hui nous célébrons les ${todayJSON.fete}. 
      Vous pouvez donc leurs souhaiter une bonne fête et une bonne journée !`)
    message.channel.send(levelEmbed);
    });
  }
}
module.exports = TodayCommand;
