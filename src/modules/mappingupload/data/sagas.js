
import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { TALLY_URL } from '../../../store/path'
import userACL from "../../../store/access";
import { merge } from "lodash";
import axios from "axios";
import { deletedMappingList, updateMappingList, fetchedMappingList, savedSingleMapping, saveSingleMappingRes } from './action';


// region for Add Mapping 

function* addSingleMapping() {
    yield takeEvery('ADD_SINGLE_MAPPING', requestAddMapping)
}

function* requestAddMapping(action) {
    let { response, error } = yield call(requestAddSingleMappingAPI, action.payload);
    if (response) {
        yield put(savedSingleMapping(action.payload, response.data))
        yield put(saveSingleMappingRes(response.data))
    } else {
        console.log(error)
    }
}

async function requestAddSingleMappingAPI(data) {
    try {
        const response = await axios.post(TALLY_URL + "/tallyrlbmap/Add", data, { crossDomain: true })
        return ({ response })
    }
    catch (error) {
        return ({ error })
    }

}

// end region
// region for fetch Mapping Upload List

function* fetchMappingUploadList() {
    yield takeEvery('FETCH_MAPPING_LIST', requestMappingList)
}

function* requestMappingList(action) {
    let { response, error } = yield call(requestMappingListAPI, action.payload);
    if (response) {
        yield put(fetchedMappingList(response.data))
    } else {
        console.log(error)
    }
}

async function requestMappingListAPI(data) {
    let cid = data.cid
    try {
        const response = await axios.post(TALLY_URL + "/tallyrlbmap/List/" + cid, { crossDomain: true })
        return ({ response })
    }
    catch (error) {
        return ({ error })
    }

}

// end region


// region for edit Mapping Upload List

function* editMappingUploadList() {
    yield takeEvery('EDIT_MAPPING_LIST', requestEditMappingList)
}

function* requestEditMappingList(action) {
    let { response, error } = yield call(requestEditMappingListAPI, action.payload);
    if (response) {
        yield put(updateMappingList(action.payload, response.data))
        yield put(saveSingleMappingRes(response.data))
    } else {
        console.log(error)
    }
}

async function requestEditMappingListAPI(data) {
    try {
        const response = await axios.post(TALLY_URL + "/tallyrlbmap/Edit", data, { crossDomain: true })
        return ({ response })
    }
    catch (error) {
        return ({ error })
    }

}

// end region

// region for delte Mapping Upload List

function* deleteMappingUploadList() {
    yield takeEvery('DELETE_MAPPING_LIST', requestDeleteMappingList)
}

function* requestDeleteMappingList(action) {
    let { response, error } = yield call(requestDeleteMappingListAPI, action.payload);
    if (response) {
        yield put(deletedMappingList({ id: action.payload.id, msg: response.data }))
    } else {
        console.log(error)
    }
}

async function requestDeleteMappingListAPI(data) {
    let id = data.id
    try {
        const response = await axios.post(TALLY_URL + "/tallyrlbmap/Del/" + id, { crossDomain: true })
        return ({ response })
    }
    catch (error) {
        return ({ error })
    }

}

// end region

// region for download

function* downloadMappingUpload() {
    yield takeEvery('DOWNLOAD_MAPPING_TEMPLATE', requestDownloadMapping)
}

function* requestDownloadMapping(action) {
    yield call(downloadingMappingData, action.payload);

}


function downloadingMappingData(payload) {
    let data = merge({}, payload, userACL.atFetch())
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var downloadUrl = URL.createObjectURL(xhttp.response);
            // console.log(downloadUrl,'-------downloadurl')
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = TALLY_URL + "/tallyrlbmap/TemplateDownload";
            a.download = `${""}`;
            a.click();
        }
    };

    xhttp.open("GET", TALLY_URL + "/tallyrlbmap/TemplateDownload", { crossDomain: true });
    xhttp.responseType = "blob";
    xhttp.send();
}
// end region

const sagaErrorMessage = (error, action) => {
    console.group("Saga Error:" + action.type);
    console.log(error);
    console.groupEnd();
}

export default function* mappingupload() {
    yield all([
        addSingleMapping(),
        fetchMappingUploadList(),
        editMappingUploadList(),
        deleteMappingUploadList(),
        downloadMappingUpload(),
    ])
}