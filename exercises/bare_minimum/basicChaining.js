/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
const { getGitHubProfileAsync } = require('./promisification');
const { pluckFirstLineFromFileAsync } = require('./promiseConstructor');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  const writeFile = Promise.promisify(fs.writeFile);

  return pluckFirstLineFromFileAsync(readFilePath)
    .then(username => getGitHubProfileAsync(username))
    .then(response => JSON.stringify(response))
    .then(userData => writeFile(writeFilePath, userData));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
