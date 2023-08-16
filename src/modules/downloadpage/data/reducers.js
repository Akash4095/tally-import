import { combineReducers } from 'redux';

function saveLGRes(state = {}, action) {
    if (action.type === 'SAVE_LG_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveIGRes(state = {}, action) {
    if (action.type === 'SAVE_IG_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function saveOBRes(state = {}, action) {
    if (action.type === 'SAVE_OB_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveCCRes(state = {}, action) {
    if (action.type === 'SAVE_CC_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveOpeningStockRes(state = {}, action) {
    if (action.type === 'SAVE_OPENING_STOCK_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveStockJournalRes(state = {}, action) {
    if (action.type === 'SAVE_STOCK_JOURNAL_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveVtypeRes(state = {}, action) {
    if (action.type === 'SAVE_VTYPE_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveExceptionOpeningStockRes(state = {}, action) {
    if (action.type === 'SAVE_EXCEPTION_OPENING_STOCK_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveAccountRes(state = {}, action) {
    if (action.type === 'SAVE_ACCOUNT_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveInventoryRes(state = {}, action) {
    if (action.type === 'SAVE_INVENTORY_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveExceptionRes(state = {}, action) {
    if (action.type === 'SAVE_EXCEPTION_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveInputDataForConvertRes(state = {}, action) {
    if (action.type === 'SAVE_INPUT_DATA_FOR_CONVERT') {
        return action.payload
    }
    else {
        return state
    }
}

function clearDbRes(state = {}, action) {
    if (action.type === 'CLEAR_DB_RES') {
        return action.payload
    }
    else {
        return state
    }
}
const downloadpage = combineReducers({
    saveLGRes,
    saveIGRes,
    saveOBRes,
    saveCCRes,
    saveOpeningStockRes,
    saveStockJournalRes,
    saveVtypeRes,
    saveExceptionOpeningStockRes,
    saveAccountRes,
    saveInventoryRes,
    saveExceptionRes,
    saveInputDataForConvertRes,
    clearDbRes,
});

export default downloadpage;