import { combineReducers } from "redux";
import { merge } from "lodash";
import { normalize, schema } from 'normalizr'

const segmapSchema = new schema.Entity('segmaps', {}, { idAttribute: 'id' })
const segmapListSchema = [segmapSchema]

const defaultSegmapParams = {
    segmapFetched: false,
    companyFetched: false,
    isSaved: false,
    createTitle: 'Create Segmap',
    createSubmitButtonText: 'Submit',
    editTitle: 'Edit Segmap',
    editSubmitButtonText: 'Update'
}

function byId(state = {}, action) {
    if (action.type === 'SAVED_SEGMAP') {
        if (action.txn === 'success' || action.txn === 'Success') {
            const segmapId = action.payload.rlbSegid
            return {
                ...state,
                [segmapId]: action.payload
            }
        } else {
            return state
        }
    }
    if (action.type === 'UPDATE_SEGMAP') {
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
    if (action.type === 'FETCHED_SEGMAP') {
        const normalizeSegmap = normalize(action.payload.data, segmapListSchema)
        return merge({}, state, normalizeSegmap.entities.segmaps)
    }
    if (action.type === 'DELETED_SEGMAP') {
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

function segmapListing(state = {}, action) {
    if (action.type === 'FETCHED_SEGMAP') {
        if (action.payload.type === "success" || action.payload.type === "Success") {
            return action.payload.data
        } else {
            return state
        }
    } else {
        return state
    }
}

function storeSearchedSegmap(state = {}, action) {
    if (action.type === 'STORE_SEARCHED_SEGMAP') {
        if (action.payload.type === "success" || action.payload.type === "Success") {
            return action.payload.data
        } else {
            return state
        }
    } else {
        return state
    }
}

function storeFetchedCompanyDetails(state = {}, action) {
    if (action.type === 'STORE_SEARCHED_COMPANY_DETAILS') {
        if (action.payload.type === "success" || action.payload.type === "Success") {
            return action.payload.data
        } else {
            return state
        }
    } else {
        return state
    }
}

function params(state = defaultSegmapParams, action) {
    if (action.type === 'STORE_SEARCHED_COMPANY_DETAILS') {
        return {
            ...state,
            companyFetched: true,
            isFetching: false
        }
    }
    if (action.type === 'FETCHED_SEGMAP') {
        return {
            ...state,
            segmapFetched: true,
            isFetching: false
        }
    }
    if (action.type === 'SAVED_SEGMAP') {
        return {
            ...state,
            isSaved: true,
            isFetching: false
        }
    }
    if (action.type === 'UPDATE_SEGMAP') {
        return {
            ...state,
            isSaved: true,
            isFetching: false
        }
    }
    if (action.type === 'CLEAR_SAVED') {
        return {
            ...state,
            isSaved: false,
        }
    }
    else {
        return state
    }
}

function notifications(state = {}, action) {

    if (action.type === 'SAVED_SEGMAP') {
        return {
            ...state,
            [action.payload.rlbSegid]: {
                ...state[action.payload.rlbSegid],
                save: {
                    status: (action.txn === 'success' || action.txn === 'Success')  ? 'success' : 'error',
                    msg: action.msg
                }
            }
        }
    }
    if (action.type === 'UPDATE_SEGMAP') {
        console.log(action)
        return {
            ...state,       
            [action.payload.id]: {
                ...state[action.payload.id],
                save: {
                    status: (action.txn === 'success' || action.txn === 'Success')  ? 'success' : 'error',
                    msg: action.msg
                }
            }
        }
    }
    if (action.type === 'DELETED_SEGMAP') {
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

    if (action.type === 'NOTIFICATION_DONE_SEGMAP') {
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

const segmap = combineReducers({
    byId,
    params,
    storeSearchedSegmap,
    storeFetchedCompanyDetails,
    segmapListing,
    notifications

})

export default segmap