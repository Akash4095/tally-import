import moment from "moment"
import { createSelector } from "reselect"
import { mapping } from "./model"



export const getMapping = (state, props) => {
    return mapping()
}
export const getIsFetchingMappingUpload = (state, props) => state.mappingupload.params.isFetching
export const getIsMappingUploadFetched = (state, props) => state.mappingupload.params.mappingUploadFetched
export const getMappingUploadList = (state, props) => state.mappingupload.byId
export const getSaveResponse = (state, props) => state.mappingupload.savedSingleMappingRes
export const getNotification = (state, id) => state.mappingupload.notifications[id]

export const getFileListList = (state, props) => state.filelist.byId


export const getFilteredMappingList = createSelector(
    getMappingUploadList,
    (mapping) => {
        let filteredMp = Object.keys(mapping).map(function (key) {
            return mapping[key];
        })
        return filteredMp;
    }
)

export const getFilteredFileList = createSelector(
    getFileListList,
    (filelist) => {
        let ccmaster = Object.values(filelist).filter((obj) => obj.file_type === "tallyrlbmap")
        let sortedArr = ccmaster.sort((a, b) => { return moment(b.dt_create) - moment(a.dt_create) })
        return sortedArr
    }
)