import { combineReducers } from "redux";
import { merge } from "lodash";
import { normalize, schema } from 'normalizr'

const mappingUplaodSchema = new schema.Entity('mapping', {}, { idAttribute: 'id' })
const mappingUploadListSchema = [mappingUplaodSchema]

const defaultMappingUploadParams = {
    isFetching: false,
    mappingUploadFetched: false,
}

function byId(state = {}, action) {
    if (action.type === 'FETCHED_MAPPING_LIST') {
        const normalizeSegmap = normalize(action.payload.data, mappingUploadListSchema)
        return merge({}, state, normalizeSegmap.entities.mapping)
    }
    if (action.type === 'SAVED_SINGLE_MAPPING') {
        if (action.txn === 'success' || action.txn === 'Success') {
            const segmapId = action.payload.id
            return {
                ...state,
                [segmapId]: action.payload
            }
        } else {
            return state
        }
    }

    if (action.type === 'UPDATE_MAPPING_LIST') {
        if (action.txn === 'success' || action.txn === 'Success') {
            const segmapId = action.payload.id
            return {
                ...state,
                [segmapId]: action.payload
            }
        } else {
            return state
        }
    }

    if (action.type === 'DELETED_MAPPING_LIST') {
        if (action.payload.msg.type === 'success' || action.payload.msg.type === 'Success') {
            const segmapId = action.payload.id
            let finalState = { ...state }
            delete finalState[segmapId]
            return finalState
        } else {
            return state
        }
    } else {
        return state
    }
}


function params(state = defaultMappingUploadParams, action) {
    if (action.type === 'FETCHED_MAPPING_LIST') {
        return {
            ...state,
            mappingUploadFetched: true,
            isFetching: false
        }
    }
    else {
        return state
    }
}

function savedSingleMappingRes(state = {}, action) {
    if (action.type === 'SAVED_SINGLE_MAPPING_RES') {
        return action.payload
    }
    if (action.type === 'CLEAR_SINGLE_MAPPING_RES') {
        return {}
    }
    else {
        return state
    }
}


function notifications(state = {}, action) {
    if (action.type === 'SAVED_SINGLE_MAPPING') {
        return {
            ...state,
            [action.payload.id]: {
                ...state[action.payload.id],
                save: {
                    status: (action.txn === 'success' || action.txn === 'Success') ? 'success' : 'error',
                    msg: action.msg
                }
            }
        }
    }
    if (action.type === 'UPDATE_MAPPING_LIST') {
        return {
            ...state,
            [action.payload.id]: {
                ...state[action.payload.id],
                save: {
                    status: (action.txn === 'success' || action.txn === 'Success') ? 'success' : 'error',
                    msg: action.msg
                }
            }
        }
    }
    if (action.type === 'DELETED_MAPPING_LIST') {
        return {
            ...state,
            [action.payload.id]: {
                ...state[action.payload.id],
                delete: {
                    status: (action.payload.msg.type === 'success' || action.payload.msg.type === 'Success') ? 'success' : 'error',
                    msg: action.payload.msg.msg
                }
            }
        }
    }

    if (action.type === 'NOTIFICATION_DONE_MAPPING_LIST') {
        const { id, type } = action.payload
        // Remove the 'id' element from state
        const { [id]: idValue, ...restOfState } = state;
        // Remove the 'type' from the 'id' element
        const { [type]: removedValue, ...restOfId } = idValue;
        // Merge back together
        const finalState = { ...restOfState, [id]: restOfId };
        return finalState

    } else {
        return state
    }

}

const mappingupload = combineReducers({
    byId,
    params,
    savedSingleMappingRes,
    notifications

})

export default mappingupload