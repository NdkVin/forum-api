const AddReplyValidator = require('../../Applications/validator/AddReplyValidator');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JoiAddReplyValidator extends AddReplyValidator {
  constructor(joi) {
    super();
    this._joi = joi;
  }

  validate(payload) {
    const validateAddReplySchema = this._joi.object({
      content: this._joi.string().required().messages({
        'string.base': 'content harus berupa string',
        'string.empty': 'content tidak boleh kosong',
        'any.required': 'content harus diisi',
      }),
    });

    const result = validateAddReplySchema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  }
}

module.exports = JoiAddReplyValidator;
