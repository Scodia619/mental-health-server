const {
  selectAllUsers,
  selectUserByName,
  selectUsersByUsername,
  selectUsersByEmail,
  postUser,
  selectUserByUserAndPass,
  selectUsersByUsernameLogin,
  selectUserById,
} = require("../Repositories/userRepository");
const {
  noUserError,
  missingDataError,
  incorrectDataError,
  usernameExistsError,
  emailExistsError,
  invalidPasswordError,
} = require("../errorVariables");

const passwordHash = require("password-hash");

exports.getUsers = (req, res, next) => {
  selectAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
};

exports.getUsersByName = (req, res, next) => {
  const { letters } = req.params;
  selectUserByName(letters)
    .then((users) => {
      if (users.length === 0) {
        throw noUserError;
      }
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsersById = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(parseInt(id))) {
    throw incorrectDataError;
  }
  selectUserById(id)
    .then((users) => {
      if (!users) {
        throw noUserError;
      }
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.createUser = (req, res, next) => {
  const { username, first_name, last_name, email, phone, password } = req.body;

  if (!username || !first_name || !last_name || !email || !phone || !password) {
    throw missingDataError;
  }

  const hashedPassword = passwordHash.generate(password);

  if (
    !isNaN(parseInt(username)) ||
    !isNaN(parseInt(first_name)) ||
    !isNaN(parseInt(last_name)) ||
    !isNaN(parseInt(email))
  ) {
    throw incorrectDataError;
  }

  selectUsersByUsername(username)
    .then((users) => {
      if (users) {
        throw usernameExistsError;
      }
      return selectUsersByEmail(email);
    })
    .then((users) => {
      if (users) {
        throw emailExistsError;
      }
      const userData = {
        username,
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
      };
      return postUser(userData);
    })
    .then((users) => {
      res.status(201).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw missingDataError;
  }

  selectUsersByUsername(username)
    .then((users) => {
      if (!users) {
        throw noUserError;
      }

      if (!passwordHash.verify(password, users.password)) {
        throw invalidPasswordError;
      }
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};
