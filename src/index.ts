const http = require('http');
require ('dotenv').config();

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
  console.log(' ✅ Server is listening on port 3000');

  // Function to ping the server
  const pingServer = () => {
    const options = {
      hostname: process.env.HOST,
      port: 3000,
      path: '/',
      method: 'GET'
    };

    const req = http.request(options, (res:any) => {
      let data = '';

      // A chunk of data has been received.
      res.on('data', (chunk:any) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on('end', () => {
        console.log('Response received at', new Date().toLocaleTimeString());
      });
    });

    req.on('error', (error:any) => {
      console.error('Error:', error);
    });

    req.end();
  };

  // Ping the server every 2 minutes (120,000 milliseconds)
  setInterval(pingServer, 120000);

  // Initial ping to start the process immediately
  pingServer();
});

import  { Client, } from  "discord.js";
import  {messageCreate } from  './controllers/message';
import OpenAI from "openai";

import {client,genAI}from'./config'
import {  splitMessage } from "./utils/functions";
import { scrapeJob } from "./controllers/scraper";



const DISCORD_TOKEN : string = process.env.DISCORD_TOKEN! 
const JOB_SCRAPING_CHANNEL_ID : string = process.env.JOB_SCRAPING_CHANNEL_ID!
const AI_CHANENEL_ID : string = process.env.AI_CHANENEL_ID!





client.on('ready',async (c) => {
    console.log(`${c.user.username} is ready`)
  
  
  
    
})


const CHANNELS=[JOB_SCRAPING_CHANNEL_ID,AI_CHANENEL_ID];



client.on('messageCreate', async(message) => {
    if(message.author.bot){ return}
    if(!CHANNELS.includes(message.channelId) ){return}
    await message.channel.sendTyping();
    if(message.channelId===JOB_SCRAPING_CHANNEL_ID) {
         const args = message.content.trim();
        const jobTitle = args

        if (jobTitle) {
            const response = await scrapeJob(jobTitle);
        for(const job of response){
             const responseString = JSON.stringify(job, null, 2); 
             if(responseString.length>=2000){
             const parts =  splitMessage(responseString,1999)
               message.reply(`${responseString}`)
             message.reply(parts[0])
         

              for (let i = 1; i < parts.length; i++) {
               if(i!==parts.length) message.reply(`${parts[i]}...`); 
                if(i===parts.length) message.reply(parts[i]); 
                  }

             }else{
                                     message.reply(`**Title**: ${job.title}\n**Company**:${job.company} \n**location **:${job.location}\n **For more information, visit the link **:${job.link} `); 
               }
}
            
          

        }else{
    message.reply("Please ensure the correct syntax for scraping is used:\n!scrape <jobTitle> , <wilayaNumber>\n Ex: !scrape Receptioniste , 16");

        }

      }else{
          const  response=  await  messageCreate(message)
  
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
    message.reply("**Done**✅ ");




   

  
});







client.login(DISCORD_TOKEN)




