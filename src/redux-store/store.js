import { root_reducers } from "./root-reducer";
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { logger } from "redux-logger";


let middlewares = [logger];

let composedEnhancers = compose(applyMiddleware(...middlewares));

export let store = createStore(root_reducers, undefined, composedEnhancers);
