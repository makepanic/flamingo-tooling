import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
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
