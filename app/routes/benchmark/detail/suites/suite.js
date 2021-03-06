import Ember from 'ember';

export default Ember.Route.extend({
  serialize: function(model) {
    return { suite_name: model.name };
  },

  model({suite_name}){
    return this.modelFor('benchmark.detail').suites
      .filter(suite => suite.name === suite_name)[0];
  },
  setupController(ctrl, model) {
    ctrl.set('benchmark', this.modelFor('benchmark.detail'));
    ctrl.set('model', model);
  },
  afterModel(model) {
    this.set('breadCrumb', {
      title: model.name
    });
  }
});
