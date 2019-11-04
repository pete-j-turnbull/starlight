class Feed {
  constructor(name) {
    this.name = name;
    this.ready = false;
    this.subscribers = [];
  }

  init(timer) {
    this.timer = timer;
    this.ready = true;
  }

  get time() {
    if (this.ready) return this.timer.time;
    throw new Error('Feed has not been initialised.');
  }

  get utc() {
    if (this.ready) return this.timer.utc;
    throw new Error('Feed has not been initialised.');
  }

  subscribe(name, cb) {
    if (this.ready) this.subscribers.push({ name, cb });
    else throw new Error('Feed has not been initialised.');
  }

  async emit(data) {
    if (this.ready) await Promise.all(this.subscribers.map(s => s.cb(data)));
    else throw new Error('Feed has not been initialised.');
  }
}

module.exports = Feed;
