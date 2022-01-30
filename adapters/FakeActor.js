module.exports = function({login, password}){
    let receivedError = ''
    let receivedSomeError = false
    let receivedValue = ''

    if(!login) throw new Error('Missing login')
    if(!password) throw new Error('Missing password')

    return Object.freeze({
        notifyError,
        sendValue,
        receivedTheError,
        receivedTheValue,
        receivedErrors,
        getCredentials,
        setLogin,
        setPassword
    })

    async function setLogin(newLogin){
        login = newLogin
    }

    async function setPassword(newPassword){
        password = newPassword
    }

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

    async function getCredentials(){
        return {login, password}
    }
}