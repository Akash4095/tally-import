import { all } from 'redux-saga/effects'
import segmap from "../modules/segmap/data/sagas"
import filelist from "../modules/filelist/data/sagas"
import dataUpload from "../modules/uploadfile/data/sagas"
import downloadpage from "../modules/downloadpage/data/sagas"
import conversiontool from "../modules/conversiontool/data/sagas"
import mappingupload from "../modules/mappingupload/data/sagas"




export default function* rootSaga() {
  yield all([
    segmap(),
    dataUpload(),
    filelist(),
    downloadpage(),
    conversiontool(),
    mappingupload(),
  ])
} 