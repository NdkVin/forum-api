/* istanbul ignore file */
const { createContainer } = require('instances-container');

// eksternal agency
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

// use case
const UserRepository = require('../Domains/users/UserRepository');
const PasswordHash = require('../Applications/security/PasswordHash');
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');

// creating container
const container = createContainer();

// egistering service and repository
container.register([
  {
    key: UserRepository.name,
    class: UserRepositoryPostgres,
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
    key: PasswordHash,
    class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

// registering use case
container.register([
  {
    key: AddUserUseCase.name,
    class: AddUserUseCase,
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
