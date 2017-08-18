import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import {routerReducer, routerMiddleware} from "react-router-redux";
import {titleReducer, syncReduxAndTitle} from "redux-title";
import {browserHistory} from "react-router";
import whenMiddleware from "redux-when";

import {reducer as reduxFormReducer} from "redux-form";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import adminReducer from "./reducers/adminReducer";
import bootstrapReducer from "./reducers/bootstrapReducer";
const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
    combineReducers({
        routing: routerReducer,
        form: reduxFormReducer,
        title: titleReducer,
        bootstrap: bootstrapReducer,
        auth: authReducer,
        app: appReducer,
        product: productReducer,
        admin: adminReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        whenMiddleware,
        routingMiddleware,
        ReduxThunk,
        promiseMiddleware(),
        // createLogger()
    )
);
syncReduxAndTitle(store);

export default store;
