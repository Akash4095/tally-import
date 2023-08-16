import { combineReducers } from 'redux';

const defaultuploadParams = {
    datafetched :'waiting'
  }

function params(state = defaultuploadParams, action) {
    if (action.type === 'FETCH_UPLOAD_DATA') { 
        return {...state, 
            datafetched: 'pending',
        }
    } 
    if (action.type === 'FETCHED_UPLOAD_DATA') { 
        return {...state, 
            datafetched: 'success',
        }
    }   
    if (action.type === 'RESET_DATA') { 
        return defaultuploadParams
      } else {
        return state
    }
}

const dataUpload = combineReducers({
    params
});

export default dataUpload;