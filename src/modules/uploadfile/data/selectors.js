
import { startsWith, cloneDeep } from 'lodash';


export const getIsUploadDataFetched = (state, props) => state.dataUpload.params.datafetched;


export const getFileuploadParams = (state, props) => {
    const params =  {}

    if(startsWith(state.router.location.pathname,'/fileupload/create')){ 
        params.title = state.fileupload.params.createTitle
        params.submitButtonText = state.fileupload.params.createSubmitButtonText        
    };

    return params
}