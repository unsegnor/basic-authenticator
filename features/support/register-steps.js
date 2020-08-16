// features/support/steps.js
const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const {asyncFind} = require('async-javascript')

Given('the login {string} is not registered', function (login) {
});

Given('the login {string} is registered with the password {string} and the id {string}',
  async function (login, password, userId) {
    await this.authenticator.register({user: this.actors.admin, login, password, userId})
});

When('{actor} authenticates with login {string} and password {string}', async function (actor, login, password) {
  await this.authenticator.authenticate({actor, login, password})
});

When('{actor} registers a new user with login {string} and the password {string}', async function (actor, login, password) {
  await this.authenticator.register({actor, login, password})
});

Then('{actor} must receive an error saying {string}', async function (actor, expectedError) {
  expect(await actor.receivedTheError(expectedError)).to.equal(true)
});

Then('{actor} must receive the user id {string}', async function (actor, userId) {
  expect(await actor.receivedTheValue(userId)).to.equal(true)
});

Then('{actor} must not receive any error', async function (actor) {
  expect(await actor.receivedErrors()).to.equal(false)
});

Then('the system must register a user with login {string}, password {string} and id {string}', async function (login, password, userId) {
  var users = await this.state.get('users')
  var registeredUser = await asyncFind(users, async function(user){
    return await user.get('login') == login
      && await user.get('password') == password
      && await user.get('userId') == userId
  })

  expect(registeredUser).to.not.be.undefined
});

Then('the system must not register a user with login {string}, password {string} and id {string}', async function (login, password, userId) {
  var users = await this.state.get('users')
  var registeredUser = await asyncFind(users, async function(user){
    return await user.get('login') == login
      && await user.get('password') == password
      && await user.get('userId') == userId
  })

  expect(registeredUser).to.be.undefined
});