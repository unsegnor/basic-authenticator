// features/support/steps.js
const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Given('the login {string} is not registered', function (login) {
});

Given('the login {string} is registered with the password {string} and the id {string}',
  async function (login, password, userId) {
    await this.authenticator.register({login, password, userId})
});

When('I authenticate the user {string} with the password {string}', async function (login, password) {
  await this.authenticator.authenticate({login, password})
});

Then('the system must respond with an error saying {string}', async function (expectedError) {
  expect(await this.user.receivedTheError(expectedError)).to.equal(true)
});

Then('the system must respond with the user id {string}', async function (userId) {
  expect(await this.user.receivedTheValue(userId)).to.equal(true)
});

Then('the user must no receive any error', async function () {
  expect(await this.user.receivedErrors()).to.equal(false)
});