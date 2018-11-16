//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const querystring = require('querystring');
const DOG_API_URL   = "https://api.thedogapi.com/";
//**********************       class      ****************************
class WoofCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'woof',
      group: 'pictures',
      memberName: 'woof',
      description: 'display a random gog picture with infos'
    });
  }

  async run(message, args){
    //v!woof
    try{
      // Get JSON
      var headers = {'X-API-KEY': botconfig.dogAPI,}
      var query_params = {
        'has_breeds':true, // we only want images with at least one breed data object - name, temperament etc
        'mime_types':'jpg,png', // we only want static images as Discord doesn't like gifs
        'size':'small',   // get the small images as the size is prefect for Discord's 390x256 limit
        'sub_id': message.author.username, // pass the message senders username so you can see how many images each user has asked for in the stats
        'limit' : 1       // only need one
        }
      // convert this obejc to query string
      let queryString = querystring.stringify(query_params);
      let url = DOG_API_URL + `v1/images/search?${queryString}`;
      // make the request passing the url, and headers object which contains the API_KEY
      var images = await (await fetch(url, {headers})).json();

      // get the Image, and first Breed from the returned object.
      var image = images[0];
      var breed = image.breeds[0];
  
      console.log('message processed','showing',breed)
      // use the *** to make text bold, and * to make italic
      let woofEmbed = new Discord.RichEmbed()
        .setColor("#2e7d32")
        .setAuthor(breed.name)
        .addField("Poids", breed.weight.metric)
        .addField("Taille", breed.height.metric)
        .setImage(image.url)
        .setFooter("Powered by DogAPI");
      message.channel.send(woofEmbed);
      // if you didn't want to see the text, just send the file
  
    }catch(error)
    {
      console.log(error)
    }
  }
}
module.exports = WoofCommand;
