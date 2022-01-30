// features/support/world.js
const { setWorldConstructor, After, Before } = require('cucumber')
const Authenticator = require('../../domain/Authenticator')
const FakeActor = require('../../adapters/FakeActor')
const ObjectRepository = require('persistent-programming/adapters/InMemoryObjectRepository')

class CustomWorld {
  constructor () {
    this.adminLogin = "adminLogin"
    this.adminPassword = "adminPassword"
  }

  setTo (number) {
    this.variable = number
  }

  incrementBy (number) {
    this.variable += number
  }

  decrementBy (number) {
    this.variable -= number
  }
}

Before(async function(){
  this.actors = {
    admin: FakeActor({login: this.adminLogin, password: this.adminPassword}),
    victor: FakeActor({login: 'victor', password: 'victorPassword'})
  }

  this.repo = ObjectRepository()
  this.authenticator = Authenticator({
    appId: 'test-application-id',
    repo: this.repo,
    adminLogin: this.adminLogin,
    adminPassword: this.adminPassword
  })
})

setWorldConstructor(CustomWorld)
