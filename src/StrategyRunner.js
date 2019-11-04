class StrategyRunner {
  constructor(strategy) {
    this.strategy = strategy;
  }

  run() {
    throw new Error('run is a required method on StrategyRunner.');
  }
}

module.exports = StrategyRunner;
