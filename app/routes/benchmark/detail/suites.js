import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.modelFor('benchmark.detail').get('suites');
  },
  setupController(ctrl, model){
    ctrl.set('model', model);
    ctrl.set('benchmark', this.modelFor('benchmark.detail'));
  }
});
