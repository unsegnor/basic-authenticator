const {asyncFind} = require('async-javascript')

module.exports = function({repo, appId, adminLogin, adminPassword}){
    var adminId = 'adminId'

    return Object.freeze({
        authenticate,
        register
    })

    async function getState(){
        return await repo.getRoot(appId)
    }

    async function authenticate({actor}){
        var credentials = await actor.getCredentials()

        if(credentials.login == adminLogin && credentials.password == adminPassword) return adminId

        var users = getUsers()
        if(!users) {
            return await actor.notifyError({errorCode:'not-registered-user'})
        }

        var userWithLogin = await getUserWithLogin(credentials.login)

        if(!userWithLogin) {
            return await actor.notifyError({errorCode:'not-registered-user'})
        }

        var userPassword = await userWithLogin.get('password')
        if(userPassword !== credentials.password){
            return await actor.notifyError({errorCode:'incorrect-password'})
        }

        var userId = await userWithLogin.get('userId')
        return await actor.sendValue({value:userId})
    }

    async function register({actor, login, password, userId}){
        var actorId = await authenticate({actor})

        if(actorId != adminId){
            await actor.notifyError({errorCode: 'unauthorized'})
            return
        }

        if(userId == adminId){
            await actor.notifyError({errorCode: 'not-allowed-userId'})
            return
        }

        if(login == adminLogin){
            await actor.notifyError({errorCode: 'not-allowed-login'})
            return
        }

        if(await existsUserWithLogin(login)){
            return await actor.notifyError({errorCode:'duplicated-login'})
        }

        var user = await repo.getNew()
        await user.set('userId', userId != undefined ? userId : login)
        await user.set('login', login)
        await user.set('password', password)
        await (await getState()).add('users', user)
    }

    async function existsUserWithLogin(login){
        var user = await getUserWithLogin(login)
        return (user != undefined)
    }

    async function getUserWithLogin(login){
        var users = await getUsers()
        return await asyncFind(users, async function(user){
            var userLogin = await user.get('login')
            return (userLogin == login)
        })
    }

    async function getUsers(){
        return await (await getState()).get('users')
    }
}
