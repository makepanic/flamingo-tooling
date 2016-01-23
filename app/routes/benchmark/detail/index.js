import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    if (transition.targetName === 'benchmark.detail.index') {
      this.transitionTo('benchmark.detail.system');
    }
  }
});
