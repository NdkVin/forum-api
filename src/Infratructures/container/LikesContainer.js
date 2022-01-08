/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const pool = require('../database/postgres/pool');

// service
const CommentRepository = require('../../Domains/comments/CommentRepository');
const CommentRepositoryPostgres = require('../repository/CommentRepositoryPostgres');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const ThreadRepositoryPostgres = require('../repository/ThreadRepositoryPostgres');
const LikeRepository = require('../../Domains/likes/LikeRepository');
const LikeRepositoryPostgres = require('../repository/LikeRepositoryPostgres');
// use case
const LikeCommentUseCase = require('../../Applications/use_case/LikeCommentUseCase');

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
    key: LikeRepository.name,
    Class: LikeRepositoryPostgres,
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
    key: LikeCommentUseCase.name,
    Class: LikeCommentUseCase,
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
          name: 'likeRepository',
          internal: LikeRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
