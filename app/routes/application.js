import Ember from 'ember';

const {RSVP, inject: {service}} = Ember;

export default Ember.Route.extend({
  ajax: service(),
  db: service(),

  model() {
    const store = this.get('store');

    return this.get('ajax').request('/flamingo-tooling/assets/benchmarks.json')
      .then(data => {
        let promises = data.benchmarks.map(id => {
          return store.findRecord('benchmark', id)
        });

        return RSVP.all(promises).catch(e => {
          debugger;
          throw e;
        });
      })
  },
});
