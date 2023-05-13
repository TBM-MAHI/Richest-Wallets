export let ProviderReducer = (state = {}, action) => {
  let { type, payload } = action;
  switch (type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        ...payload,
      };
    case "NETWORK_LOADED":
      return {
        ...state,
        ...payload,
      };
    case "ACCOUNT_LOADED":
      return {
        ...state,
        ...payload,
      };
    case "ACCOUNT_BALANCE_LOADED":
      return {
        ...state,
        ...payload,
      };
    case "SIGNER_LOADED":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};



export let ContractReducer = (state = { loaded: false }, action) => {
  let { type, payload } = action;
  switch (type) {
    case "CONTRACT_LOADED":
      return {
        ...state,
        ...payload,
        loaded: true,
      };

    default:
      return state;
  }
};
export let RegisterdReducer = (state = {}, action) => {

};
export let UserReducer = (state = {}, action) => {
  let { type, payload } = action;
  switch (type) { 
    case 'TOP_USERS_LOADED':
      return {
        ...state,
        ...payload
      }
    case 'TOTAL_USERS_LOADED':
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
};


