import { call, takeEvery, takeLatest, delay, all, put, select } from 'redux-saga/effects'
import { fetchedUploadData } from './actions'
import { handlError, parseError } from '../../app/serverError'
import { TALLY_URL, } from '../../../store/path'
import axios from 'axios';


function* fetchData() {
    yield takeEvery('FETCH_UPLOAD_DATA', fetchingData)
}

function* fetchingData(action) {
    const { response, error } = yield call(fetchingDataAPI, action.payload)
    if (response) {
        yield put(fetchedUploadData(action.payload))
        yield call(uploadingData, response)
    }
}

function fetchingDataAPI(data) {
    return axios.post(TALLY_URL + '/report/dms-txns/upload', data, { crossDomain: true, responseType: 'blob' })
        .then(response => ({ response }))
}

function uploadingData(response) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var uploadUrl = URL.createObjectURL(xhttp.response);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = uploadUrl;
            a.upload = "file.xlsx";
            a.click();
        }
    };
    xhttp.open("GET", TALLY_URL + '/report/dms-txns/upload-file/' + response.data, true);
    xhttp.setRequestHeader('X-RLB-DMS-ACC', localStorage.getItem('acc'));
    xhttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('user')}`);
    xhttp.responseType = "blob";
    xhttp.send();
}

const sagaErrorMessage = (error, action) => {
    console.group("Saga Error:" + action.type)
    console.log(error)
    console.groupEnd()
}

export default function* dataUpload() {
    yield all([
        fetchData()
    ])
}  