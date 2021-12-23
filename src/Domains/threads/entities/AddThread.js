class AddThread {
  constructor(payload) {
    const { title, body } = payload;

    this.title = title;
    this.body = body;
  }
}

module.exports = AddThread;
