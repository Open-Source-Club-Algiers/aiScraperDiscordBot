import  { GoogleGenerativeAI } from"@google/generative-ai";
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import  { Client, } from  "discord.js";
require ('dotenv').config();


// Midelware

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "MessageContent"
    ]

})




// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
export {
    client,
    genAI,
    
}