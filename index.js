const express = require("express");
const app = express();
const Discord = require("discord.js");
const keepAlive = require('./server.js');
const { averageAeesCalc, averageEesCalc } = require('./eescalc.js');


// app.listen(3000, () => {
//   console.log("App is running");
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

keepAlive();
client.login(process.env['token'])

client.on('ready', () => {
  console.log('I am ready!');
});


client.on("messageCreate", message => {
  if (message.content === "ping") {
    message.channel.send("pong");
    //message.timeo
  }
  const toLoop = message.content.split(" ")
  if (toLoop[0] === 'eescalc') {
    const defaultsfp = [0, 5, 10]

    var start = parseFloat(toLoop[1])
    if (start < 0) start = 0
    var end = parseFloat(toLoop[2])
    if (end > 15) end = 15
    var simulations = parseFloat(toLoop[3])
    if (simulations > 999) simulations = 999

    var sfp = toLoop[4]
    if (sfp === undefined) sfp = defaultsfp
    else sfp = toLoop[4] + defaultsfp

    console.log(start, end, simulations, sfp)
    var msg = averageEesCalc(start, end, simulations, sfp)
    message.channel.send(msg.toString())
  }
  if (toLoop[0] === 'aeescalc') {
    var start = parseFloat(toLoop[1])
    var end = parseFloat(toLoop[2])
    var simulations = parseFloat(toLoop[3])
    var sfp = toLoop[4]
    if (sfp === undefined) sfp = [0, 5, 10]

    console.log(start, end, simulations, sfp)
    var msg = averageAeesCalc(start, end, simulations, sfp)
    message.channel.send(msg.toString())
  }
})










