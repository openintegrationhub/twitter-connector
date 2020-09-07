const request = require('request-promise').defaults({ simple: false, resolveWithFullResponse: true });

/**
 * This method fetches friends and followers of a given account from Twitter
 *
 * @param username - The twitter screen name of the account whose friends and followers should be fetched
 * @param token - The twitter developer auth bearer token
 * @return {Array} - Array of user objects containing data and meta
 */
async function getUsers(username, token) {
  try {
    const requestOptions = {
      uri: `https://api.twitter.com/labs/2/users/by/username/${username}`,
      json: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const entries = await fetchAll(requestOptions, snapshot);

    if (!entries.result || !Array.isArray(entries.result)) {
      return 'Expected records array.';
    }
    return entries;
  } catch (e) {
    throw new Error(e);
  }
}


function newMessage(body) {
  const msg = {
    id: uuid.v4(),
    attachments: {},
    body,
    headers: {},
    metadata: {},
  };

  return msg;
}


module.exports = { getUsers, newMessage };
