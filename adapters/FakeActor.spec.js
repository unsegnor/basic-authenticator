const {expect} = require('chai')
const Adapter = require('./FakeActor')
const Port = require('../domain/Thing.port')
const expectToThrow = require('expect-to-throw')

describe('FakeActor', function(){
    beforeEach(function(){
        this.adapter = Adapter({
            login: 'fakeLogin',
            password: 'fakePassword'
        })
    })

    Port()

    describe('receivedTheError', function(){
        it('must return true when the error has been received', async function(){
            var errorCode = 'errorCode'
            await this.adapter.notifyError({errorCode})
            expect(await this.adapter.receivedTheError(errorCode)).to.equal(true)
        })

        it('must return false when the error has not been received', async function(){
            var errorCode = 'errorCode'
            expect(await this.adapter.receivedTheError(errorCode)).to.equal(false)
        })

        it('must return false when a different error has been received', async function(){
            var errorCode = 'errorCode'
            await this.adapter.notifyError({errorCode:'anotherErrorCode'})
            expect(await this.adapter.receivedTheError(errorCode)).to.equal(false)
        })
    })

    describe('receivedTheValue', function(){
        it('must return true when the received value is the expected one', async function(){
            var value = 'value'
            await this.adapter.sendValue({value})
            expect(await this.adapter.receivedTheValue(value)).to.equal(true)
        })

        it('must return false when the received value is not the expected one', async function(){
            var value = 'value'
            await this.adapter.sendValue({value: 'anotherValue'})
            expect(await this.adapter.receivedTheValue(value)).to.equal(false)
        })
    })

    describe('receivedErrors', function(){
        it('must return true when an error was received', async function(){
            await this.adapter.notifyError({errorCode: 'errorCode'})
            expect(await this.adapter.receivedErrors()).to.equal(true)
        })

        it('must return false when no error was received', async function(){
            expect(await this.adapter.receivedErrors()).to.equal(false)
        })
    })

    describe('getCredentials', function(){
        it('must return the credentials', async function(){
            var credentials = await this.adapter.getCredentials()
            expect(credentials.login).to.equal('fakeLogin')
            expect(credentials.password).to.equal('fakePassword')
        })
    })

    describe('setLogin', function(){
        it('must set the login', async function(){
            await this.adapter.setLogin('newLogin')
            var credentials = await this.adapter.getCredentials()
            expect(credentials.login).to.equal('newLogin')
            expect(credentials.password).to.equal('fakePassword')
        })
    })

    describe('setPassword', function(){
        it('must set the password', async function(){
            await this.adapter.setPassword('newPassword')
            var credentials = await this.adapter.getCredentials()
            expect(credentials.login).to.equal('fakeLogin')
            expect(credentials.password).to.equal('newPassword')
        })
    })

    it('must throw when created without login', async function(){
        await expectToThrow('missing login',async function(){
            Adapter({password: 'fakePassword'})
        })
    })

    it('must throw when created without password', async function(){
        await expectToThrow('missing password',async function(){
            Adapter({login: 'fakeLogin'})
        })
    })
})