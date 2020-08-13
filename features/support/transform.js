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
  transformer: function (userName) {
    switch (userName) {
      case 'Victor':
        return this.users.victor
      case 'Admin':
        return this.users.admin
      default:
        throw new Error(`User ${userName} not supported`)
    }
  },
  name: 'user'
})
