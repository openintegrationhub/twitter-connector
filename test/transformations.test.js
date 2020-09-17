/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { transform } = require('@openintegrationhub/ferryman');
const { userToOih } = require('../lib/transformations/userToOih.js');

describe('Transformations', () => {
  it('should transform a user to a person', async () => {
    const user = {
      id_str: '12345',
      screen_name: 'jdoe',
      name: 'John Doe',
      default_profile_image: false,
      profile_image_url_https: 'https://domain.com/image.jpg',
    };

    const person = transform(user, {}, userToOih);

    expect(person.data.firstName).to.equal('John');
    expect(person.data.lastName).to.equal('Doe');
    expect(person.data.photo).to.equal('https://domain.com/image.jpg');
    expect(person.meta.recordUid).to.equal('12345');
    expect(person.data.contactData).to.have.lengthOf(1);
    expect(person.data.contactData[0].type).to.equal('twitter');
    expect(person.data.contactData[0].value).to.equal('jdoe');
  });
});
