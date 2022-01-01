const LoginValidator = require('../../Applications/validator/LoginValidator');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JoiLoginValidator extends LoginValidator {
  constructor(joi) {
    super();
    this._joi = joi;
  }

  validate(payload) {
    const UsersSchema = this._joi.object({
      username: this._joi.string().max(50).required().messages({
        'string.base': 'username harus berupa string',
        'string.empty': 'username tidak boleh kosong',
        'string.max': 'username berisi maksimal 50 karakter',
        'any.required': 'username harus diisi',
      }),
      password: this._joi.string().required().messages({
        'string.base': 'password harus berupa string',
        'string.empty': 'password tidak boleh kosong',
        'any.required': 'password harus diisi',
      }),
    });
    const { username } = payload;
    if (username && typeof username === 'string' && !username.match(/^[\w]+$/)) {
      throw new InvariantError('tidak dapat melakukan login karena username mengandung karakter terlarang');
    }

    const validateResult = UsersSchema.validate(payload);

    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  }
}

module.exports = JoiLoginValidator;
