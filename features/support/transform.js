const {defineParameterType} = require('cucumber')

defineParameterType({
  regexp: /increment|decrement/,
  transformer: function (operationId) {
    switch (operationId) {
      case 'increment':
        return this.incrementBy
      case 'decrement':
        return this.decrementBy
      default:
        throw new Error(`Operation ${operationId} not supported`)
    }
  },
  name: 'operation'
})

defineParameterType({
  regexp: /Victor|Admin/,
  transformer: function (actorName) {
    switch (actorName) {
      case 'Victor':
        return this.actors.victor
      case 'Admin':
        return this.actors.admin
      default:
        throw new Error(`Actor ${actorName} does not exist`)
    }
  },
  name: 'actor'
})
