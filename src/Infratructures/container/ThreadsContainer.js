/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const Joi = require('joi');
const pool = require('../database/postgres/pool');

// service
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const ThreadRepositoryPostgres = require('../repository/ThreadRepositoryPostgres');
// use case
const AddThreadValidator = require('../../Applications/validator/AddThreadValidator');
const JoiAddThreadValidator = require('../validator/JoiAddThreadValidator');
const AddThreadUseCase = require('../../Applications/use_case/AddThreadUseCase');

// container
const container = createContainer();

// register service and repository

container.register([
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
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
    key: AddThreadValidator.name,
    Class: JoiAddThreadValidator,
    parameter: {
      dependencies: [
        {
          concrete: Joi,
        },
      ],
    },
  },
]);

// register use case
container.register([
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: AddThreadValidator.name,
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
