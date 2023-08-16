
import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { TALLY_URL } from '../../../store/path'
import { fetchedFileList, saveDownloadPostedDaybook, saveDownloadPostedGstData, saveDownloadedFileRes, saveDownloadPostedGstLedger, saveDownloadPostedVtype, savePostedDaybook, savePostedGstData, savePostedGstLedger, savePostedVtype, saveFileDownloadInitialRes, savePostedLedgerMaster, savePostedItemMaster, savePostedBillsReceivable, savePostedBillsPayable, savePostedOpeningTrailBal, saveDownloadPostedLedgerMaster, saveDownloadPostedItemMaster, saveDownloadPostedBillsReceivable, saveDownloadPostedBillsPayable, saveDownloadPostedOpeningTrailBal, saveUnsyncPostedFileRes, savePostedCC, saveDownloadPostedCC, savePostedOpeningStock, saveDownloadPostedOpeningStock, savePostedStockJournal, saveDownloadPostedStockJournal } from "./actions";
import { getIsFileListFetched, getIsVtypePosted } from './selectors'
import { handlError, parseError } from "../../app/serverError";
import userACL from "../../../store/access";
import { merge } from "lodash";
import axios from "axios";

// region for fetch FileList List

function* fetchFileList() {
    yield takeEvery('FETCH_FILE_LIST', requestFileList)
}

function* requestFileList(action) {
    const isFileListFetched = yield select(getIsFileListFetched)
    let { response, error } = yield call(requestFileListAPI, action.payload);
    if (response) yield put(fetchedFileList(response.data))

}

