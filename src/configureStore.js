import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga';
import { merge, throttle } from 'lodash';
import monitorReducersEnhancer from './store/monitorReducers'
import loggerMiddleware from './store/logger'
import { txnMiddleware } from './store/txnMiddleware' //logActionDiff
import { loadState, saveState } from './store/localStorage';
import rootSaga from './store/sagas'
import rootReducer from './reducers'
import userACL from './store/access'
import { fetchCompanyDetails, fetchSegmap } from './modules/segmap/data/actions';
import { fetchRlbVtype } from './modules/rlbvtype/data/actions';
import { fetchRlbCostCenter } from './modules/rlbcc/data/actions';
import { fetchRlbLedger } from './modules/rlbledger/data/actions';
import { fetchRlbItem } from './modules/rlbitem/data/actions';




const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory({
  basename: '/tallyimport/',
});

// export const history = createBrowserHistory();
export default function configureAppStore() {

  const preloadedState = loadState();

  const store = configureStore({
    reducer: rootReducer(history),
    middleware: [sagaMiddleware,txnMiddleware,loggerMiddleware,routerMiddleware(history), ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer(history)))
  }  

  sagaMiddleware.run(rootSaga)

  store.subscribe(throttle(() => {
    saveState({
      // loginDetails : store.getState().loginDetails,
      // messagesById: store.getState().messagesById,
      // messagesPrimary : store.getState().messagesPrimary
    });
  }), 1000);
  paramsSet(history.location.search)
  console.log('history.location.search', history.location.search)
  // store.dispatch(fetchCompanyDetails());
  // store.dispatch(fetchSegmap())
  // store.dispatch(fetchRlbVtype())
  // store.dispatch(fetchRlbCostCenter())
  // store.dispatch(fetchRlbLedger())
  // store.dispatch(fetchRlbItem())

  return store
}

const paramsSet = (searchStr)=>{
  // searchStr = "?type=&vpdtFrm=01-04-2019&vpdtTo=31-03-2020&cid=5706&branchid=5077&uId=4335&reqFromUrl=null&extraParam=&vpid=5443&domain=Erison"
  let searchStrArr = searchStr.split("&"),
    type="",
    vpdtFrm="",
    vpdtTo = "",
    cid = 0,
    segid = 0,
    uid = 0,
    vpid = 0,
    domain="";
    console.log("searchStrArr==",searchStrArr)
    if(searchStrArr.length>0){
      searchStrArr.map((obj,i) => {
        console.log(obj.indexOf("uId") > -1)
          if(obj.indexOf("type") > -1){
              type = obj.split("=")[1];
          }else if(obj.indexOf("vpdtFrm") > -1){
              vpdtFrm = obj.split("=")[1];
          }else if(obj.indexOf("vpdtTo") > -1){
              vpdtTo = obj.split("=")[1];
          }else if(obj.indexOf("cid") > -1){
              cid = obj.split("=")[1];
          }else if(obj.indexOf("branchid") > -1){
              segid = obj.split("=")[1];
          }else if(obj.indexOf("uId") > -1){
            console.log("uid")
              uid = obj.split("=")[1];
          }else if(obj.indexOf("vpid") > -1){
              vpid = obj.split("=")[1];
          }else if(obj.indexOf("domain") > -1){
              domain = obj.split("=")[1].replace("%20", " ");
          }
      })
      // console.log("uid=="+uid)
    }
  userACL.init({
    domain: 'DEMOTEST',
    cid: "13799",
    segid: "13800",
    uid: "3263",
    fromdt: '01-04-2021',
    todt: '31-03-2023',
    // domain: 'DEMOTEST',
    // cid: "13799",
    // segid: "13800",
    // uid: "3263",
    // fromdt: '01-04-2021',
    // todt: '31-03-2022',
    // domain: 'competent',
    // cid: "9025",
    // segid: "9051",
    // uid: "6522",
    // fromdt: '01-04-2021',
    // todt: '31-03-2022'
    // domain: 'cacl',
    // cid: "5312",
    // segid: "5312",
    // uid: "1",
    // fromdt: '01-04-2019',
    // todt: '31-03-2020'
    // domain: 'apichk',
    // cid: "1",
    // segid: "1",
    // uid: "1",
    // fromdt: '01-04-2020',
    // todt: '31-03-2021'
    // domain,
    // cid,
    // segid,
    // uid,
    // fromdt: vpdtFrm,
    // todt: vpdtTo
  });
}


