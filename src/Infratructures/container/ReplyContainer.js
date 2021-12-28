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
const AddReplyUseCase = require('../../Applications/use_case/AddReplyUseCase');
const AddReplyValidator = require('../../Applications/validator/AddReplyValidator');
const JoiAddReplyValidator = require('../validator/JoiAddReplyValidator');

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
    key: AddReplyValidator.name,
    Class: JoiAddReplyValidator,
    parameter: {
      dependencies: [
        {
          concrete: Joi,
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
]);

// register use case
container.register([
  {
    key: AddReplyUseCase.name,
    Class: AddReplyUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: AddReplyValidator.name,
        },
        {
          name: 'replyRepository',
          internal: ReplyRepository.name,
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
