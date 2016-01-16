/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'lZ6cUuAwQUiwsptuJHciccCtT',
      consumerSecret: 'UPKnxO9BTKIID7hY71udQuNuxmQLnT6uWk8dEW0PddFIoI7XmR'
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '810798472308335',
      clientSecret: '9cabc86857bcf04f6e0b6aff1d9918ff',
      scope: ['email'] /* email is necessary for login behavior */
    }
  }
};
