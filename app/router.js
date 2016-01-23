import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('benchmark', function () {
    this.route('detail', {
      path: '/:id'
    }, function () {
      this.route('system');
      this.route('suites', function () {
        this.route('suite', {
          path: '/:suite_name'
        }, function () {
          this.route('topic', {
            path: '/:topic_name'
          });
        });
      });
    });
    this.route('graphs');
  });
  this.route('formats');
});

export default Router;
