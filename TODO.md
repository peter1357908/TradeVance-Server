# High Priority

* security in general:
  * password security: salt and hash and all that.
  * sensitive data security: e.g. billing information
  * general data security: necessary?

* Not-yet-coded Documents:
  * User.starredStrategies, User.starredModels, User.starredScripts
  * User.ownStrategies, User.ownModels, User.ownScripts


# Sanity Check

* Set up validation rules for the Mongoose documents (esp. in terms of length of input and size of scripts)


# Definitions, Specifications, and Clarifications

* design subscription plans (add models into database manually? [subscription_plan_model.js](.\src\models\subscription_plan_model.js))
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





