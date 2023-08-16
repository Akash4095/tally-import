import * as type from './types'

export function createSegmap(props) {
    return {
        type: type.CREATE_SEGMAP,
        payload: props,
        txn: 'initiated'
    };
}

export function savedSegmap(props, res) {
    return {
        type: type.SAVED_SEGMAP,
        payload: props,
        txn: res.type,
        msg: res.msg,
        diff: true
    }
}

export function editSegmap(props) {
    return {
        type: type.EDIT_SEGMAP,
        payload: props,
        txn: 'initiated'
    }
}

export function updateSegmap(props, res) {
    return {
        type: type.UPDATE_SEGMAP,
        payload: props,
        txn: res.type,
        msg: res.msg,
        diff: true
    }
}

export function clearSaved(props) {
    return {
        type: type.CLEAR_SAVED,
        payload: props,
    }
}

export function fetchSegmap(props) {
    return {
        type: type.FETCH_SEGMAP,
        payload: props,
    }
}

export function fetchedSegmap(props) {
    return {
        type: type.FETCHED_SEGMAP,
        payload: props,
    }
}

export function deleteSegmap(props) {
    return {
        type: type.DELETE_SEGMAP,
        payload: props
    }
}

export function deletedSegmap(msg) {
    return {
        type: type.DELETED_SEGMAP,
        payload: msg
    }
}

export function setNotifyDone(props){
    return {
        type: type.NOTIFICATION_DONE_SEGMAP,
        payload:props
    }
}

export function searchSegmap(props) {
    return {
        type: type.SEARCH_SEGMAP,
        payload: props
    }
}

export function storeSearchedSegmap(props) {
    return {
        type: type.STORE_SEARCHED_SEGMAP,
        payload: props
    }
}

export function fetchCompanyDetails(props) {
    return {
        type: type.SEARCH_COMPANY_DETAILS,
        payload: props
    }
}

export function storeFetchedCompanyDetails(props) {
    return {
        type: type.STORE_SEARCHED_COMPANY_DETAILS,
        payload: props
    }
}