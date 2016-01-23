/* global ForerunnerDB */
import Ember from 'ember';

export default Ember.Service.extend({
  init(){
    this._super(...arguments);

    const db = new ForerunnerDB().db();
    this.set('benchmark', db.collection('benchmark', {primaryKey: "id"}));
  }
});
