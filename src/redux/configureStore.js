import {createStore} from 'redux';
import { Reducer, initialState } from './reducer'
//need the above to configure the store
// redux store
export const ConfigureStore = () => {
    const store = createStore(
        Reducer, // reducer
        initialState, // our initialState
    );

    return store;
}