/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const nock = require('nock');
const { getFriends, getFollowers } = require('../lib/utils/helpers');

describe('Triggers', () => {
  it('should get a list of friends, automatically paginating them', async () => {
    nock('https://api.twitter.com/1.1/friends/list.json')
      .get('')
      .query({
        screen_name: 'TestUser',
        cursor: -1,
        skip_status: true,
      })
      .reply(200, {
        users: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ],
        next_cursor: 4,
      });

    nock('https://api.twitter.com/1.1/friends/list.json')
      .get('')
      .query({
        screen_name: 'TestUser',
        cursor: 4,
        skip_status: true,
      })
      .reply(200, {
        users: [
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
        next_cursor: 0,
      });

    const response = await getFriends('TestUser', 'TestToken');

    expect(response.length).to.equal(6);
    expect(response[0].id).to.equal(1);
    expect(response[5].id).to.equal(6);
  });

  it('should get a list of followers, automatically paginating them', async () => {
    nock('https://api.twitter.com/1.1/followers/list.json')
      .get('')
      .query({
        screen_name: 'TestUser',
        cursor: -1,
        skip_status: true,
      })
      .reply(200, {
        users: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ],
        next_cursor: 4,
      });

    nock('https://api.twitter.com/1.1/followers/list.json')
      .get('')
      .query({
        screen_name: 'TestUser',
        cursor: 4,
        skip_status: true,
      })
      .reply(200, {
        users: [
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
        next_cursor: 0,
      });

    const response = await getFollowers('TestUser', 'TestToken');

    expect(response.length).to.equal(6);
    expect(response[0].id).to.equal(1);
    expect(response[5].id).to.equal(6);
  });
});
