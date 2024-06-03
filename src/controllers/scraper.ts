require('dotenv').config();

import { JobListing } from '../interfaces/jobListing';
import { setSearch } from "../utils/headers";
import { formatString } from '../utils/functions';
const FETCH_API = process.env.FETCH_API;

const scrapeJob = async (jobTitle: string): Promise<JobListing[]> => {
  const jobListings: JobListing[] = [];

  try {
    const options = setSearch(jobTitle);
    var request = require('request');

    return new Promise((resolve, reject) => {
      request(options, function (error: any, response: any) {
        if (error) {
          console.log("Request Error", error);
          return reject(error);
        }

        response = JSON.parse(response.body);
        const posts = response!.results;

        for (const post of posts) {
          const location = Array.isArray(post.criteria.location)
            ? post.criteria.location[0]?.label
            : post.criteria.location?.label;

          try {
            const companyName = post.company?.name;
            const companyAlias = post.company?.alias;
            const sectorLabel = post.company?.sector?.label;

            if (!companyName || !companyAlias || !sectorLabel) {
              console.error("Missing company details", post.company);
              continue;  // Skip this post if any required field is missing
            }

            const link = companyName === undefined
              ? `${FETCH_API}/offres-d-emploi/${formatString(companyName)}/${post.alias}`
              : `${FETCH_API}/entreprises/${formatString(companyAlias)}/offres-d-emploi/${formatString(sectorLabel)}/${post.alias}`;

            jobListings.push({
              title: post.title,
              company: companyName,
              link: link,
              location: location
            });
          } catch (err) {
            console.error("Post Processing Error", post.criteria, err);
          }
        }

        resolve(jobListings);
      });
    });

  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

export { scrapeJob };