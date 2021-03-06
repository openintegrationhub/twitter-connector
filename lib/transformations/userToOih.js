/* eslint prefer-destructuring: "off" */

// This is an example for a built-in mapping provided by the connector developer
function userToOih(user) {
  const person = {
    meta: {
      recordUid: user.id_str,
    },
    data: {
      contactData: [
        {
          type: 'twitter',
          value: user.screen_name,
        },
      ],
    },
  };

  // Add photo if a custom profile image is used
  if (!user.default_profile_image) {
    person.data.photo = user.profile_image_url_https;
  }

  // Attempt to split display name of twitter user into firstName and lastName
  // If unsuccessful, entire name will be pasted into lastName
  const names = user.name.split(' ');
  if (names.length > 1) {
    person.data.firstName = names[0];
    names.shift();
    person.data.lastName = names.join(' ');
  } else {
    person.data.lastName = user.name;
  }

  return person;
}

module.exports = {
  userToOih,
};
