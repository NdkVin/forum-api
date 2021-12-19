/* istanbul ignore file */

// external agency
const { createContainer } = require('instances-container');
const { nanoid } = require('nanoid');
const joi = require('joi');
const bcrypt = require('bcrypt');
const pool = require('../database/postgres/pool');

// service
const UserRepositoryPostgres = require('../repository/UserRepositoryPostgres');
const JoiUsersValidator = require('../validator/JoiUsersValidator');
const BcryptPasswordHash = require('../security/BcryptPasswordHash');
// use case
const AddUserUseCase = require('../../Applications/use_case/AddUserUseCase');
const PasswordHash = require('../../Applications/security/PasswordHash');
const UsersValidator = require('../../Applications/validator/UsersValidator');
const UserRepository = require('../../Domains/users/UserRepository');
// container
const container = createContainer();

// register service and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: UsersValidator.name,
    Class: JoiUsersValidator,
    parameter: {
      dependencies: [
        {
          concrete: joi,
        },
      ],
    },
  },
]);

// register use case
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'usersValidator',
          internal: UsersValidator.name,
        },
      ],
    },
  },
]);

module.exports = container;
