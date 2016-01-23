import Ember from 'ember';

const {service} = Ember.inject;

export default Ember.Route.extend({
  ajax: service(),
  db: service(),

  model(){
    return this.get('ajax').request('/assets/benchmarks.json')
      .then(benchmarks => {
        benchmarks.forEach(benchmark =>
          benchmark.t = new Date(benchmark.t));

        this.get('db.benchmark').insert(benchmarks);
        return benchmarks;
      });
  },

  actions: {
    openBenchmark(benchmark) {
      this.transitionTo('benchmark.detail', benchmark);
    }
  }
});
