import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { TALLY_URL } from '../../../store/path'
import { savedSegmap, deletedSegmap, fetchedSegmap, storeSearchedSegmap, storeFetchedCompanyDetails, updateSegmap } from "./actions";
import { getIsSegmapFetched } from './selectors'
import { handlError, parseError } from "../../app/serverError";
import userACL from "../../../store/access";
import { merge } from "lodash";
import axios from "axios";



// region for create lead source

function* createSegmap() {
    yield takeEvery('CREATE_SEGMAP', saveSegmap);
}

function* saveSegmap(action) {
    const { response, error } = yield call(saveSegmapAPI, action.payload)
    if (response) yield put(savedSegmap(action.payload, response.data))
    else {
        yield put(handlError(action, parseError(error)))
        sagaErrorMessage(error, action)
    }
}

function saveSegmapAPI(data) {
    return axios.post(TALLY_URL + "/mapping/segMap", data)
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

// End region


function* editSegmap() {
    yield takeEvery('EDIT_SEGMAP', saveEditedSegmap)
}

function* saveEditedSegmap(action) {
    const { response, error } = yield call(editSegmapAPI, action.payload)
    if (response) yield put(updateSegmap(action.payload, response.data))
    else {
        yield put(handlError(action, parseError(error)));
        sagaErrorMessage(error.action);
    }
}

function editSegmapAPI(data) {
    let id = data.id;
    return axios.post(TALLY_URL + "/mapping/segMapUpdate/" + id, data, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

//#end region

// region for delete lead source

function* deleteSegmap() {
    yield takeEvery('DELETE_SEGMAP', saveDeletedSegmap)
}

function* saveDeletedSegmap(action) {
    const { response, error } = yield call(deleteSegmapAPI, action.payload)
    // console.log(response,'------response')
    // console.log(action.payload,'-------acp-delete')
    if (response) yield put(deletedSegmap({ id: action.payload.id, msg: response.data }));
    else {
        yield put(handlError(action, parseError(error)));
        sagaErrorMessage(error, action)
    }
}

function deleteSegmapAPI(data) {
    let id = data.id
    let obj = {}
    obj.uid_update = data.uid_update
    return axios.post(TALLY_URL + "/mapping/segMapDelete/" + id, obj, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for fetch Segmap

function* fetchSegmap() {
    yield takeEvery('FETCH_SEGMAP', requestSegmap)
}

function* requestSegmap(action) {
    const isSegmapFetched = yield select(getIsSegmapFetched)
    let { response, error } = yield call(requestSegmapAPI, action.payload);
    if (response) yield put(fetchedSegmap(response.data))
}

function requestSegmapAPI(data) {
    return axios.post(TALLY_URL + "/mapping/segMaplist", data, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

// end region

// region for searchSegment

function* searchSegment() {
    yield takeEvery('SEARCH_SEGMAP', initiateSegmapSearch)
}

function* initiateSegmapSearch(action) {
    let { response, error } = yield call(searchSegmapdetails, action.payload)
    if (response) {
        yield put(storeSearchedSegmap(response.data))
    } else {
        yield put(storeSearchedSegmap({}))
    }
}

function searchSegmapdetails(data) {
    return axios.post(TALLY_URL + '/mapping/rlbSegDtls', data, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

/// end region

// region for search CompanyDetails

function* searchCompanyDetails() {
    yield takeEvery('SEARCH_COMPANY_DETAILS', initiateCompanySearch)
}

function* initiateCompanySearch(action) {
    let { response, error } = yield call(searchCompanydetails, action.payload)
    if (response) {
        yield put(storeFetchedCompanyDetails(response.data))
    } else {
        yield put(storeFetchedCompanyDetails({}))
    }
}

function searchCompanydetails(data) {
    return axios.post(TALLY_URL + '/mapping/companyInfo', data, { crossDomain: true })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

/// end region

const sagaErrorMessage = (error, action) => {
    console.group("Saga Error:" + action.type);
    console.log(error);
    console.groupEnd();
}

export default function* segmap() {
    yield all([
        createSegmap(),
        editSegmap(),
        fetchSegmap(),
        deleteSegmap(),
        searchSegment(),
        searchCompanyDetails(),
    ])
}

