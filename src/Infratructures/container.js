/* istanbul ignore file */

const { createContainer } = require('instances-container');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const PasswordHash = require('../Applications/security/PasswordHash');
const UserRepository = require('../Domains/users/UserRepository');
const pool = require('./database/postgres/pool');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');

// external agency

// service (repository, helper, manager, etc)

// use case

// create container
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
