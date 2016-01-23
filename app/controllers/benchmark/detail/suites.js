import Ember from 'ember';

const {inject} = Ember;

export default Ember.Controller.extend({
  benchmark: inject.controller('benchmark.detail')
});
