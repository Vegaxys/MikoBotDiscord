//**********************    Constantes    ****************************
const commando = require("discord.js-commando");
const Discord = require('discord.js');
//**********************       class      ****************************
class KissCommand extends commando.Command{
  constructor(client){
    super(client,{
      name: 'kiss',
      group: 'pictures',
      memberName: 'kiss',
      description: 'gives a kiss to a user'
    });
  }

  async run(message, args){
    //v!nekogirl  [sentence]
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Désolé voyageur, mais tu doit attendre 5 secondes pour redonner un câlin.");
    } else {
        var body = await (await fetch(`https://nekos.life/api/kiss`)).json();
        var randomSentances = [
          "Des bisous un jour, des bisous toujours.",
          "J'ai toujours préféré les bisous aux bijoux, les petits plaisirs simples de la vie au faste et au luxe.",
          `Il y a une façon d'embrasser qui veut dire "je t'aime" et une façon d'embrasser qui veut dire "aime-moi".`,
          "Ce qui ne peut être évité, il faut l'embrasser.",
          "Je n’étais pas en train d’embrasser votre fille, monsieur, je lui chuchotais seulement dans la bouche.",
          "Il est doux de chanter, mais soyez-en certain : Les lèvres chantent seulement quand elles ne peuvent embrasser.",
          "Un bon cœur est assez grand pour embrasser plusieurs affections.",
          "Les tendres embrassements sont l'aliment de ma flamme.",
          "On peut s'embrasser sans s'aimer : les soldats se battent bien sans se haïr.",
          "Ce temps embrasse tous les temps, qu'on le partage en jours, en heures, en moments.",
          "Quand on effleure l'extase à côté d'une femme, il est presque contre nature de ne pas l'embrasser.",
          "Comment aimer ce qu'on ne peut embrasser ni du regard ni de la pensée ?",
          "Je suis devant toi pour te donner toutes les étoiles du ciel en un baiser sur les yeux.",
          "Au premier baiser un univers nouveau s'ouvrira devant toi et la vie, de ses mille rayons, pénétrera ton coeur extasié",
          "Qui aime s'oublie lui-même pour se perdre dans la douceur du baiser.",
          "Des baisers hardis portent le feu dans les veines.",
          "La peau de l'être humain a besoin d'un grand nombre de baisers par jour.",
          "Les baisers se donnent comme la main.",
          "Solliciter le baiser, c'est lui ôter toute sa valeur. La branche n'appelle pas l'oiseau.",
          "Dans un baiser on peut voler une âme.",
          "Douce tentation de tes lèvres si roses, baisers mouillés j'y dépose.",
          "Un Dieu créa dans nos misères les baisers des enfants pour les larmes des mères.",
          "En amour rien ne sèche plus vite une larme qu'un baiser."
        ];
        var result = Math.floor(Math.random() * randomSentances.length);
        var sentence = "";
        if(args === ""){
          sentence = randomSentances[result];
        }else{
          sentence = args;
        }

        let hugEmbed = new Discord.RichEmbed()
            .setColor("#2e7d32")
            .addField(":kiss:  A kiss for you :kiss: ", sentence)
            .setImage(body.url)
            .setFooter('Powered by nekos.life');
        message.channel.send(hugEmbed);
    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 5000);
}
  }
}
module.exports = KissCommand;