import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../../configureStore'
import { menu } from './menu'
import userACL from '../../store/access';

import 'semantic-ui-less/semantic.less'
import { Container, Dropdown, Menu, Image, Icon } from 'semantic-ui-react'

// import "bootstrap/dist/css/bootstrap.min.css";
import homelogo from "./rlb.png";
import crashCar from "../app/18_car-accident-r-256.png"
import Segmap from '../segmap/index';
import FileList from '../filelist/index';
import UploadFile from '../uploadfile/index';
import DownloadPage from '../downloadpage/index';
import UploadListing from '../uploadlisting/index';
import ConversionToolListing from '../conversiontool/index';
import Sidebar from './sidebar';
import MappingUpload from '../mappingupload/index';
import { ToastContainer } from 'react-toastify';




const App = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <Container className="paddingTopOnl">
      {
          userACL.atFetch().cid == 0 ? 
          <center>
            <div style={{paddingTop: '150px', color: 'red', fontSize: '25px'}}>Please check the configuration, Company not configured in Tally Import</div>
            <br/><br/><br/>
            <Image src={crashCar} width="256" height="256" />
          </center>  
        :

        <>
          <Sidebar>
            <Route path="/segmap" component={Segmap} />
            <Route path="/uploadfile" component={UploadFile} />
            <Route path="/filelist" component={FileList} />
            <Route path="/downloadpage" component={DownloadPage} />
            <Route path="/conversiontool" component={ConversionToolListing} />
            <Route path="/exe/exes3upload" component={UploadListing} />
            <Route path="/mapping" component={MappingUpload} />
          </Sidebar>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            closeOnClick
            pauseOnHover
            hideProgressBar={false}
          />
        </>
      }
      </Container>
    </ConnectedRouter>
  </Provider>
);

export default App;

