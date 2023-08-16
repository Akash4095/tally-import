import { startsWith, cloneDeep } from 'lodash'
import { segmap } from './model'
import { createSelector } from 'reselect'

export const getIsFetchingSegmap = (state, props) => state.segmap.params.isFetching
export const getIsSegmapFetched = (state, props) => state.segmap.params.segmapFetched
export const getIsSaved = (state, props) => state.segmap.params.isSaved
export const getIsCompanyFetched = (state, props) => state.segmap.params.companyFetched
export const getSearchSegmentResults = (state, props) => state.segmap.storeSearchedSegmap
export const getFetchedCompanyDetails = (state, props) => state.segmap.storeFetchedCompanyDetails
export const getSegmapList = (state, props) => state.segmap.byId
export const getSegmapListing = (state, props) => state.segmap.segmapListing
export const getNotification = (state, id) => state.segmap.notifications[id]

export const getSegmap = (state, props) => {
    if (props.match.path === '/segmap/create') {
        return segmap()
    }
    if (props.match.path === '/segmap/edit/:id') {
        let _id = props.match.params.id
        let obj = cloneDeep(state.segmap.byId[_id]);
        // console.log(obj,'=======edit-obj')
        return obj
    }
}

export const getSegmapParams = (state, props) => {
    const params = {}

    if (startsWith(state.router.location.pathname, '/segmap/create')) {
        params.title = state.segmap.params.createTitle
        params.submitButtonText = state.segmap.params.createSubmitButtonText
    }
    if (startsWith(state.router.location.pathname, '/segmap/edit')) {
        params.title = state.segmap.params.editTitle
        params.submitButtonText = state.segmap.params.editSubmitButtonText
    };

    return params
}

export const getFilteredSegmap = createSelector(
    getSegmapList,
    (segmap) => {
        let filteredSegmap = Object.keys(segmap).map(function (key) {
            return segmap[key];
        })
        return filteredSegmap;
    }
)

export const selectSegment = createSelector(
    getSearchSegmentResults,
    segmap => {
        const keys = Object.keys(segmap)
        const obj = keys.map((key) => { return { key: segmap[key].segid, value: segmap[key].name, text: segmap[key].name } })
        return obj

    })

    export const selectCompanyName = (state, props) => {
        const company = state.segmap.byId
        const keys = Object.keys(company)
        const obj = keys.map((key) => {
            return { key: key, value: company[key].companyName, text: company[key].companyName, rlbSegid: company[key].rlbSegid, rlbCid: company[key].rlbCid  }
        });
        return obj
    
    }