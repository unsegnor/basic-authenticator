const {asyncFind} = require('async-javascript')

module.exports = function({state, repo}){
    return Object.freeze({
        authenticate,
        register
    })

    async function authenticate({actor, login, password}){
        var users = getUsers()

        if(!users) {
            return await actor.notifyError({errorCode:'not-registered-user'})
        }

        var userWithLogin = await getUserWithLogin(login)

        if(!userWithLogin) {
            return await actor.notifyError({errorCode:'not-registered-user'})
        }

        var userPassword = await userWithLogin.get('password')
        if(userPassword !== password){
            return await actor.notifyError({errorCode:'incorrect-password'})
        }

        var userId = await userWithLogin.get('userId')
        return await actor.sendValue({value:userId})
    }

    async function register({actor, login, password, userId}){

        if(await existsUserWithLogin(login)){
            console.log('duplicated login',login)
            return await actor.notifyError({errorCode:'duplicated-login'})
        }

        var user = await repo.getNew()
        await user.set('userId', userId != undefined ? userId : login)
        await user.set('login', login)
        await user.set('password', password)
        await state.add('users', user)
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
        return await state.get('users')
    }
}
