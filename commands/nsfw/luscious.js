//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class LusciousCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'luscious',
      group: 'nsfw',
      memberName: 'luscious',
      description: 'displays a random picture from member.luscious.net'
    });
  }

  async run(message, args){
    //v!luscious

  //var query = '{picture{list(input :{page:30, search_string: "blue"}){info{total_pages},items{album{url,title}title,url_to_original,tags{slug}}}}}';
  
  var nudeURL = botconfig.luscious + "?operationName=null&query=%7Bpicture%7Blist(input%20%3A%7Bpage%3A30%2C%20search_string%3A%20%22" + args.toLowerCase() + "%22%7D)%7Binfo%7Btotal_pages%7D%2Citems%7Balbum%7Burl%2Ctitle%7Dtitle%2Curl_to_original%7D%7D%7D%7D&variables=null";
  var nudes = await (await fetch(nudeURL)).json();

  var pages = nudes.data.picture.list.info.total_pages;
  var randomPages = 1 + (Math.floor(Math.random() * pages - 1));

  nudeURL = botconfig.luscious + "?operationName=null&query=%7Bpicture%7Blist(input%20%3A%7Bpage%3A" + randomPages + "%2C%20search_string%3A%20%22" + args.toLowerCase() + "%22%7D)%7Binfo%7Btotal_pages%7D%2Citems%7Balbum%7Burl%2Ctitle%7Dtitle%2Curl_to_original%2Ctags%7Bslug%7D%7D%7D%7D%7D&variables=null";
  nudes = await (await fetch(nudeURL)).json();

  var imageID = nudes.data.picture.list.items.length;
  var randomImage = 1 + Math.floor(Math.random() * imageID - 1);  

  var image = nudes.data.picture.list.items[randomImage].url_to_original;
  var title = nudes.data.picture.list.items[randomImage].title;
  if(title == ''){
    title = 'No title';
  }

  var i = 0;
  var arrayOfTags;
  if(nudes.data.picture.list.items[randomImage].tags.length > 0){
    for (i = 1; i < 5; i++) {
      arrayOfTags += nudes.data.picture.list.items[randomImage].tags[i].slug + ', ';
    }
  }
  
  var nudePicture = new Discord.RichEmbed()
  .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
  .setColor("#2e7d32")
  .addField(`${title}`, `:fire: it's very hot :fire: \n tags : ${arrayOfTags}`)
  .setImage(image)
  .setFooter("Powered by members.luscious.net");
  message.channel.send(nudePicture);
  
  }
}
module.exports = LusciousCommand;
