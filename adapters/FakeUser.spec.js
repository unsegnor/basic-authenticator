const {expect} = require('chai')
const Adapter = require('./FakeUser')
const Port = require('../domain/Thing.port')

describe('FakeUser', function(){
    beforeEach(function(){
        this.adapter = Adapter()
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
})