# TradeVance-Server

The server side implementation of TradeVance

# Testing Instruction

Simply `yarn install` and `yarn dev`, after which the server should be running on `localhost:9090` (specified in [server.js](./src/server.js))

# Production Notes

Do not forget to define your own of the following environment variables (else the testing, visible variables will be used):
* `PORT`
* `MONGODB_URI`
* `AUTH_SECRET`
* `FREE_PLAN_ID`
