class Strategy {
  constructor(name) {
    this.name = name;
    this.positions = {};
    this.history = {};
  }

  get time() {
    return this.timer.time;
  }

  async init(timer, executor, feeds = []) {
    this.timer = timer;
    this.executor = executor;
    this.feeds = feeds;

    await this.executor.init(timer);
    await Promise.all(this.feeds.map(feed => feed.init(timer)));
  }

  async _onExecutorEvent(e) {
    if (e.type === 'OPEN') this.positions[e.data.id] = e.data;
    else if (e.type === 'EDIT') this.positions[e.data.id] = e.data;
    else if (e.type === 'CLOSE') delete this.positions[e.data];

    if (this.onExecutorEvent) await this.onExecutorEvent(e);
  }

  start() {
    this.executor.events.subscribe(this.name, this._onExecutorEvent.bind(this));

    for (let i = 0; i < this.feeds.length; i++) {
      const feed = this.feeds[i];
      const method = this[`on${feed.name}`].bind(this);
      if (method) feed.subscribe(this.name, method);
    }
  }
}

module.exports = Strategy;
