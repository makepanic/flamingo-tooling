import Ember from 'ember';

const {computed} = Ember;

export default Ember.Controller.extend({

  suiteNames: computed('model.suites', function(){
    return this.get('model.suites').map(suite => suite.name);
  }),

  suitesData: computed('suiteNames', function () {
    let benchmark = this.get('model'),
      suiteNames = this.get('suiteNames'),
      groups = {};

    benchmark.suites.forEach(suite => {
      suite.topics.forEach(topic => {
        topic.inputs.forEach(input => {
          input.variants.forEach(variant => {
            let key = `${suite.name}`;
            groups[key] = groups[key] || {
                name: `${suite.name}`,
                data: []
              };

            groups[key].data.push([suiteNames.indexOf(suite.name), variant.hz]);
          });
        });
      });
    });

    return Object.keys(groups).map(group => {
      return groups[group];
    });
  }),

  suitesOptions: computed('suiteNames', function () {
    const suiteNames = this.get('suiteNames');
    return {
      chart: {
        type: 'scatter',
        height: 800
      },
      title: {
        text: 'operations per second by version'
      },
      xAxis: {
        categories: suiteNames,
        title: {
          text: 'Suite'
        }
      },
      yAxis: {
        type: 'logarithmic',
        title: {
          text: 'op/s'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      }
    };
  }),


});
