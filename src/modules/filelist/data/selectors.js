import moment from 'moment'
import { createSelector } from 'reselect'
import { filePostButton, fileSearchList } from './model'

export const getIsFetchingFileList = (state, props) => state.filelist.params.isFetching
export const getIsFileListFetched = (state, props) => state.filelist.params.filelistFetched
export const getFileListList = (state, props) => state.filelist.byId

// for file download
export const getIsFileDownloadStarted = (state) => state.filelist.saveFileDownloadInitialRes

// selector for posted response
export const getIsLedgerMasterPosted = (state, props) => state.filelist.saveLedgerMasterResponse
export const getIsItemMasteraPosted = (state, props) => state.filelist.saveItemMasterResponse
export const getIsCCPosted = (state, props) => state.filelist.saveCCResponse
export const getIsBillsReceivablePosted = (state, props) => state.filelist.saveBillsReceivableResponse
export const getIsBillsPayablePosted = (state, props) => state.filelist.saveBillsPayableResponse
export const getIsOpeningTrailBalPosted = (state, props) => state.filelist.saveOpeningTrailBalResponse
export const getIsOpeningStockPosted = (state, props) => state.filelist.saveOpeningStockResponse
export const getIsStockJournalPosted = (state, props) => state.filelist.saveStockJournalResponse
export const getIsVtypePosted = (state, props) => state.filelist.saveVtypeResponse
export const getIsDaybookPosted = (state, props) => state.filelist.saveDaybookResponse
export const getIsGstLedgerPosted = (state, props) => state.filelist.saveGstLedgerResponse
export const getIsGstDataPosted = (state, props) => state.filelist.saveGstDataResponse

// selector for downloaded response
export const getIsLedgerMasterDownloaded = (state, props) => state.filelist.downloadPostedLedgerMasterResponse
export const getIsItemMasterDownloaded = (state, props) => state.filelist.downloadPostedItemMasterResponse
export const getIsCCDownloaded = (state, props) => state.filelist.downloadPostedCCResponse
export const getIsBillsReceivableDownloaded = (state, props) => state.filelist.downloadPostedBillsReceivableResponse
export const getIsBillsPayableDownloaded = (state, props) => state.filelist.downloadPostedBillsPayableResponse
export const getIsOpeningTrailBalDownloaded = (state, props) => state.filelist.downloadPostedOpeningTrailBalResponse
export const getIsOpeningStockDownloaded = (state, props) => state.filelist.downloadPostedOpeningStockResponse
export const getIsStockJournalDownloaded = (state, props) => state.filelist.downloadPostedStockJournalResponse
export const getIsVtypeDownloaded = (state, props) => state.filelist.downloadPostedVtypeResponse
export const getIsDaybookDownloaded = (state, props) => state.filelist.downloadPostedDaybookResponse
export const getIsGstLedgerDownloaded = (state, props) => state.filelist.downloadPostedGstLedgerResponse
export const getIsGstDataDownloaded = (state, props) => state.filelist.downloadPostedGstDataResponse

// selector for unsync res
export const getIsUnsyncFileRes = (state, props) => state.filelist.saveUnsyncPostedFileResponse


export const getFileListSearch = (state, path) => {
    return fileSearchList()
}

export const getFilePostDataValues = (state, path) => {
    return filePostButton()
}

export const getFilteredFileList = createSelector(
    getFileListList,
    (filelist) => {
        let filteredFileList = Object.keys(filelist).map(function (key) {
            return filelist[key];
        })
        return filteredFileList;
    }
)

export const getFilteredLedgerMasterList = createSelector(
    getFileListList,
    (filelist) => {
        let ledgerMaster = Object.values(filelist).filter((obj) => obj.file_type === "ledger_master")
        let sortedArr = ledgerMaster.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)

export const getFilteredItemMasterList = createSelector(
    getFileListList,
    (filelist) => {
        let itemMaster = Object.values(filelist).filter((obj) => obj.file_type === "item_master")
        let sortedArr = itemMaster.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)

export const getFilteredCcList = createSelector(
    getFileListList,
    (filelist) => {
        let ccmaster = Object.values(filelist).filter((obj) => obj.file_type === "cc_master")
        let sortedArr = ccmaster.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)

export const getFilteredBillsReceivableList = createSelector(
    getFileListList,
    (filelist) => {
        let billsR = Object.values(filelist).filter((obj) => obj.file_type === "bills_receivable")
        let sortedArr = billsR.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)
export const getFilteredBillsPayableList = createSelector(
    getFileListList,
    (filelist) => {
        let billsP = Object.values(filelist).filter((obj) => obj.file_type === "bills_payable")
        let sortedArr = billsP.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)
export const getFilteredOpeningTrailBalList = createSelector(
    getFileListList,
    (filelist) => {
        let openingTb = Object.values(filelist).filter((obj) => obj.file_type === "opening_Trail_balance")
        let sortedArr = openingTb.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)

export const getFilteredOpeningStockList = createSelector(
    getFileListList,
    (filelist) => {
        let openingStock = Object.values(filelist).filter((obj) => obj.file_type === "opening_stock")
        let sortedArr = openingStock.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)
export const getFilteredDaybookList = createSelector(
    getFileListList,
    (filelist) => {
        let daybook = Object.values(filelist).filter((obj) => obj.file_type === "daybook")
        let sortedArr = daybook.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)

export const getFilteredVtypeList = createSelector(
    getFileListList,
    (filelist) => {
        let vtypes = Object.values(filelist).filter((obj) => obj.file_type === "vtypes")
        let sortedVtypeArr = vtypes.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedVtypeArr
    }
)

export const getFilteredGstLedgerList = createSelector(
    getFileListList,
    (filelist) => {
        let gstLedger = Object.values(filelist).filter((obj) => obj.file_type === "gst_ledger")
        let sortedGstLedgerArr = gstLedger.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedGstLedgerArr
    }
)

export const getFilteredGstDataList = createSelector(
    getFileListList,
    (filelist) => {
        let gstData = Object.values(filelist).filter((obj) => obj.file_type === "gst_data")
        let sortedGstDataArr = gstData.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedGstDataArr
    }
)

export const getFilteredStockJournalList = createSelector(
    getFileListList,
    (filelist) => {
        let stockJournal = Object.values(filelist).filter((obj) => obj.file_type === "stck_jr")
        let sortedArr = stockJournal.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)