function requestFileListAPI(data) {
    return axios.post(TALLY_URL + "/xml/fileList", data, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for fileDownload api

function* startfileDownload() {
    yield takeEvery('START_FILE_DOWNLOAD', fetchingData)
}

function* fetchingData(action) {
    const { response, error } = yield call(fetchingDataAPI, action.payload)
    if (response) {
        yield put(saveFileDownloadInitialRes(response.data))
        yield call(downloadingData, response)
    }
}

function fetchingDataAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadingData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl,'-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };

    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    // xhttp.setRequestHeader('X-RLB-DMS-ACC', localStorage.getItem('acc'));
    // xhttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('user')}`);
    xhttp.send();
}

// end region

// region for post ledger Master

function* postLedgerMaster() {
    yield takeEvery('POST_LEDGER_MASTER', initiateLedgerMasterPosting)
}

function* initiateLedgerMasterPosting(action) {
    let { response, error } = yield call(postLedgerMastereAPI, action.payload)
    if (response) yield put(savePostedLedgerMaster(response.data))
}

function postLedgerMastereAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post item Master

function* postItemMaster() {
    yield takeEvery('POST_ITEM_MASTER', initiateItemMasterPosting)
}

function* initiateItemMasterPosting(action) {
    let { response, error } = yield call(postItemMastereAPI, action.payload)
    if (response) yield put(savePostedItemMaster(response.data))
}

function postItemMastereAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for CC Master

function* postCC() {
    yield takeEvery('POST_CC', initiateCCPosting)
}

function* initiateCCPosting(action) {
    let { response, error } = yield call(postCCAPI, action.payload)
    if (response) yield put(savePostedCC(response.data))
}

function postCCAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post bills receivable

function* postBillsReceivable() {
    yield takeEvery('POST_BILLS_RECEIVABLE', initiateBillsReceivablePosting)
}

function* initiateBillsReceivablePosting(action) {
    let { response, error } = yield call(postBillsReceivableAPI, action.payload)
    if (response) yield put(savePostedBillsReceivable(response.data))
}

function postBillsReceivableAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post bills payable

function* postBillsPayable() {
    yield takeEvery('POST_BILLS_PAYABLE', initiateBillsPayablePosting)
}

function* initiateBillsPayablePosting(action) {
    let { response, error } = yield call(postBillsPayableAPI, action.payload)
    if (response) yield put(savePostedBillsPayable(response.data))
}

function postBillsPayableAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post opening trail bal

function* postOpeningTrailBal() {
    yield takeEvery('POST_OPENING_TRAIL_BAL', initiateOpeningTrailBalPosting)
}

function* initiateOpeningTrailBalPosting(action) {
    let { response, error } = yield call(postOpeningTrailBalAPI, action.payload)
    if (response) yield put(savePostedOpeningTrailBal(response.data))
}

function postOpeningTrailBalAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post opening STOCK

function* postOpeningStock() {
    yield takeEvery('POST_OPENING_STOCK', initiateOpeningStockPosting)
}

function* initiateOpeningStockPosting(action) {
    let { response, error } = yield call(postOpeningStockAPI, action.payload)
    if (response) yield put(savePostedOpeningStock(response.data))
}

function postOpeningStockAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post vtype

function* postVtype() {
    yield takeEvery('POST_VTYPE', initiateVtypePosting)
}

function* initiateVtypePosting(action) {
    let { response, error } = yield call(postVtypeAPI, action.payload)
    if (response) yield put(savePostedVtype(response.data))
}

function postVtypeAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post daybook

function* postDaybook() {
    yield takeEvery('POST_DAYBOOK', initiateDaybookPosting)
}

function* initiateDaybookPosting(action) {
    let { response, error } = yield call(postDaybookAPI, action.payload)
    if (response) yield put(savePostedDaybook(response.data))
}

function postDaybookAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post Gst Ledger

function* postGstLedger() {
    yield takeEvery('POST_GST_LEDGER', initiateGstLedgerPosting)
}

function* initiateGstLedgerPosting(action) {
    let { response, error } = yield call(postGstLedgerAPI, action.payload)
    if (response) yield put(savePostedGstLedger(response.data))
}

function postGstLedgerAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post GstData

function* postGstData() {
    yield takeEvery('POST_GST_DATA', initiateGstDataPosting)
}

function* initiateGstDataPosting(action) {
    let { response, error } = yield call(postGstDataAPI, action.payload)
    if (response) yield put(savePostedGstData(response.data))
}

function postGstDataAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post GstData

function* postStockJournal() {
    yield takeEvery('POST_STOCK_JOURNAL', initiateStockJournalPosting)
}

function* initiateStockJournalPosting(action) {
    let { response, error } = yield call(postStockJournalAPI, action.payload)
    if (response) yield put(savePostedStockJournal(response.data))
}

function postStockJournalAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.cid = data.cid
    return axios.post(TALLY_URL + '/xml/dwnl4mS3/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download ledgermaster

function* downloadLedgerMaster() {
    yield takeEvery('DOWNLOAD_POSTED_LEDGER_MASTER', initiateLedgerMasterDownloading)
}

function* initiateLedgerMasterDownloading(action) {
    let { response, error } = yield call(downloadLedgerMasterAPI, action.payload)
    if (response) yield put(saveDownloadPostedLedgerMaster(response.data))
}

function downloadLedgerMasterAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.company_name = data.company_name
    obj.file_type= data.file_type
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download itemmaster

function* downloadItemMaster() {
    yield takeEvery('DOWNLOAD_POSTED_ITEM_MASTER', initiateItemMasterDownloading)
}

function* initiateItemMasterDownloading(action) {
    let { response, error } = yield call(downloadItemMasterAPI, action.payload)
    if (response) yield put(saveDownloadPostedItemMaster(response.data))
}

function downloadItemMasterAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.company_name = data.company_name
    obj.file_type= data.file_type
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download CC

function* downloadCC() {
    yield takeEvery('DOWNLOAD_POSTED_CC', initiateCCDownloading)
}

function* initiateCCDownloading(action) {
    let { response, error } = yield call(downloadCCAPI, action.payload)
    if (response) yield put(saveDownloadPostedCC(response.data))
}

function downloadCCAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.company_name = data.company_name
    obj.file_type= data.file_type
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download bills receivable

function* downloadBillsReceivable() {
    yield takeEvery('DOWNLOAD_POSTED_BILLS_RECEIVABLE', initiateBillsReceivableDownloading)
}

function* initiateBillsReceivableDownloading(action) {
    let { response, error } = yield call(downloadBillsReceivableAPI, action.payload)
    if (response) yield put(saveDownloadPostedBillsReceivable(response.data))
}

function downloadBillsReceivableAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.company_name = data.company_name
    obj.file_type= data.file_type
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download bills payable

function* downloadBillsPayable() {
    yield takeEvery('DOWNLOAD_POSTED_BILLS_PAYABLE', initiateBillsPayableDownloading)
}

function* initiateBillsPayableDownloading(action) {
    let { response, error } = yield call(downloadBillsPayableAPI, action.payload)
    if (response) yield put(saveDownloadPostedBillsPayable(response.data))
}

function downloadBillsPayableAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.company_name = data.company_name
    obj.file_type= data.file_type
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download opening trail bal

function* downloadOpeningTrailBal() {
    yield takeEvery('DOWNLOAD_POSTED_OPENING_TRAIL_BAL', initiateOpeningTrailBalDownloading)
}

function* initiateOpeningTrailBalDownloading(action) {
    let { response, error } = yield call(downloadOpeningTrailBalAPI, action.payload)
    if (response) yield put(saveDownloadPostedOpeningTrailBal(response.data))
}

function downloadOpeningTrailBalAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.company_name = data.company_name
    obj.file_type= data.file_type
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download opening stock

function* downloadOpeningStock() {
    yield takeEvery('DOWNLOAD_POSTED_OPENING_STOCK', initiateOpeningStockDownloading)
}

function* initiateOpeningStockDownloading(action) {
    let { response, error } = yield call(downloadOpeningStockAPI, action.payload)
    if (response) yield put(saveDownloadPostedOpeningStock(response.data))
}

function downloadOpeningStockAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.company_name = data.company_name
    obj.file_type= data.file_type
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download daybook

function* downloadDaybook() {
    yield takeEvery('DOWNLOAD_POSTED_DAYBOOK', initiateDaybookDownloading)
}

function* initiateDaybookDownloading(action) {
    let { response, error } = yield call(downloadDaybookAPI, action.payload)
    if (response) yield put(saveDownloadPostedDaybook(response.data))
}

function downloadDaybookAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.fromdate = data.fromdate
    obj.todate = data.todate
    obj.id = data.id
    return axios.post(TALLY_URL + '/xml/daybkToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download daybook

function* downloadVtype() {
    yield takeEvery('DOWNLOAD_POSTED_VTYPE', initiateVtypeDownloading)
}

function* initiateVtypeDownloading(action) {
    const isvtypeFetched = yield select(getIsVtypePosted);
    if (isvtypeFetched) {
        let { response, error } = yield call(downloadVtypeAPI, action.payload)
        if (response) yield put(saveDownloadPostedVtype(response.data))
    }

}

function downloadVtypeAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.id = data.id
    // obj.company_name = data.company_name
    return axios.post(TALLY_URL + '/xml/vtypeToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download daybook

function* downloadGstLedger() {
    yield takeEvery('DOWNLOAD_POSTED_GST_LEDGER', initiateGstLedgerDownloading)
}

function* initiateGstLedgerDownloading(action) {
    let { response, error } = yield call(downloadGstLedgerAPI, action.payload)
    if (response) yield put(saveDownloadPostedGstLedger(response.data))
}

function downloadGstLedgerAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.id = data.id
    obj.company_name = data.company_name
    return axios.post(TALLY_URL + '/xml/gstToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download daybook

function* downloadGstData() {
    yield takeEvery('DOWNLOAD_POSTED_GST_DATA', initiateGstDataDownloading)
}

function* initiateGstDataDownloading(action) {
    let { response, error } = yield call(downloadGstDataAPI, action.payload)
    if (response) yield put(saveDownloadPostedGstData(response.data))
}

function downloadGstDataAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.id = data.id
    obj.company_name = data.company_name
    return axios.post(TALLY_URL + '/xml/gstdataToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for download Stock-Journal

function* downloadStockJournal() {
    yield takeEvery('DOWNLOAD_POSTED_STOCK_JOURNAL', initiateStockJournalDownloading)
}

function* initiateStockJournalDownloading(action) {
    let { response, error } = yield call(downloadStockJournalAPI, action.payload)
    if (response) yield put(saveDownloadPostedStockJournal(response.data))
}

function downloadStockJournalAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let fileName = data.data
    let obj = {}
    obj.id = data.id
    obj.file_type= data.file_type
    obj.company_name = data.company_name
    return axios.post(TALLY_URL + '/xml/mfileToDb/' + fileName, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for post daybook

function* unsyncPostedFile() {
    yield takeEvery('UNSYNC_POSTED_FILE', initiateUnsyncPosting)
}

function* initiateUnsyncPosting(action) {
    let { response, error } = yield call(unsyncFileAPI, action.payload)
    if (response) yield put(saveUnsyncPostedFileRes(response.data))
}

function unsyncFileAPI(data) {
    data = merge({}, data, userACL.atFetch())
    let id = data.id
    let obj = {}
    obj.file_type = data.file_type
    return axios.post(TALLY_URL + '/xml/UnSync/' + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

const sagaErrorMessage = (error, action) => {
    console.group("Saga Error:" + action.type);
    console.log(error);
    console.groupEnd();
}

export default function* filelist() {
    yield all([
        fetchFileList(),
        startfileDownload(),
        postLedgerMaster(),
        postItemMaster(),
        postCC(),
        postBillsReceivable(),
        postBillsPayable(),
        postOpeningTrailBal(),
        postOpeningStock(),
        postVtype(),
        postDaybook(),
        postStockJournal(),
        postGstLedger(),
        postGstData(),
        downloadLedgerMaster(),
        downloadItemMaster(),
        downloadCC(),
        downloadBillsReceivable(),
        downloadBillsPayable(),
        downloadOpeningTrailBal() ,
        downloadOpeningStock(),
        downloadVtype(),
        downloadDaybook(),
        downloadGstData(),
        downloadGstLedger(),
        unsyncPostedFile(),
        downloadStockJournal(),
    ])
}