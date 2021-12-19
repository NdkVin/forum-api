/* istanbul ignore file */

// external agency
const { createContainer } = require('instances-container');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('../database/postgres/pool');

// service
const UserRepository = require('../../Domains/users/UserRepository');
const UserRepositoryPostgres = require('../repository/UserRepositoryPostgres');
const BcryptPasswordHash = require('../security/BcryptPasswordHash');
const PasswordHash = require('../../Applications/security/PasswordHash');
// use case
const AddUserUseCase = require('../../Applications/use_case/AddUserUseCase');

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
      ],
    },
  },
]);

module.exports = container;
