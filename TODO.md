# High Priority

* display the potential errors (on both client and server side)

* make a root page containing API instructions

* security in general:
  * password security: salt and hash and all that.
  * sensitive data security in storage: e.g. billing information
  * general data security: encrypt the transmissions...

* test the error communincation functionality

* think about if the implementation of the deleteMultiple type of functions is correct (okay to assume no failure, and optimize query thus?).

# Sanity Check

* Set up validation rules for the Mongoose documents (esp. in terms of length of input and size of scripts)
  * start with username and password length validation

# Consistency

# Definitions, Specifications, and Clarifications

* design subscription plans (beyond the "Free Plan" [subscription_plan_model.js](.\src\models\subscription_plan_model.js)
* specify order/position types and respective params
* specify notification preference types. [user_model.js](.\src\models\user_model.js)
* specify alert types. [user_model.js](.\src\models\user_model.js)
* specify storage format / path format for the scripts (or, its URL). [script_model.js](.\src\models\script_model.js)
* Specify input and output types for scripts (e.g. 'Boolean', 'Integer', 'Float', 'String'). Maybe a type for drop-down lists? [script_model.js](.\src\models\script_model.js)
* think about whether to disallow signing in from multiple sources at the same time (multiple tokens present with different `iat`...).
  * before any specific decision is made, the app assumes that each user account is only signed in at one source (all communications come from one source and does not need synchronization...)

# (Micro-)Optimizations

* when need to check multiple fields at once, do so, and return a response according to the field(s) matched (e.g. `AuthController.signIn()` checks for whether the provided email and username already exist, but had to do one query for each check in order to generate a different response based on the field matched)
* general scalability (do not fetch all 100 million posts at once if there are this many; currently all "fetch-all" queries actually does fetch *everything*)
  * allow adding and removing single items from a simple array (e.g., regarding watchlists - allow "adding/removing a single symbol" beyond just "set the entire watchlist")
* somehow make `create()` and the like return only the `_id` (the entire object is not necessary when I just want to proceed to save a list of references)

# Modularization

* make `router.js` more modularized (separate into multiple routers and call more `app.use()` in `server.js`...)

# Potential/Eventual Redundancies

# New Features for Users

## easy
* view subscription history
* allow getting others' user data. Should only be coded until social functionalities in general are to be coded. The respective routes should not be passed through the middleware `requireAuth`.

## moderate
* The ability to combine models, assign weights to each model, etc. If so, need to validate if the models can be combined. [strategy_model.js](.\src\models\strategy_model.js)

## hard
* somehow allows custom data (must design a way to store and interface with custom data)
* 2-factor authentication


# New Features for the Server (for the service itself, coding, developers...)

## easy
* Decide on a token expiration period and disallow signing-in with an old enough token (take advantage of the `iat` field of the token payload)
* finish the testing initialization for the database (maybe I should always initialize the database with some values, beyond the default data meaningful to real users...)

## moderate
* email address confirmation
* Store images like user profile pictures on server?

## hard

# Find out more about

