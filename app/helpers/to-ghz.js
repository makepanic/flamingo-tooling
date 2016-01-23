import Ember from 'ember';

export function toGhz([mhz]/*, hash*/) {
  return mhz/1000;
}

export default Ember.Helper.helper(toGhz);
