const noUserError = new Error();
noUserError.status = 404;
noUserError.msg = "No users found";

const missingDataError = new Error();
missingDataError.status = 400;
missingDataError.msg = "Missing Data";

const incorrectDataError = new Error();
incorrectDataError.status = 400;
incorrectDataError.msg = "Incorrect Data Type";

const usernameExistsError = new Error();
usernameExistsError.status = 400;
usernameExistsError.msg = "Username already exists";

const emailExistsError = new Error();
emailExistsError.status = 400;
emailExistsError.msg = "Email already exists";

const invalidPasswordError = new Error();
invalidPasswordError.status = 400;
invalidPasswordError.msg = "Invalid Password";

const noTopicsError = new Error();
noTopicsError.status = 404;
noTopicsError.msg = "No topics found";

const topicExistsError = new Error();
topicExistsError.status = 400;
topicExistsError.msg = 'Topic already exists'

const noPostsError = new Error();
noPostsError.status = 404;
noPostsError.msg = 'No posts found'

const noHabitError = new Error();
noHabitError.status = 404
noHabitError.msg = 'No habits found'

const habitExistsError = new Error();
habitExistsError.status = 400;
habitExistsError.msg = 'Habit already exists'

const inviteExistsError = new Error();
inviteExistsError.status = 400;
inviteExistsError.msg = 'Invite already sent'

const noInvitesError = new Error();
noInvitesError.status = 404;
noInvitesError.msg = 'No invites found'

const noResourcesError = new Error();
noResourcesError.status = 404;
noResourcesError.msg = 'Resource not found'

module.exports = {
  noUserError,
  missingDataError,
  incorrectDataError,
  usernameExistsError,
  emailExistsError,
  invalidPasswordError,
  noTopicsError,
  topicExistsError,
  noPostsError,
  noHabitError,
  habitExistsError,
  inviteExistsError,
  noInvitesError,
  noResourcesError
};
