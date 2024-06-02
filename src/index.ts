const http = require('http');

const server = http.createServer((req:any, res:any) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html>
      <head>
        <title>Your Web View</title>
      </head>
      <body style="margin: 0; padding: 0;">
        <iframe width="100%" height="100%" src="https://axocoder.vercel.app/" frameborder="0" allowfullscreen></iframe>
      </body>
    </html>`);
});

server.listen(3000, () => {
  console.log('Server Online because of Axo Coder ✅!!');
});

import  { Client, } from  "discord.js";
import  {messageCreate } from  './controllers/message';
import OpenAI from "openai";
require ('dotenv').config();

import {client,genAI}from'./config'
import { getWilayaName, splitMessage } from "./utils/functions";
import { scrapeJob } from "./controllers/scraper";



const DISCORD_TOKEN : string = process.env.DISCORD_TOKEN! 
const JOB_SCRAPING_CHANNEL_ID : string = process.env.JOB_SCRAPING_CHANNEL_ID!
const AI_CHANENEL_ID : string = process.env.AI_CHANENEL_ID!





client.on('ready',async (c) => {
    console.log(`${c.user.username} is ready`)
  
  
  
    
})


const IGNOR_PREFIX = "!";
const CHANNELS=[JOB_SCRAPING_CHANNEL_ID,AI_CHANENEL_ID];



client.on('messageCreate', async(message) => {
    if(message.author.bot){console.log("author is a bot"); return}
    if(!message.content.startsWith(IGNOR_PREFIX)) {console.log("IGNOR_PREFIX") ;return}
    if(!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user!.id)){console.log("channelId") ;return}
    await message.channel.sendTyping();
    if(message.content.startsWith('!scrape')&& message.channelId===JOB_SCRAPING_CHANNEL_ID) {
         const args = message.content.slice('scrape'.length).trim();
        const [jobTitle, location] = args.split(',').map(arg => arg.trim());

        if (jobTitle) {
          console.log("srf")
            const response = await scrapeJob(jobTitle);
              console.log(response)
for(const job of response){
             const responseString = JSON.stringify(job, null, 2); 
             if(responseString.length>=2000){
              console.log("Enteredf",responseString)
             const parts =  splitMessage(responseString,1999)
               message.reply(`${responseString}`)
             message.reply(parts[0])
         

              for (let i = 1; i < parts.length; i++) {
               if(i!==parts.length) message.reply(`${parts[i]}...`); 
                if(i===parts.length) message.reply(parts[i]); 
                  }

             }else{
                                     message.reply(`**Title**: ${job.title}\n\n**Company**:${job.company} **location **:${job.location}\n **For more information, visit the link **:${job.link} `); 
               }
}
            
          

        }else{
    message.reply("Please ensure the correct syntax for scraping is used:\n!scrape <jobTitle> , <wilayaNumber>\n Ex: !scrape Receptioniste , 16");

        }
    message.reply("**Done**✅ ");

      }else{
          const  response=  await  messageCreate(message)
  
console.log(response.text.length,response.text)
  if(response.text().length>=2000){
   const parts =  splitMessage(response.text(),1999)
         message.reply(parts[0])
         

    for (let i = 1; i < parts.length; i++) {
            message.reply(parts[i]); // Send the remaining parts as separate messages in the channel
        }

  }else{
const text = response.text();
  message.reply(text)
  }
        
      }



   

  
});







client.login(DISCORD_TOKEN)




