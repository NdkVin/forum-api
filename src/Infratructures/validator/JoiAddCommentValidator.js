const AddCommentValidator = require('../../Applications/validator/AddCommentValidator');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JoiAddCommentValidator extends AddCommentValidator {
  constructor(joi) {
    super();
    this._joi = joi;
  }

  validate(payload) {
    const validateAddCommentSchema = this._joi.object({
      content: this._joi.string().required().messages({
        'string.base': 'content harus berupa string',
        'string.empty': 'content tidak boleh kosong',
        'any.required': 'content harus diisi',
      }),
    });

    const result = validateAddCommentSchema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  }
}

module.exports = JoiAddCommentValidator;
