
import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { TALLY_URL } from '../../../store/path'
import { clearDBResponse, saveAccountCalledRes, saveAccountRes, saveCCRes, saveDownloadedAccountRes, saveDownloadedExceptionRes, saveDownloadedInvoiceRes, saveExceptionCalledRes, saveExceptionOpeningStockRes, saveExceptionRes, saveIGRes, saveInventoryRes, saveInvoiceCalledRes, saveLGRes, saveOBRes, saveOpeningStockRes, saveStockJournalRes, saveVtypeRes } from "./actions";
import { handlError, parseError } from "../../app/serverError";
import userACL from "../../../store/access";
import { merge } from "lodash";
import axios from "axios";


// LG download region 

function* downloadLG() {
    yield takeEvery('DOWNLOAD_LG', fetchingLGData)
}

function* fetchingLGData(action) {
    const { response, error } = yield call(fetchingLGDataAPI, action.payload)
    if (response) {
        yield put(saveLGRes(response.data))
        yield call(downloadigLGData, response)
    }
}

function fetchingLGDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigLGData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// IG download region 

function* downloadIG() {
    yield takeEvery('DOWNLOAD_IG', fetchingIGData)
}

function* fetchingIGData(action) {
    const { response, error } = yield call(fetchingIGDataAPI, action.payload)
    if (response) {
        yield put(saveIGRes(response.data))
        yield call(downloadigIGData, response)
    }
}

function fetchingIGDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigIGData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// OG download region 

function* downloadOB() {
    yield takeEvery('DOWNLOAD_OB', fetchingOBData)
}

function* fetchingOBData(action) {
    const { response, error } = yield call(fetchingOBDataAPI, action.payload)
    if (response) {
        yield put(saveOBRes(response.data))
        yield call(downloadigOBData, response)
    }
}

function fetchingOBDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigOBData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region


// CC download region 

function* downloadCC() {
    yield takeEvery('DOWNLOAD_CC', fetchingCCData)
}

function* fetchingCCData(action) {
    const { response, error } = yield call(fetchingCCDataAPI, action.payload)
    if (response) {
        yield put(saveCCRes(response.data))
        yield call(downloadigCCData, response)
    }
}

function fetchingCCDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigCCData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

function* downloadOpeningStock() {
    yield takeEvery('DOWNLOAD_OPENING_STOCK', fetchingOpeningStockData)
}

function* fetchingOpeningStockData(action) {
    const { response, error } = yield call(fetchingOpeningStockDataAPI, action.payload)
    if (response) {
        yield put(saveOpeningStockRes(response.data))
        yield call(downloadigOpeningStockData, response)
    }
}

function fetchingOpeningStockDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigOpeningStockData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    // console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// region for stock journal 

function* downloadStockJournal() {
    yield takeEvery('DOWNLOAD_STOCK_JOURNAL', fetchingStockJournalData)
}

function* fetchingStockJournalData(action) {
    const { response, error } = yield call(fetchingStockJournalDataAPI, action.payload)
    if (response) {
        yield put(saveStockJournalRes(response.data))
        yield call(downloadigStockJournalData, response)
    }
}

function fetchingStockJournalDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigStockJournalData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    // console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// region for stock journal 

function* downloadVtype() {
    yield takeEvery('DOWNLOAD_VTYPE', fetchingVtypeData)
}

function* fetchingVtypeData(action) {
    const { response, error } = yield call(fetchingVtypeDataAPI, action.payload)
    if (response) {
        yield put(saveVtypeRes(response.data))
        yield call(downloadigVtypelData, response)
    }
}

function fetchingVtypeDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigVtypelData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    // console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

function* downloadExceptionOpeningStock() {
    yield takeEvery('DOWNLOAD_EXCEPTION_OPENING_STOCK', fetchingExceptionOpeningStockData)
}

function* fetchingExceptionOpeningStockData(action) {
    const { response, error } = yield call(fetchingExceptionOpeningStockDataAPI, action.payload)
    if (response) {
        yield put(saveExceptionOpeningStockRes(response.data))
        yield call(downloadigExceptionOpeningStockData, response)
    }
}

function fetchingExceptionOpeningStockDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/mfiled', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadigExceptionOpeningStockData(response) {
    let filename = response.data.data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    // console.log(response.data.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// region for Account Download region

function* downloadAccount() {
    yield takeEvery('DOWNLOAD_ACCOUNT', fetchingAccData)
}

function* fetchingAccData(action) {
    const { response, error } = yield call(fetchingAccDataAPI, action.payload)
    if (response) {
        yield put(saveAccountRes(response.data))
        yield call(downloadingAccData, response)
    }
}

function fetchingAccDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/accvou', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadingAccData(response) {
    let filename = response.data.dfile
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    // console.log(response.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// inventory download region 

function* downloadInventory() {
    yield takeEvery('DOWNLOAD_INVENTORY', fetchingInventoryData)
}

function* fetchingInventoryData(action) {
    const { response, error } = yield call(fetchingInventoryDataAPI, action.payload)
    if (response) {
        yield put(saveInventoryRes(response.data))
        yield call(downloadingInventoryData, response)
    }
}

function fetchingInventoryDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/invvou', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadingInventoryData(response) {
    let filename = response.data.dfile
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    // console.log(response.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// inventory download region 

function* downloadException() {
    yield takeEvery('DOWNLOAD_EXCEPTION', fetchingExceptionData)
}

function* fetchingExceptionData(action) {
    const { response, error } = yield call(fetchingExceptionDataAPI, action.payload)
    if (response) {
        yield put(saveExceptionRes(response.data))
        yield call(downloadingExceptionData, response)
    }
}

function fetchingExceptionDataAPI(data) {
    return axios.post(TALLY_URL + '/xml/excvou', data, { crossDomain: true })
        .then(response => ({ response }))
}

function downloadingExceptionData(response) {
    let filename = response.data.dfile
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl, '-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            a.download = `${filename}`;
            a.click();
        }
    };
    // console.log(response.data, '--------resp-data')
    xhttp.open("GET", TALLY_URL + '/xml/download-file/' + filename, { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}

// end region

// region for fetch FileList List

function* clearDb() {
    yield takeEvery('CLEAR_DB', requestClearDb)
}

function* requestClearDb(action) {
    let { response, error } = yield call(requestClearDbAPI, action.payload);
    if (response) yield put(clearDBResponse(response.data))

}

function requestClearDbAPI(data) {
    return axios.post(TALLY_URL + "/xml/clear", data, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

export default function* downloadpage() {
    yield all([
        downloadLG(),
        downloadIG(),
        downloadOB(),
        downloadCC(),
        downloadOpeningStock(),
        downloadExceptionOpeningStock(),
        downloadStockJournal(),
        downloadVtype(),
        downloadAccount(),
        downloadInventory(),
        downloadException(),
        clearDb(),
    ])
}