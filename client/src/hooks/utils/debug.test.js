const debug = require("./debug")
// @ponicode
describe("debug.default", () => {
    test("0", () => {
        let callFunction = () => {
            debug.default(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            debug.default(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            debug.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
