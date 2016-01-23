import Ember from 'ember';

export function toGb([bytes]/*, hash*/) {
  return bytes / Math.pow(2, 30);
}

export default Ember.Helper.helper(toGb);
