import { downloaddata } from "./model"

export const getIsLGDownloaded = (state, props) => state.downloadpage.saveLGRes
export const getIsIGDownloaded = (state, props) => state.downloadpage.saveIGRes
export const getIsOBDownloaded = (state, props) => state.downloadpage.saveOBRes
export const getIsCCDownloaded = (state, props) => state.downloadpage.saveCCRes
export const getIsOpeningStockDownloaded = (state, props) => state.downloadpage.saveOpeningStockRes
export const getIsStockJournalDownloaded = (state, props) => state.downloadpage.saveStockJournalRes
export const getIsVtypeDownloaded = (state, props) => state.downloadpage.saveVtypeRes
export const getIsExceptionOpeningStockDownloaded = (state, props) => state.downloadpage.saveExceptionOpeningStockRes
export const getIsAccountDownloaded = (state, props) => state.downloadpage.saveAccountRes
export const getIsInventoryDownloaded = (state, props) => state.downloadpage.saveInventoryRes
export const getIsExceptionDownloaded = (state, props) => state.downloadpage.saveExceptionRes
export const getIsDbCleared = (state, props) => state.downloadpage.clearDbRes

export const getIsInputDataForConvert = (state, props) => state.downloadpage.saveInputDataForConvertRes

export const getDownloadData = (state, path) => {
    return downloaddata()
}