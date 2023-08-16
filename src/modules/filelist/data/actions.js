import * as type from './types'

export function fetchFileList(props) {
    return {
        type: type.FETCH_FILE_LIST,
        payload: props,
    }
}

export function fetchedFileList(props) {
    return {
        type: type.FETCHED_FILE_LIST,
        payload: props,
    }
}

export function startFileDownload(props) {
    return {
        type: type.START_FILE_DOWNLOAD,
        payload: props,
    }
}

export function saveFileDownloadInitialRes(props) {
    return {
        type: type.SAVE_FILE_DOWNLOAD_INITIAL_RES,
        payload: props,
    }
}

export function postLedgerMaster(props) {
    return {
        type: type.POST_LEDGER_MASTER,
        payload: props
    }
}


export function postItemMaster(props) {
    return {
        type: type.POST_ITEM_MASTER,
        payload: props
    }
}

export function postCC(props) {
    return {
        type: type.POST_CC,
        payload: props
    }
}

export function postBillsReceivable(props) {
    return {
        type: type.POST_BILLS_RECEIVABLE,
        payload: props
    }
}

export function postBillsPayable(props) {
    return {
        type: type.POST_BILLS_PAYABLE,
        payload: props
    }
}

export function postOpeningTrailBal(props) {
    return {
        type: type.POST_OPENING_TRAIL_BAL,
        payload: props
    }
}

export function postOpeningStock(props) {
    return {
        type: type.POST_OPENING_STOCK,
        payload: props
    }
}

export function postVtype(props) {
    return {
        type: type.POST_VTYPE,
        payload: props,
    }
}

export function postDaybook(props) {
    return {
        type: type.POST_DAYBOOK,
        payload: props,
    }
}
export function postGstLedger(props) {
    return {
        type: type.POST_GST_LEDGER,
        payload: props,
    }
}
export function postGstData(props) {
    return {
        type: type.POST_GST_DATA,
        payload: props,
    }
}

export function postStockJournal(props) {
    return {
        type: type.POST_STOCK_JOURNAL,
        payload: props,
    }
}

export function savePostedLedgerMaster(props) {
    return {
        type: type.SAVE_POSTED_LEDGER_MASTER_RES,
        payload: props,
    }
}
export function savePostedItemMaster(props) {
    return {
        type: type.SAVE_POSTED_ITEM_MASTER_RES,
        payload: props,
    }
}

export function savePostedCC(props) {
    return {
        type: type.SAVE_POSTED_CC_RES,
        payload: props,
    }
}

export function savePostedBillsReceivable(props) {
    return {
        type: type.SAVE_POSTED_BILLS_RECEIVABLE_RES,
        payload: props,
    }
}

export function savePostedBillsPayable(props) {
    return {
        type: type.SAVE_POSTED_BILLS_PAYABLE_RES,
        payload: props,
    }
}

export function savePostedOpeningTrailBal(props) {
    return {
        type: type.SAVE_POSTED_OPENING_TRAIL_BAL_RES,
        payload: props,
    }
}

export function savePostedOpeningStock(props) {
    return {
        type: type.SAVE_POSTED_OPENING_STOCK_RES,
        payload: props,
    }
}

export function savePostedVtype(props) {
    return {
        type: type.SAVE_POSTED_VTYPE_RES,
        payload: props,
    }
}

export function savePostedDaybook(props) {
    return {
        type: type.SAVE_POSTED_DAYBOOK_RES,
        payload: props,
    }
}
export function savePostedGstLedger(props) {
    return {
        type: type.SAVE_POSTED_GST_LEDGER_RES,
        payload: props,
    }
}
export function savePostedGstData(props) {
    return {
        type: type.SAVE_POSTED_GST_DATA_RES,
        payload: props,
    }
}

export function savePostedStockJournal(props) {
    return {
        type: type.SAVE_POSTED_STOCK_JOURNAL_RES,
        payload: props,
    }
}

export function downloadPostedLedgerMaster(props) {
    return {
        type: type.DOWNLOAD_POSTED_LEDGER_MASTER,
        payload: props,
    }
}
export function downloadPostedItemMaster(props) {
    return {
        type: type.DOWNLOAD_POSTED_ITEM_MASTER,
        payload: props,
    }
}
export function downloadPostedCC(props) {
    return {
        type: type.DOWNLOAD_POSTED_CC,
        payload: props,
    }
}
export function downloadPostedBillsReceivable(props) {
    return {
        type: type.DOWNLOAD_POSTED_BILLS_RECEIVABLE,
        payload: props,
    }
}
export function downloadPostedBillsPayable(props) {
    return {
        type: type.DOWNLOAD_POSTED_BILLS_PAYABLE,
        payload: props,
    }
}
export function downloadPostedOpeningTrailBal(props) {
    return {
        type: type.DOWNLOAD_POSTED_OPENING_TRAIL_BAL,
        payload: props,
    }
}

export function downloadPostedOpeningStock(props) {
    return {
        type: type.DOWNLOAD_POSTED_OPENING_STOCK,
        payload: props,
    }
}
export function downloadPostedVtype(props) {
    return {
        type: type.DOWNLOAD_POSTED_VTYPE,
        payload: props,
    }
}

export function downloadPostedDaybook(props) {
    return {
        type: type.DOWNLOAD_POSTED_DAYBOOK,
        payload: props,
    }
}
export function downloadPostedGstLedger(props) {
    return {
        type: type.DOWNLOAD_POSTED_GST_LEDGER,
        payload: props,
    }
}
export function downloadPostedGstData(props) {
    return {
        type: type.DOWNLOAD_POSTED_GST_DATA,
        payload: props,
    }
}

export function downloadPostedStockJournal(props) {
    return {
        type: type.DOWNLOAD_POSTED_STOCK_JOURNAL,
        payload: props,
    }
}

export function saveDownloadPostedLedgerMaster(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_LEDGER_MASTER_RES,
        payload: props,
    }
}
export function saveDownloadPostedItemMaster(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_ITEM_MASTER_RES,
        payload: props,
    }
}
export function saveDownloadPostedCC(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_CC_RES,
        payload: props,
    }
}
export function saveDownloadPostedBillsReceivable(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_BILLS_RECEIVABLE_RES,
        payload: props,
    }
}
export function saveDownloadPostedBillsPayable(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_BILLS_PAYABLE_RES,
        payload: props,
    }
}
export function saveDownloadPostedOpeningTrailBal(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_OPENING_TRAIL_BAL_RES,
        payload: props,
    }
}

export function saveDownloadPostedOpeningStock(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_OPENING_STOCK_RES,
        payload: props,
    }
}
export function saveDownloadPostedVtype(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_VTYPE_RES,
        payload: props,
    }
}

export function saveDownloadPostedDaybook(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_DAYBOOK_RES,
        payload: props,
    }
}
export function saveDownloadPostedGstLedger(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_GST_LEDGER_RES,
        payload: props,
    }
}
export function saveDownloadPostedGstData(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_GST_DATA_RES,
        payload: props,
    }
}

export function saveDownloadPostedStockJournal(props) {
    return {
        type: type.SAVE_DOWNLOAD_POSTED_STOCK_JOURNAL_RES,
        payload: props,
    }
}

export function unsyncPostedFile(props){
    return {
        type:type.UNSYNC_POSTED_FILE,
        payload: props
    }
}

export function saveUnsyncPostedFileRes(props){
    return {
        type:type.SAVE_UNSYNC_POSTED_FILE_RES,
        payload: props
    }
}
