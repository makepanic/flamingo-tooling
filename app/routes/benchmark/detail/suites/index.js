import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition){
    if (transition.targetName === 'benchmark.detail.suites.index') {
      let benchmark = this.modelFor('benchmark.detail'),
        suite = benchmark.suites[0],
        topic = suite.topics[0];

      this.transitionTo('benchmark.detail.suites.suite.topic',
        benchmark, suite, topic);
    }
  }
});
