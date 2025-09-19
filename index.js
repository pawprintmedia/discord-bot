import 'dotenv/config';
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, Events } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// simple /ping command
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!')
].map(c => c.toJSON());

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );
  console.log('slash commands registered');
}

client.once(Events.ClientReady, (c) => console.log(`logged in as ${c.user.tag}`));
client.on(Events.InteractionCreate, async (i) => {
  if (!i.isChatInputCommand()) return;
  if (i.commandName === 'ping') await i.reply('pong!');
});

await registerCommands();
client.login(process.env.DISCORD_TOKEN);
