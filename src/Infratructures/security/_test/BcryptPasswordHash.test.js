const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');

describe('BcryptPasswordHash', () => {
  it('should return hased password correctly', async () => {
    const spyHash = jest.spyOn(bcrypt, 'hash');

    const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

    const hasedPassword = await bcryptPasswordHash.hash('plain_password');

    expect(typeof hasedPassword).toEqual('string');
    expect(hasedPassword).not.toEqual('plain_password');
    expect(spyHash).toBeCalledWith('plain_password', 10);
  });
});
