import Ember from 'ember';

export function isString([param]/*, hash*/) {
  return typeof param === 'string';
}

export default Ember.Helper.helper(isString);
