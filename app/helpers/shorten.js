import Ember from 'ember';

export function shorten([str, length]/*, hash*/) {
  length = length || 10;
  return str.substring(0, length);
}

export default Ember.Helper.helper(shorten);
