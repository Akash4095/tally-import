import * as type from './types'

export function fetchMappingList(props) {
    return {
        type: type.FETCH_MAPPING_LIST,
        payload: props,
    }
}

export function fetchedMappingList(props) {
    return {
        type: type.FETCHED_MAPPING_LIST,
        payload: props,
    }
}

export function addSingleMapping(props) {
    return {
        type: type.ADD_SINGLE_MAPPING,
        payload: props,
        txn: 'initiated'
    }
}

export function savedSingleMapping(props,res) {
    return {
        type: type.SAVED_SINGLE_MAPPING,
        payload: props,
        txn: res.type,
        msg: res.msg,
        diff: true
    }
}

export function saveSingleMappingRes(props) {
    return {
        type: type.SAVED_SINGLE_MAPPING_RES,
        payload: props,
    }
}
export function clearSingleMappingRes(props) {
    return {
        type: type.CLEAR_SINGLE_MAPPING_RES,
        payload: props,
    }
}
export function editMappingList(props) {
    return {
        type: type.EDIT_MAPPING_LIST,
        payload: props,
        txn: 'initiated'
    }
}

export function updateMappingList(props, res) {
    return {
        type: type.UPDATE_MAPPING_LIST,
        payload: props,
        txn: res.type,
        msg: res.msg,
        diff: true
    }
}
export function deleteMappingList(props) {
    return {
        type: type.DELETE_MAPPING_LIST,
        payload: props,
    }
}

export function deletedMappingList(props) {
    return {
        type: type.DELETED_MAPPING_LIST,
        payload: props,
    }
}

export function downloadMappingTemplate(props) {
    return {
        type: type.DOWNLOAD_MAPPING_TEMPLATE,
        payload: props,
    }
}

export function setNotifyDone(props) {
    return {
        type: type.NOTIFICATION_DONE_MAPPING_LIST,
        payload: props
    }
}