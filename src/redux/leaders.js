import * as ActionTypes from './ActionTypes';

export const Leaders = (state = { isLoading: true,
    errMess: null,
    leaders:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};
        //...state means take curr value of the state and updates it
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}
        //if server fails to give the info of leader, err mess
        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
/*import { LEADERS } from '../shared/leaders';

export const Leaders = (state = LEADERS, action) => {
    switch (action.type) {
        default:
          return state;
      }
};*/