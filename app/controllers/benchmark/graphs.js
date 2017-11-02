import Ember from 'ember';
import semver from 'npm:semver';

const {computed, get} = Ember;

export default Ember.Controller.extend({
  benchmarks: computed.alias('model'),

  versions: computed('benchmarks', function () {
    return Object.keys(this.get('benchmarks').reduce((all, bench) => {
      all[get(bench, 'v')] = true;
      return all;
    }, {})).sort(semver.compare);
  }),

  data: computed('versions', function () {
    let data = [],
      colors = {
        GM: 'rgba(31, 119, 180, .25)',
        VIPS: 'rgba(255, 127, 14, .25)'
      },
      versions = this.get('versions'),
      groups = {};

    this.get('benchmarks').forEach(benchmark => {
      let b = get(benchmark, 'suites.firstObject');

      get(b, 'topics').forEach(topic => {
        get(topic, 'inputs').forEach(input => {
          get(input, 'variants').forEach(variant => {
            let key = `${variant.name}`;
            groups[key] = groups[key] || {
                name: `${variant.name}`,
                color: colors[variant.name],
                data: []
              };

            groups[key].data.push([versions.indexOf(get(benchmark, 'v')), variant.hz]);
          });
        });
      });
    });

    return Object.keys(groups).map(group => {
      return groups[group];
    });
  }),

  options: computed('versions', function () {
    const versions = this.get('versions');
    return {
      chart: {
        type: 'scatter',
        height: 800
      },
      title: {
        text: 'operations per second by version'
      },
      xAxis: {
        //type: 'category',
        categories: versions,
        title: {
          text: 'Version'
        }
      },
      yAxis: {
        type: 'logarithmic',
        title: {
          text: 'mean completion time (s)'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      }
    };
  })
});
