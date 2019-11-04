class Timer {
  constructor() {}

  get time() {
    throw new Error('get time is a required method on Timer.');
  }

  get utc() {
    throw new Error('get utc is a required method on Timer.');
  }

  setInterval() {
    throw new Error('setInterval is a required method on Timer.');
  }
}

module.exports = Timer;
