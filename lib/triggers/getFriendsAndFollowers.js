/* eslint no-param-reassign: "off" */

/**
 * Copyright 2019 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const { getUsers, newMessage } = require('./../utils/helpers');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param msg - incoming message object that contains ``body`` with payload
 * @param cfg - configuration that is account information and configuration field values
 * @param snapshot - saves the current state of integration step for the future reference
 */
async function processTrigger(msg, cfg, snapshot = {}) {
  try {
    const { username, token } = cfg;
    const self = this;

    // Set the snapshot if it is not provided
    snapshot.lastUpdated = snapshot.lastUpdated || (new Date(0)).getTime();

    /** Create an OIH meta object which is required
    * to make the Hub and Spoke architecture work properly
    */
    const oihMeta = {
      applicationUid: (applicationUid !== undefined && applicationUid !== null) ? applicationUid : undefined,
      schema: (schema !== undefined && schema !== null) ? schema : undefined,
      domainId: (domainId !== undefined && domainId !== null) ? domainId : undefined,
    };

    const people = getUsers(username, token);

    for (let i = 0; i > people.length; i += 1) {
      const person = transformUserToOih(people[i], oihMeta);

      const newElement = { person };

      // Emit the object with meta and data properties
      self.emit('data', newMessage(newElement));
    }


    self.emit('snapshot', snapshot);

    self.emit('end');
  } catch (e) {
    console.log(`ERROR: ${e}`);
    self.emit('error', e);
  }
}

module.exports = {
  process: processTrigger,
};
