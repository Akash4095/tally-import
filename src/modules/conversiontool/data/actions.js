import * as type from './types'

export function fetchConversionToolList(props) {
    return {
        type: type.FETCH_CONVERSION_TOOL_LISTING,
        payload: props,
    }
}

export function fetchedConversionToolList(props) {
    return {
        type: type.FETCHED_CONVERSION_TOOL_LISTING,
        payload: props,
    }
}

export function downloadConversionToolList(props) {
    return {
        type: type.DOWNLOAD_CONVERSION_TOOL,
        payload: props,
    }
}

export function downloadedConversionToolList(props) {
    return {
        type: type.DOWNLOADED_CONVERSION_TOOL,
        payload: props,
    }
}