class AddComment {
  constructor(payload) {
    const { content } = payload;

    this.content = content;
  }
}

module.exports = AddComment;
