const {asyncFind} = require('async-javascript')

module.exports = function({state, repo}){
    return Object.freeze({
        authenticate,
        register
    })

    async function authenticate({user, login, password}){
        var users = await state.get('users')

        if(!users) {
            return await user.notifyError({errorCode:'not-registered-user'})
        }

        var userWithLogin = await asyncFind(users, async function(user){
            var userLogin = await user.get('login')
            return (userLogin == login)
        })

        if(!userWithLogin) {
            return await user.notifyError({errorCode:'not-registered-user'})
        }

        var userPassword = await userWithLogin.get('password')
        if(userPassword !== password){
            return await user.notifyError({errorCode:'incorrect-password'})
        }

        var userId = await userWithLogin.get('userId')
        return await user.sendValue({value:userId})
    }

    async function register({login, password, userId}){
        var user = await repo.getNew()
        await user.set('userId', userId)
        await user.set('login', login)
        await user.set('password', password)
        await state.add('users', user)
    }
}