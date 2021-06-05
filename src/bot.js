require('dotenv').config();

const { Client, VoiceStateManager } = require('discord.js')
const client = new Client();
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on('voiceStateUpdate',async (oldState, newState) => {
    oldState.guild.channels.cache.forEach(channel => {
        if(channel.name === "bot") botchannel=channel.id;
        console.log(channel);
    });
    if(!oldState.serverDeaf && newState.serverDeaf){
        channel = client.channels.cache.get(botchannel);
        await oldState.guild.fetchAuditLogs()
        .then((audit) => {
            const res = audit.entries.first();
            executor = client.users.cache.get(res.executor.id) 
            target = client.users.cache.get(res.target.id);
            channel.send(`${executor} server deafened ${target}`);
            vsm = oldState.guild.voiceStates.cache;
            vsm.forEach(state => {
                if(state.id === res.executor.id){
                    state.kick();
                }
            });
        })
        .catch(console.error);
    } else if(!oldState.serverMute && newState.serverMute){
        channel = client.channels.cache.get(botchannel);
        await oldState.guild.fetchAuditLogs()
        .then((audit) => {
            const res = audit.entries.first();
            executor = client.users.cache.get(res.executor.id) 
            target = client.users.cache.get(res.target.id);
            channel.send(`${executor} server muted ${target}`)
            vsm = oldState.guild.voiceStates.cache;
            vsm.forEach(state => {
                if(state.id === res.executor.id){
                    state.kick();
                }
            });
        })
        .catch(console.error);
    }
});


client.login(process.env.BOT_TOKEN);