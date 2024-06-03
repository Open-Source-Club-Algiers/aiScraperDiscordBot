var request = require('request');
require('dotenv').config()
let options
const FETCH_API = process.env.FETCH_API!


const setSearch=(jobTitle:string)=>{

  function cleanJobTitle(jobTitle:string) {
  // Trim leading and trailing spaces
  jobTitle = jobTitle.trim();
  
  // Remove any leading 'e ' if present
  if (jobTitle.startsWith('e')) {
    jobTitle = jobTitle.slice(4);
  }
  
  return jobTitle;
}
     options ={
  'method': 'GET',
  'url': `${FETCH_API}/api/v4/jobs?filter=&q=${cleanJobTitle(encodeURIComponent(jobTitle))}&pagination\\[page\\]=1&pagination\\[pageSize\\]=20&sort\\[0\\]=publishedAt%3Adesc`,
  'headers': {
    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'Accept': 'application/json, text/plain, */*',
    'Referer': `${FETCH_API}/offres-d-emploi?search=${cleanJobTitle(encodeURIComponent(jobTitle))}`,
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'sec-ch-ua-platform': '"Windows"'
  }
};

return options
}
export {setSearch,}