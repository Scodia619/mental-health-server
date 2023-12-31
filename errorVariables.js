const noUserError = new Error()
noUserError.status = 404;
noUserError.msg = 'No users found'

module.exports = {noUserError}