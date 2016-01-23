import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    if (transition.targetName === 'benchmark.detail.index') {
      this.transitionTo('benchmark.detail.system');
    }
  },
  model({id}){
    return this.modelFor('benchmark').filter(b => b.id === id)[0];
  },
  afterModel(model) {
    this.set('breadCrumb', {
      title: model.id
    });
  }
});
