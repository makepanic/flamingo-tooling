import Ember from 'ember';

const {get} = Ember;

export default Ember.Route.extend({
  serialize: function(model) {
    return { topic_name: model.name };
  },

  model({topic_name}) {
    let suite = this.modelFor('benchmark.detail.suites.suite');
    return get(suite, 'topics').find(t => get(t, 'name') === topic_name);
  },

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.name
    });
  }
});
