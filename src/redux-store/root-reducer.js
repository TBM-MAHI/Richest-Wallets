
import { combineReducers } from "redux";
import { ProviderReducer, ContractReducer, UserReducer } from "./reducers";

export const root_reducers = combineReducers({
  ProviderReducer,
  ContractReducer,
  UserReducer,
});