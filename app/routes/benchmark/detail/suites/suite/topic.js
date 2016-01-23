import Ember from 'ember';

export default Ember.Route.extend({
  serialize: function(model) {
    return { topic_name: model.name };
  },

  model({topic_name}) {
    let suite = this.modelFor('benchmark.detail.suites.suite');
    return suite.topics.filter(t => t.name === topic_name)[0];
  },

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.name
    });
  }
});
