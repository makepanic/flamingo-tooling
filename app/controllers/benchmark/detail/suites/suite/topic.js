import Ember from 'ember';

const {computed} = Ember;

export default Ember.Controller.extend({
  data: computed('model.inputs', function () {

    let gmValues = [],
      sharpValues = [];

    this.get('model.inputs').forEach(input => {
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

  options: computed('model.name', function () {

    let inputNames = this.get('model.inputs').map(i => i.name);

    return {
      chart: {
        type: 'bar',
        height: 1500
      },
      title: {
        text: this.get('model.name')
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
