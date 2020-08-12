module.exports = function(){
    let receivedError = ''
    let receivedSomeError = false
    let receivedValue = ''

    return Object.freeze({
        notifyError,
        sendValue,
        receivedTheError,
        receivedTheValue,
        receivedErrors
    })

    async function notifyError({errorCode}){
        receivedError = errorCode
        receivedSomeError = true
    }

    async function sendValue({value}){
        receivedValue = value
    }

    async function receivedTheError(errorCode){
        return new Promise(function(resolve){ resolve(receivedError == errorCode)})
    }

    async function receivedTheValue(expectedValue){
        return new Promise(function(resolve){ resolve(receivedValue == expectedValue)})
    }

    async function receivedErrors(){
        return receivedSomeError
    }
}