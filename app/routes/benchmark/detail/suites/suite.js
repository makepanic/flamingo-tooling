import Ember from 'ember';

const {get} = Ember;

export default Ember.Route.extend({
  serialize: function(model) {
    return { suite_name: get(model, 'name') };
  },

  model({suite_name}){
    return this.modelFor('benchmark.detail').get('suites')
      .find(suite => get(suite, 'name') === suite_name);
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
