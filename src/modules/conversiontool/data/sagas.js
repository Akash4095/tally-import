import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { TALLY_URL } from '../../../store/path'
import {  downloadedConversionToolList, fetchedConversionToolList } from "./actions";
import { handlError, parseError } from "../../app/serverError";
import userACL from "../../../store/access";
import { merge } from "lodash";
import axios from "axios";


// region for fetch Rlb CostCenter List

function* fetchConversionTool() {
  yield takeEvery('FETCH_CONVERSION_TOOL_LISTING', requestConversionTool)
}

function* requestConversionTool(action) {
    let { response, error } = yield call(requestConversionToolAPI, action.payload);
    if (response) yield put(fetchedConversionToolList(response.data))
}

async function requestConversionToolAPI(data) {
  try {
        const response = await axios.post(TALLY_URL + "/exe/exelist", data, { crossDomain: true });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// end region

// region for download

function* downloadConversionTool() {
  yield takeEvery('DOWNLOAD_CONVERSION_TOOL', requestDownloadConversionTool)
}

function* requestDownloadConversionTool(action) {
    yield call(downloadingData, action.payload);
    
}


function downloadingData(payload) {
  let data = merge({}, payload, userACL.atFetch())
  let uid = data.uid
  let id = payload.vname
  let filename = payload.vname
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var downloadUrl = URL.createObjectURL(xhttp.response);
          // console.log(downloadUrl,'-------downloadurl')
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = TALLY_URL + "/exe/exes3download/" + id + "/" + uid;
          a.download = `${""}`;
          a.click();
      }
  };

  xhttp.open("GET", TALLY_URL + "/exe/exes3download/" + id + "/" + uid, { crossDomain: true });
  xhttp.responseType = "blob";
  xhttp.send();
}
// end region


const sagaErrorMessage = (error, action) => {
  console.group("Saga Error:" + action.type);
  console.log(error);
  console.groupEnd();
}

export default function* conversiontool() {
  yield all([
    fetchConversionTool(),
    downloadConversionTool(),
  ])
}