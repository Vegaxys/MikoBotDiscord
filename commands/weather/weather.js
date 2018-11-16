//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
const querystring = require('querystring');
//**********************       class      ****************************
class WeatherCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'weather',
      group: 'weather',
      memberName: 'weather',
      description: 'display weather infos about a city at the current time'
    });
  }

  async run(message, args){
    //v!weather ville pays

    args = args.split(' ');
    var arg01 = args[0];
    args.splice(0, 1);
    var arg02 = args.join(" ");

    var ville = arg01;
    var pays = arg02;

    var query_params = {
        'q':`${ville},${pays}`, // le nom de la ville
        'units':'metric',
        'APPID':botconfig.weatherAPI,
        'lang':'fr'
        }
    // convert this obejc to query string
    let queryString = querystring.stringify(query_params);

    // construct the API Get request url
    let _url = `http://api.openweathermap.org/data/2.5/weather?${queryString}`;
    // make the request passing the url, and headers object which contains the API_KEY
    var meteo = await (await fetch(_url)).json();
    console.log(meteo);
    
    var temerature = meteo.main.temp;
    if(meteo.weather.length === 2){
        var mainWeather = meteo.weather[0].main;
        var mainWeatherDescription = meteo.weather[0].description;
        var subWeather = meteo.weather[1].main;
        var subWeatherDescription = meteo.weather[1].description;
    }else{
        var mainWeather = meteo.weather[0].main;
        var mainWeatherDescription = meteo.weather[0].description;
    }
    var pression = meteo.main.pressure;
    var humidity = meteo.main.humidity;

    var date = message.createdAt;

    var image = "http://openweathermap.org/img/w/" + meteo.weather[0].icon + ".png";
    var meteoEmbed = new Discord.RichEmbed()
        .setAuthor(`Miko | 巫女`, bot.user.avatarURL)
        .setTitle(`Météo actuelle à ${ville}`)
        .setThumbnail(image)
        .setColor("#2e7d32")
        .addField(`Date`, `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
        .addField(`Température`, `${temerature} °C`)
        .addField(`Humidité`, `${humidity} %`, true)
        .addField(`Pression`, `${pression} hPa`, true)
        .addField(`Temps`, `${mainWeatherDescription}`, true)
        .setFooter("Powered by OpenweathermapAPI");

    message.channel.send(meteoEmbed);
    }
    
    async loadWeather(){
        
    }
}
module.exports = WeatherCommand;