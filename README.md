# TradeVance-Server
The server side implementation of TradeVance

# Testing Instruction

If running locally, do not forget to have your own `.env` file that specifies the AUTH_SECRET (example: `AUTH_SECRET = "some secret"`).

Simply `yarn install` and `yarn dev`, after which the server should be running on `localhost:9090` (specified in [server.js](./src/server.js))