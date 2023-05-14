
import { combineReducers } from "redux";
import {
  ProviderReducer,
  ContractReducer,
  UserReducer,
  RegisterdReducer,
} from "./reducers";

export const root_reducers = combineReducers({
  ProviderReducer,
  ContractReducer,
  RegisterdReducer,
  UserReducer,
});