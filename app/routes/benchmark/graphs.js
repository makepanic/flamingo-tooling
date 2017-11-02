import Ember from 'ember';

const {RSVP} = Ember;

export default Ember.Route.extend({
  model(){
    return this.modelFor('benchmark');
  },
  afterModel(model){
    return RSVP.all(model.map(benchmark => benchmark.get('suites')))
  }
});
