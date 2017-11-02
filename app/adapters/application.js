import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'flamingo-tooling/assets',

  buildURL(){
    const url = this._super(...arguments);
    return `${url}.json`;
  }
});
