const AddThreadValidator = require('../../validator/AddThreadValidator');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
  it('should orchesting the add user action correctly', async () => {
    const addThreadPayload = {
      title: 'andika',
      body: 'andika',
    };
    const owner = 'andika';

    const addThread = new AddThread(addThreadPayload);

    const expectedReturn = new AddedThread({
      id: 'thread-123',
      title: 'andika',
      owner: 'andika',
    });
    const mockThreadValidator = new AddThreadValidator();
    const mockThreadRepository = new ThreadRepository();

    mockThreadValidator.validate = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedReturn));

    const addThreadUseCase = new AddThreadUseCase({
      validator: mockThreadValidator,
      threadRepository: mockThreadRepository,
    });

    const result = await addThreadUseCase.execute(addThreadPayload, owner);

    expect(result).toStrictEqual(expectedReturn);
    expect(mockThreadValidator.validate).toBeCalledWith(addThreadPayload);
    expect(mockThreadRepository.addThread).toBeCalledWith(addThread, owner);
  });
});
