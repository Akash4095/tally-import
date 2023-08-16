import * as type from './types'


export function downloadLG(data) {
    return {
        type: type.DOWNLOAD_LG,
        payload: data
    };
}

export function downloadIG(data) {
    return {
        type: type.DOWNLOAD_IG,
        payload: data
    };
}

export function downloadOB(data) {
    return {
        type: type.DOWNLOAD_OB,
        payload: data
    };
}

export function downloadCC(data) {
    return {
        type: type.DOWNLOAD_CC,
        payload: data
    };
}

export function downloadOpeningStock(data) {
    return {
        type: type.DOWNLOAD_OPENING_STOCK,
        payload: data
    };
}

export function downloadStockJournal(data) {
    return {
        type: type.DOWNLOAD_STOCK_JOURNAL,
        payload: data
    };
}

export function downloadVtype(data) {
    return {
        type: type.DOWNLOAD_STOCK_JOURNAL,
        payload: data
    };
}

export function downloadExceptionOpeningStock(data) {
    return {
        type: type.DOWNLOAD_EXCEPTION_OPENING_STOCK,
        payload: data
    };
}

export function downloadAccount(data) {
    return {
        type: type.DOWNLOAD_ACCOUNT,
        payload: data
    };
}
export function downloadInventory(data) {
    return {
        type: type.DOWNLOAD_INVENTORY,
        payload: data
    };
}
export function downloadException(data) {
    return {
        type: type.DOWNLOAD_EXCEPTION,
        payload: data
    };
}
export function clearDB(data) {
    return {
        type: type.CLEAR_DB,
        payload: data
    };
}

export function clearDBResponse(data) {
    return {
        type: type.CLEAR_DB_RES,
        payload: data
    };
}

export function saveLGRes(data) {
    return {
        type: type.SAVE_LG_RES,
        payload: data
    };
}
export function saveIGRes(data) {
    return {
        type: type.SAVE_IG_RES,
        payload: data
    };
}
export function saveOBRes(data) {
    return {
        type: type.SAVE_OB_RES,
        payload: data
    };
}

export function saveCCRes(data) {
    return {
        type: type.SAVE_CC_RES,
        payload: data
    };
}

export function saveOpeningStockRes(data) {
    return {
        type: type.SAVE_OPENING_STOCK_RES,
        payload: data
    };
}

export function saveStockJournalRes(data) {
    return {
        type: type.SAVE_STOCK_JOURNAL_RES,
        payload: data
    };
}

export function saveVtypeRes(data) {
    return {
        type: type.SAVE_VTYPE_RES,
        payload: data
    };
}

export function saveExceptionOpeningStockRes(data) {
    return {
        type: type.SAVE_EXCEPTION_OPENING_STOCK_RES,
        payload: data
    };
}
export function saveAccountRes(data) {
    return {
        type: type.SAVE_ACCOUNT_RES,
        payload: data
    };
}
export function saveInventoryRes(data) {
    return {
        type: type.SAVE_INVENTORY_RES,
        payload: data
    };
}
export function saveExceptionRes(data) {
    return {
        type: type.SAVE_EXCEPTION_RES,
        payload: data
    };
}

export function saveInputDataForConvert(data) {
    return {
        type: type.SAVE_INPUT_DATA_FOR_CONVERT,
        payload: data
    };
}


