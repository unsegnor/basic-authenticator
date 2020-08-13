// features/support/steps.js
const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Given('the login {string} is not registered', function (login) {
});

Given('the login {string} is registered with the password {string} and the id {string}',
  async function (login, password, userId) {
    await this.authenticator.register({user: this.users.admin, login, password, userId})
});

When('{user} authenticates with login {string} and password {string}', async function (user, login, password) {
  await this.authenticator.authenticate({user, login, password})
});

Then('{user} must receive an error saying {string}', async function (user, expectedError) {
  expect(await user.receivedTheError(expectedError)).to.equal(true)
});

Then('{user} must receive the user id {string}', async function (user, userId) {
  expect(await user.receivedTheValue(userId)).to.equal(true)
});

Then('{user} must not receive any error', async function (user) {
  expect(await user.receivedErrors()).to.equal(false)
});