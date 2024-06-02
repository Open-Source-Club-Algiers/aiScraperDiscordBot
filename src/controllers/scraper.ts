require('dotenv').config();

import { JobListing } from '../interfaces/jobListing';
import { setSearch } from "../utils/headers";
import { formatString } from '../utils/functions';
const FETCH_API = process.env.FETCH_API;

const scrapeJob = async (jobTitle: string): Promise<JobListing[]> => {
  const jobListings: JobListing[] = [];

  // Utility function to convert strings to lowercase and replace spaces with hyphens

  try {
    const options = setSearch(jobTitle);
    console.log("options", options);
    var request = require('request');

    // Return a new promise
    return new Promise((resolve, reject) => {
      request(options, function (error: any, response: any) {
        if (error) {
          console.log("HEHEHE RERROR");
          return reject(error);
        }

        response = JSON.parse(response.body);
        const posts = response!.results;

        for (const post of posts) {
          const location = Array.isArray(post.criteria.location)
            ? post.criteria.location[0]?.label
            : post.criteria.location?.label;

          try {
            console.log(post.title);

            // Determine the correct link format
            const link = post.company.name===undefined
              ? `${FETCH_API}/offres-d-emploi/${formatString(post.company.name)}/${post.alias}`
              : `${FETCH_API}/entreprises/${formatString(post.company.alias).toLowerCase()}/offres-d-emploi/${formatString(post.company.sector.label).toLowerCase()}/${post.alias}`;

            jobListings.push({
              title: post.title,
              company: post.company.name,
              link: link,
              location: location
            });
            console.log(jobListings);
          } catch (err) {
            console.error("ERROR", post.criteria, err);
          }
        }

        // Resolve the promise with jobListings
        resolve(jobListings);
      });
    });

  } catch (err) {
    console.error("Error:", err);
    // Return an empty array in case of an error
    return [];
  }
};

export {
  scrapeJob
};