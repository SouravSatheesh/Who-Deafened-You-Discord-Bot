require('dotenv').config();

const { Client } = require('discord.js')
const client = new Client();
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        console.log(args[0]);

        if(CMD_NAME === 'kick'){
            if(args.length === 0) return message.reply('Please proveide an id');
            const member = message.guild.members.cache.get(args[0]);
            if(member) {
                member.kick()
                    .then((member) => message.channel.send(`${member} has been kicked`))
                    .catch((err) =>  message.channel.send(`${member} has been kicked`));
            } else {
                message.channel.send('That member was not found');
            }
        }
    }
});