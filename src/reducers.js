import { txns } from './store/txnMiddleware'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import segmap from "./modules/segmap/data/reducers"
import filelist from "./modules/filelist/data/reducers"
import dataUpload from "./modules/uploadfile/data/reducers"
import downloadpage from "./modules/downloadpage/data/reducers"
import conversiontool from "./modules/conversiontool/data/reducers"
import mappingupload from "./modules/mappingupload/data/reducers"



const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    txns,
    segmap,
    dataUpload,
    filelist,
    downloadpage,
    conversiontool,
    mappingupload,
   
})

export default rootReducer