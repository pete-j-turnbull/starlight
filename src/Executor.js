const Feed = require('./Feed');

class Executor {
  constructor() {
    this.ready = false;
    this.eventFeed = new Feed();
  }

  async init(timer, positions = []) {
    await this.eventFeed.init(timer);
    this.timer = timer;
    this.ready = true;
    this.positions = {};
    this.history = {};

    positions.forEach(p => (this.positions[p.id] = p));
  }

  checkReady() {
    if (this.ready) return;
    throw new Error('Executor is not initialised.');
  }

  get events() {
    return this.eventFeed;
  }

  get state() {
    return { positions: this.positions, history: this.history };
  }

  async deal(position) {
    this.positions[position.id] = position;
    await this.events.emit({ type: 'OPEN', data: position });
    return position;
  }

  async edit(id, positionUpdate) {
    const position = this.positions[id];
    if (!position) return;

    const newPosition = Object.assign(position, positionUpdate);
    this.positions[id] = newPosition;

    await this.events.emit({ type: 'UPDATE', data: newPosition });
    return newPosition;
  }

  async close(id) {
    const position = this.positions[id];
    if (!position) return;

    this.history[id] = position;
    delete this.positions[id];

    await this.events.emit({ type: 'CLOSE', data: position });
    return position;
  }
}

module.exports = Executor;
