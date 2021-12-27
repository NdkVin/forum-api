/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const Joi = require('joi');
const pool = require('../database/postgres/pool');

// service
const CommentRepository = require('../../Domains/comments/CommentRepository');
const CommentRepositoryPostgres = require('../repository/CommentRepositoryPostgres');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const ThreadRepositoryPostgres = require('../repository/ThreadRepositoryPostgres');

// use case
const AddCommentValidator = require('../../Applications/validator/AddCommentValidator');
const JoiAddCommentValidator = require('../validator/JoiAddCommentValidator');
const AddCommentUseCase = require('../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../Applications/use_case/DeleteCommentUseCase');

// container
const container = createContainer();

// register service and repository

container.register([
  {
    key: CommentRepository.name,
    Class: CommentRepositoryPostgres,
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
    key: AddCommentValidator.name,
    Class: JoiAddCommentValidator,
    parameter: {
      dependencies: [
        {
          concrete: Joi,
        },
      ],
    },
  },
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
]);

// register use case
container.register([
  {
    key: AddCommentUseCase.name,
    Class: AddCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: AddCommentValidator.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteCommentUseCase.name,
    Class: DeleteCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
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
