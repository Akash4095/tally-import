import React from 'react';
import { Route, withRouter } from 'react-router';
import UploadFileForm from "./components/uploadXml";


const UploadFile = () => {
    return (
        <>
            <Route path="/uploadfile" component={withRouter(UploadFileForm)} />
        </>
    )
};

export default UploadFile;

