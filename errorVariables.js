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

module.exports = {
  noUserError,
  missingDataError,
  incorrectDataError,
  usernameExistsError,
  emailExistsError,
};
