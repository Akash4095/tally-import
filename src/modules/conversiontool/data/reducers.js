import { combineReducers } from "redux";
import { merge } from "lodash";
import { normalize, schema } from 'normalizr'

const conversionToolSchema = new schema.Entity('convesrion', {}, { idAttribute: 'id' })
const conversionToolListSchema = [conversionToolSchema]

const defaultConversionToolParams = {
    conversionToolFetched: false,
}

function byId(state = {}, action) {
    if (action.type === 'FETCHED_CONVERSION_TOOL_LISTING') {
        if (action.payload.type === "success") {
            const normalizeConversionTool = normalize(action.payload.data, conversionToolListSchema)
            return merge({}, state, normalizeConversionTool.entities.convesrion)
        } else {
            return state
        }

    }
    else {
        return state
    }
}

function params(state = defaultConversionToolParams, action) {
    if (action.type === 'FETCHED_CONVERSION_TOOL_LISTING') {
        return {
            ...state,
            conversionToolFetched: true,
            isFetching: false
        }
    } else {
        return state
    }
}



const conversiontool = combineReducers({
    byId,
    params,

})

export default conversiontool