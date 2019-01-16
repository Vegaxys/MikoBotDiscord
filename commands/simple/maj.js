//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
//**********************       class      ****************************
function TransformString(value) {
  var srt = value.replace(/[\])}[{(]/g, ''); 
  return srt;
}
class MajCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'maj',
      group: 'simple',
      memberName: 'maj',
      description: 'put the bot up to date'
    });
  }

  async run(message, args){
    //v!maj
    if(message.member.id != bot.owners[0].id){
      return message.channel.send(`désolé, mais seul ${bot.owners[0].username} peut faire çela`);
    }
    message.channel.send("mise à jour lancé");
    //***********************************************************************
    //**********************       lolperso      ****************************
    //***********************************************************************
    var url_Champions = `http://ddragon.leagueoflegends.com/cdn/${configbot.ddragon}/data/en_US/champion.json`;
    var list_ChampionsURL = await (await fetch(url_Champions)).json();
    var list_Champions = [];
    var championsAmount = Object.keys(list_ChampionsURL.data);
    for(var i = 0; i < championsAmount.length; i++){
      list_Champions.push(list_ChampionsURL.data[championsAmount[i]].name);
    }
    fs.writeFile("./champions.json", JSON.stringify(list_ChampionsURL), (err) => {
      if(err){
        console.log(err);
      }
    });
    //***********************************************************************
    //**********************       lolskins      ****************************
    //***********************************************************************
      request('https://leagueoflegends.wikia.com/wiki/Module:SkinData/data', function(error, response, html){
      var $ = cheerio.load(html);
      if(error)
        console.log(error);
      if(response)
        console.log(response.statusCode);

      var data = new Array();
      var isInSubBrakets = false;
      var confirmSubBrakets = false;
      var row = 0;
      $('.st0, .sy0, .nu0, .kw4, .br0').each(function(i, elem) {
        var str = '';
        if($(this).hasClass('st0')){
          if(isInSubBrakets && confirmSubBrakets){
            data.push(`"${row}"`);
            data.push(':');
            row++;
          }
          str = TransformString($(this).text());
        }else if ($(this).hasClass('sy0')){
          str = $(this).text().replace(/=/gi, ':'); 
        }else if ($(this).hasClass('br0')){
          if($(this).text().includes('{') || $(this).text().includes('}')){
            if($(this).text() === '{' && isInSubBrakets == true){
              confirmSubBrakets = true;
            }
            if($(this).text() === '}' && isInSubBrakets == true){
              isInSubBrakets = false;
              confirmSubBrakets = false;
              row = 0;
            }
            str = $(this).text();
          }
        }else{
          str = $(this).text();
        }
        if($(this).text().includes('nil')){
          str = '"nil"';
        }
        if(str != ''){
          data.push(str);
        } 
        if($(this).text() === '"voiceactor"' || 
          $(this).text() === '"splashartist"' || 
          $(this).text() === '"forms"' || 
          $(this).text() === '"set"'){
            //si la classe d'apres a '{'
          if($(this).next().next().next().hasClass('br0')){
            isInSubBrakets = true;
          }else{
            isInSubBrakets = false;
          }
        }
      });
      var joinedData = data.join('');
      fs.writeFile("./skins.json", joinedData, (err) => {
        if(err){
          console.log(err);
        }
      });
    });

    //***********************************************************************
    //**********************         steam       ****************************
    //***********************************************************************

    var listURL = 'http://api.steampowered.com/ISteamApps/GetAppList/v2';

    gameList = await (await fetch(listURL)).json();
    fs.writeFile("../../gameList.json", JSON.stringify(gameList), (err) => {
      if(err){
        console.log(err);
      }
    });

    return message.channel.send("mise à jour réussi !");
  }
}
module.exports = MajCommand;
