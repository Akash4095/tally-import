import * as type from './types'

export function fetchUploadData(data) {
    return {
        type : type.FETCH_UPLOAD_DATA,
        payload : data
    };
}

export function fetchedUploadData() {
    return {
        type : type.FETCHED_UPLOAD_DATA,
    };
}