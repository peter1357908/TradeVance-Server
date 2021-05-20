# Notable Design Decisions / Coding Guidelines

* if a document model would contain an array of objects, make sure to make a separate model for that object, so the parent document model has an array of references to those object documents... abstractions!

* use Mongoose abstractions whenever possible
  * `create()` over `save()` when creating new documents
  * `save()` over `update()` always, until when we need to micro-optimize (relevant reading [here](https://stackoverflow.com/a/34068658)).

* "don't `catch` an error unless you plan to *handle* it. Logging is *not* handling." If logging is the only thing to be done inside a `catch`, then it's called "swallowing the error", and should only be done when the error is expected and non-fatal.
  * with that said, any *unexpected* database errors should indeed crash the app. No need to send anything to the frontend - it is meaningless to the users anyway; the app should crashed with the said log.

* once some functionality is considered complete and deployed, the related database should no longer be reset. From that point on, only addition or modification may be performed, but removing and re-adding a document should not be done (because the references by document id would be messed up).
  * that being said, a micro-optimization already in place is how a new user document has the free subscription plan's documentID hard-coded. It should not change once it's there.

* all actions involving getting/setting the logged-in user's data are named by the action itself; actions involving getting other users' data will be preceded by `other-` or `Other`.

# Alternative Designs to explore


