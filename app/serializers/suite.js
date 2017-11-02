import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return {
      data: payload.suites.map(suite => {
        return {
          id: `${suite.benchmark}-${suite.name}`,
          type: 'suite',
          attributes: suite,
        }
      })
    }
  }
});
