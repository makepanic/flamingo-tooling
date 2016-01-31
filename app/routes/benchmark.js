import Ember from 'ember';

const {service} = Ember.inject;

export default Ember.Route.extend({
  model(){
    return this.modelFor('application').benchmarks;
  },

  actions: {
    openBenchmark(benchmark) {
      this.transitionTo('benchmark.detail', benchmark);
    }
  }
});
