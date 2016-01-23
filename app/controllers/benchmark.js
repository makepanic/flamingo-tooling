import Ember from 'ember';
import semver from 'npm:semver';

const {computed} = Ember;

export default Ember.Controller.extend({
  queryParams: ['skipNode', 'skipTag', 'skipVersion', 'date'],
  skipNode: [],
  skipTag: [],
  skipVersion: [],
  date: null,

  sortOptions: ['t:desc'],
  sortedModel: computed.sort('filteredModel', 'sortOptions'),

  filteredModel: computed('model.[]', 'skipNode', 'skipTag', 'skipVersion', 'date', function(){
    let model = this.get('model'),
      skipNode = this.get('skipNode'),
      skipVersion = this.get('skipVersion'),
      skipTag = this.get('skipTag');

    function filterFunction(benchmark) {
      let valid = true;
      if (valid && skipNode) {
        valid = skipNode.indexOf(benchmark.fp.libs.node.node) === -1;
      }
      if (valid && skipTag) {
        valid = !benchmark.tags.some(tag => skipTag.indexOf(tag) !== -1);
      }
      if (valid && skipVersion) {
        valid = skipVersion.indexOf(benchmark.v) === -1;
      }
      return valid;
    }

    return model.filter(filterFunction);
  }),

  nodes: computed('model.[]', function(){
    return Object.keys(this.get('model').reduce((all, benchmark) => {
      all[benchmark.fp.libs.node.node] = true;
      return all;
    }, {})).sort(semver.compare).reverse();
  }),
  flamingoVersions: computed('model.[]', function(){
    return Object.keys(this.get('model').reduce((all, benchmark) => {
      all[benchmark.v] = true;
      return all;
    }, {})).sort(semver.compare).reverse();
  }),
  tags: computed('model.[]', function(){
    return Object.keys(this.get('model').reduce((all, benchmark) => {
      all[benchmark.tags] = true;
      return all;
    }, {}));
  }),
  dates: computed('model.[]', function(){
    return [
      {title: 'today'},
      {title: 'last week'},
      {title: 'last month'},
      {title: 'last year'},
      {title: 'all'}
    ];
  }),

  actions: {
    toggleFilter(filterName, value) {
      let filter = this.get(filterName),
        idx = filter.indexOf(value);

      if (idx !== -1) {
        filter.removeAt(idx);
      } else {
        filter.pushObject(value);
      }

    }
  }
});
