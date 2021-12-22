const RefreshAccessTokenValidator = require('../../Applications/validator/RefreshAccessTokenValidator');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JoiRefreshAccessTokenValidator extends RefreshAccessTokenValidator {
  constructor(joi) {
    super();
    this._joi = joi;
  }

  validate(payload) {
    const RefreshTokenSchema = this._joi.object({
      refreshToken: this._joi.string().required().messages({
        'string.base': 'refresh token harus berupa string',
        'string.empty': 'refresh token tidak boleh kosong',
        'any.required': 'refresh token harus diisi',
      }),
    });

    const validateResult = RefreshTokenSchema.validate(payload);

    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  }
}

module.exports = JoiRefreshAccessTokenValidator;
