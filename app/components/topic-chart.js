import Ember from 'ember';
import Highcharts from 'ember-highcharts/components/high-charts';

const {computed} = Ember;

export default Highcharts.extend({
  // chartMode: '', // empty, 'StockChart', or 'Map'
  // chartOptions: {},
  // chartData: [],
  // theme: {}

  topic: undefined,

  content: computed('topic.inputs', function () {
    let gmValues = [],
      sharpValues = [];

    this.get('topic.inputs').forEach(input => {
      input.variants.forEach(variant => {
        if (variant.name === 'GM') {
          gmValues.push(variant.hz);
        }
        if (variant.name === 'VIPS') {
          sharpValues.push(variant.hz);
        }
      });
    });

    return [
      {
        name: 'GM',
        data: gmValues
      }, {
        name: 'VIPS',
        data: sharpValues
      }
    ];
  }),

  chartOptions: computed('topic.name', function () {
    let inputNames = this.get('topic.inputs').map(i => i.name);

    return {
      chart: {
        type: 'bar',
        height: 1500
      },
      title: {
        text: this.get('topic.name')
      },
      xAxis: {
        categories: inputNames,
        title: {
          text: null
        }
      },
      yAxis: {
        //type: 'logarithmic',
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            formatter: function() {
              return this.point.y.toFixed(2) + ' ops/s';
            },
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        shadow: true
      },
      credits: {
        enabled: false
      }
    };
  })
});
