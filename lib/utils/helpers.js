const request = require('request-promise').defaults({ simple: false, resolveWithFullResponse: true });
const uuid = require('uuid');

/**
 * This method fetches friends of a given account from Twitter
 *
 * @param username - The twitter screen name of the account whose friends and followers should be fetched
 * @param token - The twitter developer auth bearer token
 * @return {Array} - Array of user objects containing data and meta
 */
async function getFriends(username, token) {
  try {
    const cursor = -1;
    let results = [];

    while (cursor !== 0) {
      const requestOptions = {
        uri: 'https://api.twitter.com/1.1/friends/list.json?',
        json: true,
        qs: {
          cursor,
          screen_name: username,
          skip_status: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await request(requestOptions);

      if (response.statusCode === 200) {
        cursor = response.body.next_cursor_str;
        results = results.concat(response.body.users);
      } else {
        cursor = 0;
      }
    }

    return results;
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * This method fetches followers of a given account from Twitter
 *
 * @param username - The twitter screen name of the account whose friends and followers should be fetched
 * @param token - The twitter developer auth bearer token
 * @return {Array} - Array of user objects containing data and meta
 */
async function getFollowers(username, token) {
  try {
    const cursor = -1;
    let results = [];

    while (cursor !== 0) {
      const requestOptions = {
        uri: 'https://api.twitter.com/1.1/followers/list.json?',
        json: true,
        qs: {
          cursor,
          screen_name: username,
          skip_status: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await request(requestOptions);

      if (response.statusCode === 200) {
        cursor = response.body.next_cursor_str;
        results = results.concat(response.body.users);
      } else {
        cursor = 0;
      }
    }

    return results;
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


module.exports = {
  getFriends, getFollowers, newMessage,
};
