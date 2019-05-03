//0.01 
const Discord = require("discord.js");
var auth = require('./auth.json');
const bot = new Discord.Client();

var tcpp = require('tcp-ping');

bot.login(auth.token);
 
bot.on("ready", () => {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function () {
    console.log("Interval ping test");
    tcpp.probe('167.99.147.33', 28960, function (err, available) {
        console.log(available);
        if (available == false) {
            bot.users.get("105477361838866432").send("The server is **Offline**");
        }
    });
}, the_interval);

bot.on("message", (message) => {
	var args;
	var cmd;
	if (message.content.indexOf('!') === 0)
	{
		args = message.content.slice(1).trim().split(/ +/g);
		cmd = args.shift();
	}
	
	switch(cmd) 
	{
        case 'status':
            {
                console.log("command ping test");
                message.channel.send("Pinging the server @ 167.99.147.33 ...");
                tcpp.probe('167.99.147.33', 28960, function (err, available) {
                    console.log(available);
                    if (available == true) {
                        console.log("The server is Online");
                        message.channel.send("The server is **Online**");
                    }
                    else {
                        console.log("The server is Offline");
                        message.channel.send("The server is **Offline**");
                    }
                });
            }
		break;
	}

});