import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition){
    if (transition.targetName === 'benchmark.detail.suites.index') {
      const suites = this.modelFor('benchmark.detail.suites');
      const benchmark = this.modelFor('benchmark.detail');

      this.transitionTo(
        'benchmark.detail.suites.suite.topic',
        benchmark,
        suites.get('firstObject'),
        suites.get('firstObject.topics.firstObject'),
      );
    }
  }
});
