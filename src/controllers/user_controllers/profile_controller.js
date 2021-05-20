import '../../models/subscription_plan_model';

// remember, req.user is from the middleware requireAuth()

// helper constants for getJoinedTimeAgo()...
const dayInMilliseconds = 1000 * 60 * 60 * 24;
const yearInMilliseconds = dayInMilliseconds * 365;

// helper function for getOverview()
// calculates what to display on the client's end regarding
// "joined X year(s) and Y day(s) ago"
// note that this calculation should happen on the server side
// and that the servers should keep a consistent time zone...
function getJoinedTimeAgo(createdAtString) {
  const currentDate = new Date();
  const createdAtDate = new Date(createdAtString);
  const difference = currentDate - createdAtDate;

  const yearDifference = Math.floor(difference / yearInMilliseconds);
  const yearRemainder = difference % yearInMilliseconds;
  const dayDifference = Math.floor(yearRemainder / dayInMilliseconds);

  if (yearDifference < 1 && dayDifference < 1) {
    return 'Joined less than a day ago';
  }

  let outputString = '';

  if (yearDifference > 0) {
    outputString = `Joined ${yearDifference} year${yearDifference > 1 ? 's' : ''} and`;
  } else {
    outputString = 'Joined';
  }

  return `${outputString} ${dayDifference} day${dayDifference > 1 ? 's' : ''} ago`;
}

// currently generic enough to be used for fetching other users'
// profile, but may eventually change
export const getOverview = (req, res, next) => {
  req.user.populate('subscription.plan').execPopulate()
  .then((result) => {
    const social = req.user.social;
    let totalLikeCount = 0;
    // `toJSON()` here is important... queried Mongoose documents by default returns
    // some additional key-value pairs not relevant for users
    Object.values(social.likeCounts.toJSON()).forEach((likeCount) => {
      totalLikeCount += likeCount;
    });
    res.send({
      username: req.user.auth.username,
      numFollowers: social.followers.length,
      numFollowing: social.following.length,
      numLikes: totalLikeCount,
      subscriptionName: req.user.subscription.plan.name,
      joinedTimeAgo: getJoinedTimeAgo(req.user.createdAt),
    });
  });
};



