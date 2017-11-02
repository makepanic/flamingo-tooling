import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return {
      data: {
        id: payload.benchmark.id,
        type: 'benchmark',
        attributes: payload.benchmark,
        "relationships": {
          suites: {
            links: {
              related: `/flamingo-tooling/assets/suites/${payload.benchmark.id}.json`
            }
          }
        }
      }
    }
  }
});
