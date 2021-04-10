import { applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducer";
import rootSaga from "../sagas";

declare global {
  interface window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const reduxDevTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  reduxDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
