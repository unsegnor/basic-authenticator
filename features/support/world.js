// features/support/world.js
const { setWorldConstructor, After, Before } = require('cucumber')
const Authenticator = require('../../domain/Authenticator')
const FakeActor = require('../../adapters/FakeActor')
const ObjectRepository = require('persistent-programming/adapters/InMemoryObjectRepository')

class CustomWorld {
  constructor () {
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
    admin: FakeActor(),
    victor: FakeActor()
  }

  this.repo = ObjectRepository()
  this.state = await this.repo.getNew()
  this.authenticator = Authenticator({
    repo: this.repo,
    state: this.state})
})

setWorldConstructor(CustomWorld)
