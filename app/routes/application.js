import Ember from 'ember';

const {RSVP} = Ember;
const {service} = Ember.inject;

export default Ember.Route.extend({
  ajax: service(),
  db: service(),

  model(){
    return RSVP.hash({
      benchmarks: this.get('ajax').request('/flamingo-tooling/assets/benchmarks.json')
        .then(benchmarks => {
          benchmarks.forEach(benchmark =>
            benchmark.t = new Date(benchmark.t));

          this.get('db.benchmark').insert(benchmarks);
          return benchmarks;
        })
    });
  },
});
