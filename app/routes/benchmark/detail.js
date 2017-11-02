import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    if (transition.targetName === 'benchmark.detail.index') {
      this.transitionTo('benchmark.detail.system');
    }
  },
  model({id}){
    return this.get('store').findRecord('benchmark', id);
  },

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.id
    });
  }
});
