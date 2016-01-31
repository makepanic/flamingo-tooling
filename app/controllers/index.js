import Ember from 'ember';
import semver from 'npm:semver';

const {computed} = Ember;

export default Ember.Controller.extend({
  latestVersion: computed('model', function(){
    return this.get('model').sort((a, b) => {
      return semver.compare(b.v, a.v);
    })[0].v;
  }),
  numBuilds: computed('model.length', function(){
    return this.get('model.length');
  })
});
