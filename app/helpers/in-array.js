import Ember from 'ember';

export function inArray([array, value]/*, hash*/) {
  return array.indexOf(value) !== -1;
}

export default Ember.Helper.helper(inArray);
