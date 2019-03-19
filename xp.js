const Discord = require("discord.js");


module.exports.run = async (bot, message, args, sql) => {

  let target = message.author;

  let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${target.id}'`).get()

    if(!rows) return message.reply("**:x: | حاول مرة أخرى**").then(msg => {msg.delete(5000)});
  

  let curxp = rows.xp;
  let curlvl = rows.lvl;
  let nxtLvlXp = curlvl * 1000;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField("- LEVEL :", curlvl, true)
  .addField("- XP :", curxp, true)
  .setFooter(`${difference} XP til level up.`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "xp"
}
