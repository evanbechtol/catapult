/*
 This file is meant to make API calls to the server for setup of tests.
 By extracting this logic out of our tests, we reduce coupling and increase cohesion of test cases.
 */
const { baseURL, authKey } = require( "../config" );
const request = require( "request-promise" );
const options = {
  headers: {
    "Accept": "application/json",
    "Authorization": authKey
  }
};

/**
 * @description Utility to create a dictionary
 * @param endpoint {string} API Endpoint to use
 * @returns {string} Returns the ID as a string
 */
async function createDictionary ( endpoint ) {
  options.url = `${baseURL}/${endpoint}`;
  options.method = "POST";

  try {
    const results = await request( options );
    return JSON.parse( results ).id;
  } catch ( err ) {
    throw err;
  }
}

/**
 * @description Utility to create a dictionary
 * @param endpoint {string} API Endpoint to use
 * @param id {string} ID of dictionary to retrieve keys for
 * @param key {string} Key to retrieve value for
 * @returns Returns the value for the provided key, or null if not found
 */
async function getValueForKey ( endpoint, id, key ) {
  if ( !id ) {
    throw "Valid Id is required";
  }

  options.url = `${baseURL}${endpoint}/${id}/keys/${key}`;
  options.method = "GET";

  try {
    const results = await request( options );
    return JSON.parse( results );
  } catch ( err ) {
    throw err;
  }
}

/**
 * @description Utility to remove a created dictionary once testing is complete
 * @param endpoint {string} API Endpoint to use
 * @param id {string} ID for dictionary to delete
 */
async function removeDictionary ( endpoint, id ) {
  if ( !id ) {
    throw "Valid Id is required";
  }

  options.url = `${baseURL}${endpoint}/${id}?id=${id}`;
  options.method = "DELETE";

  try {
    return await request( options );
  } catch ( err ) {
    throw err;
  }
}

/**
 * @description Generate a random number between max, and min
 * @param max {int} Integer to represent maximum value generated number can
 *   have
 * @param min {int} Integer to represent minimum value generated number can
 *   have
 * @returns {number} Returns a randomly generated number between the max and
 *   min provided
 */
function randomNumber ( max = 100, min = 0 ) {
  return Math.floor( ( Math.random() * max ) + min );
}

module.exports = { createDictionary, getValueForKey, randomNumber, removeDictionary };
