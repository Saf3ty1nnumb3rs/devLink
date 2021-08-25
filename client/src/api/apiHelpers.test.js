const apiHelpers = require("./apiHelpers")
// @ponicode
describe("apiHelpers.configureHttpHeaders", () => {
    test("0", () => {
        let callFunction = () => {
            apiHelpers.configureHttpHeaders({ defaults: { headers: { common: { Content-Type: "html", Accept: "application/json", x-auth-token: "__future__" } } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            apiHelpers.configureHttpHeaders({ defaults: { headers: { common: { Content-Type: "Hello, world!", Accept: "application/json, text/json", x-auth-token: "array-original-" } } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            apiHelpers.configureHttpHeaders({ defaults: { headers: { common: { Content-Type: "audio", Accept: "application/json, text/json", x-auth-token: "attributes" } } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            apiHelpers.configureHttpHeaders({ defaults: { headers: { common: { Content-Type: "movies", Accept: "application/json, text/json", x-auth-token: "string" } } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            apiHelpers.configureHttpHeaders({ defaults: { headers: { common: { Content-Type: "sets", Accept: "application/json, text/json", x-auth-token: "for" } } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            apiHelpers.configureHttpHeaders(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
