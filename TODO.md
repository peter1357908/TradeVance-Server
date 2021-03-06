# High Priority

* get rid of the node warnings

* display the potential errors (on both client and server side)

* make sure that restarting server = with a clean/empty database (every time I test, I throw away the database and automatically populate the data base for "integration testing"... of course, I should not do that for the deployed version)

* make a root page containing API instructions

* security in general:
  * password security: salt and hash and all that.
  * sensitive data security in storage: e.g. billing information
  * general data security: encrypt the transmissions...

# Sanity Check

* Set up validation rules for the Mongoose documents (esp. in terms of length of input and size of scripts)


# Definitions, Specifications, and Clarifications

* design subscription plans (add models into database manually? [subscription_plan_model.js](.\src\models\subscription_plan_model.js)
* specify order/position types and respective params
* specify notification preference types. [user_model.js](.\src\models\user_model.js)
* specify alert types. [user_model.js](.\src\models\user_model.js)
* specify storage format / path format for the scripts (or, its URL). [script_model.js](.\src\models\script_model.js)
* Specify input and output types for scripts (e.g. 'Boolean', 'Integer', 'Float', 'String'). Maybe a type for drop-down lists? [script_model.js](.\src\models\script_model.js)


# New Features for Users

## easy
* view subscription history

## moderate
* The ability to combine models, assign weights to each model, etc. If so, need to validate if the models can be combined. [strategy_model.js](.\src\models\strategy_model.js)

## hard
* somehow allows custom data (must design a way to store and interface with custom data)
* 2-factor authentication


# New Features for the Server

## easy
* Store images like user profile pictures on server?

## moderate
* email address confirmation

## hard


# Find out more about

* in [user_controller.js](.\src\controllers\user_controller.js): `dotenv.config({ silent: true });`
