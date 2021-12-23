const AddThreadValidator = require('../../Applications/validator/AddThreadValidator');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JoiAddThreadValidator extends AddThreadValidator {
  constructor(joi) {
    super();
    this._joi = joi;
  }

  validate(payload) {
    const validateAddTreadSchema = this._joi.object({
      title: this._joi.string().max(50).required().messages({
        'string.base': 'title harus berupa string',
        'string.empty': 'title tidak boleh kosong',
        'string.max': 'title berisi maksimal 50 karakter',
        'any.required': 'title harus diisi',
      }),
      body: this._joi.string().required().messages({
        'string.base': 'body harus berupa string',
        'string.empty': 'body tidak boleh kosong',
        'any.required': 'body harus diisi',
      }),
    });

    const result = validateAddTreadSchema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  }
}

module.exports = JoiAddThreadValidator;
