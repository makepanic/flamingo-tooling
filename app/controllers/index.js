import Ember from 'ember';
import semver from 'npm:semver';

const {computed, get} = Ember;

export default Ember.Controller.extend({
  latestVersion: computed('model', function(){
    return get(get(this, 'model').sort((a, b) => {
      return semver.compare(get(b, 'v'), get(a, 'v'));
    }), 'firstObject.v');
  }),
  numBuilds: computed('model.length', function(){
    return this.get('model.length');
  })
});
