import DS from 'ember-data';

const {attr, hasMany} = DS;

export default DS.Model.extend({
  v: attr('string'),
  t: attr('date'),
  deps: attr(),
  fp: attr(),
  tags: attr(),

  suites: hasMany('suite', {async: true})
});
