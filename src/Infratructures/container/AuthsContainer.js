/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Jwt = require('@hapi/jwt');
const pool = require('../database/postgres/pool');

// service
const UserRepository = require('../../Domains/users/UserRepository');
const AuthsRepository = require('../../Domains/auths/AuthsRepository');
const UserRepositoryPostgres = require('../repository/UserRepositoryPostgres');
const AuthsRepositoryPostgres = require('../repository/AuthsRepositoryPostgres');
const BcryptPasswordHash = require('../security/BcryptPasswordHash');
// use case
const LoginValidator = require('../../Applications/validator/LoginValidator');
const JoiLoginValidator = require('../validator/JoiLoginValidator');
const RefreshAccessTokenValidator = require('../../Applications/validator/RefreshAccessTokenValidator');
const JoiRefreshAccessTokenValidator = require('../validator/JoiRefreshAccessTokenValidator');
const PasswordHash = require('../../Applications/security/PasswordHash');
const TokenManager = require('../../Applications/security/TokenManager');
const JwtTokenManager = require('../security/JwtTokenManager');
const LoginUseCase = require('../../Applications/use_case/LoginUseCase');
const RefreshAccessTokenUseCase = require('../../Applications/use_case/RefreshAccessTokenUseCase');
const LogoutUseCase = require('../../Applications/use_case/LogoutUseCase');
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
    key: LoginValidator.name,
    Class: JoiLoginValidator,
    parameter: {
      dependencies: [
        {
          concrete: Joi,
        },
      ],
    },
  },
  {
    key: AuthsRepository.name,
    Class: AuthsRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt,
        },
      ],
    },
  },
  {
    key: RefreshAccessTokenValidator.name,
    Class: JoiRefreshAccessTokenValidator,
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
    key: LoginUseCase.name,
    Class: LoginUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: LoginValidator.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'authsRepository',
          internal: AuthsRepository.name,
        },
      ],
    },
  },
  //     validator,tokenManager,authsRepository,
  {
    key: RefreshAccessTokenUseCase.name,
    Class: RefreshAccessTokenUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: RefreshAccessTokenValidator.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'authsRepository',
          internal: AuthsRepository.name,
        },
      ],
    },
  },
  {
    key: LogoutUseCase.name,
    Class: LogoutUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validator',
          internal: RefreshAccessTokenValidator.name,
        },
        {
          name: 'authsRepository',
          internal: AuthsRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
