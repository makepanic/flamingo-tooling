import Ember from 'ember';

const {computed, inject} = Ember;

export default Ember.Controller.extend({
  benchmark: inject.controller('benchmark'),

  benchmarks: computed.alias('benchmark.sortedModel')
});
