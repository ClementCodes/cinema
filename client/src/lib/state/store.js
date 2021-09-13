import { createStore,  applyMiddleware, compose } from "redux";
import blogApp from "./reducer";

//redux-thunk va pemettre de faire tout ce qui est action synchronisé
import thunk from "redux-thunk";
 import { composeWithDevTools } from "redux-devtools-extension";





 



const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(blogApp, composeWithDevTools(applyMiddleware(thunk)))

export default store;