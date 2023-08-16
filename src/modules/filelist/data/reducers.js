import { combineReducers } from "redux";
import { merge } from "lodash";
import { normalize, schema } from 'normalizr'

const filelistSchema = new schema.Entity('filelists', {}, { idAttribute: 'id' })
const filelistListSchema = [filelistSchema]

const defaultFilelistParams = {
    filelistFetched: false,
}

function byId(state = {}, action) {
    if (action.type === 'FETCHED_FILE_LIST') {
        // const normalizeFilelist = normalize(action.payload.data, filelistListSchema)
        // return merge({}, state, normalizeFilelist.entities.filelists)
        return action.payload.data
    }
    else {
        return state
    }
}


function saveFileDownloadInitialRes(state = {}, action) {
    if (action.type === 'SAVE_FILE_DOWNLOAD_INITIAL_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveLedgerMasterResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_LEDGER_MASTER_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function saveItemMasterResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_ITEM_MASTER_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveCCResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_CC_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function saveBillsReceivableResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_BILLS_RECEIVABLE_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function saveBillsPayableResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_BILLS_PAYABLE_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function saveOpeningTrailBalResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_OPENING_TRAIL_BAL_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveOpeningStockResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_OPENING_STOCK_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveStockJournalResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_STOCK_JOURNAL_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveVtypeResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_VTYPE_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function saveDaybookResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_DAYBOOK_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function saveGstLedgerResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_GST_LEDGER_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function saveGstDataResponse(state = {}, action) {
    if (action.type === 'SAVE_POSTED_GST_DATA_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function downloadPostedLedgerMasterResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_LEDGER_MASTER_RES') {
        return action.payload
    }
    else {
        return state
    }
}


function downloadPostedItemMasterResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_ITEM_MASTER_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function downloadPostedCCResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_CC_RES') {
        return action.payload
    }
    else {
        return state
    }
}


function downloadPostedBillsReceivableResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_BILLS_RECEIVABLE_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function downloadPostedBillsPayableResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_BILLS_PAYABLE_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function downloadPostedOpeningTrailBalResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_OPENING_TRAIL_BAL_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function downloadPostedOpeningStockResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_OPENING_STOCK_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function downloadPostedStockJournalResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_STOCK_JOURNAL_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function downloadPostedVtypeResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_VTYPE_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function downloadPostedDaybookResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_DAYBOOK_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function downloadPostedGstLedgerResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_GST_LEDGER_RES') {
        return action.payload
    }
    else {
        return state
    }
}
function downloadPostedGstDataResponse(state = {}, action) {
    if (action.type === 'SAVE_DOWNLOAD_POSTED_GST_DATA_RES') {
        return action.payload
    }
    else {
        return state
    }
}


function saveUnsyncPostedFileResponse(state = {}, action) {
    if (action.type === 'SAVE_UNSYNC_POSTED_FILE_RES') {
        return action.payload
    }
    else {
        return state
    }
}

function params(state = defaultFilelistParams, action) {
    if (action.type === 'FETCHED_FILE_LIST') {
        return {
            ...state,
            filelistFetched: true,
            isFetching: false
        }
    } else {
        return state
    }
}



const filelist = combineReducers({
    byId,
    saveFileDownloadInitialRes,
    saveLedgerMasterResponse,
    saveItemMasterResponse,
    saveCCResponse,
    saveBillsReceivableResponse,
    saveBillsPayableResponse,
    saveOpeningTrailBalResponse,
    saveOpeningStockResponse,
    saveStockJournalResponse,
    saveVtypeResponse,
    saveDaybookResponse,
    saveGstLedgerResponse,
    saveGstDataResponse,
    downloadPostedLedgerMasterResponse,
    downloadPostedItemMasterResponse,
    downloadPostedCCResponse,
    downloadPostedBillsReceivableResponse,
    downloadPostedBillsPayableResponse,
    downloadPostedOpeningTrailBalResponse,
    downloadPostedOpeningStockResponse,
    downloadPostedStockJournalResponse,
    downloadPostedVtypeResponse,
    downloadPostedDaybookResponse,
    downloadPostedGstLedgerResponse,
    downloadPostedGstDataResponse,
    saveUnsyncPostedFileResponse,
    params,

})

export default filelist