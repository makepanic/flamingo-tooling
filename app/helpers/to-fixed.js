import Ember from 'ember';

export function toFixed([number, length]/*, hash*/) {
  return number.toFixed(length);
}

export default Ember.Helper.helper(toFixed);
