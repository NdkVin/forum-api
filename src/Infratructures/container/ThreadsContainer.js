/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const Joi = require('joi');
const pool = require('../database/postgres/pool');

// service
const ReplyRepository = require('../../Domains/replies/ReplyRepository');
const ReplyRepositoryPostgres = require('../repository/ReplyRepositoryPostgres');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const CommentRepositoryPostgres = require('../repository/CommentRepositoryPostgres');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const ThreadRepositoryPostgres = require('../repository/ThreadRepositoryPostgres');
// use case
const AddThreadValidator = require('../../Applications/validator/AddThreadValidator');
const JoiAddThreadValidator = require('../validator/JoiAddThreadValidator');
const AddThreadUseCase = require('../../Applications/use_case/AddThreadUseCase');
const GetThreadUseCase = require('../../Applications/use_case/GetThreadUseCase');

// container
const container = createContainer();

// register service and repository

container.register([
  {
    key: ReplyRepository.name,
    Class: ReplyRepositoryPostgres,
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
  {
    key: GetThreadUseCase.name,
    Class: GetThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'replyRepository',
          internal: ReplyRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
