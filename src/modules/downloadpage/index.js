import React from 'react';
import { Route, withRouter } from 'react-router';
import DownloadDataForm from "./components/downloadDataForm";


const DownloadPage = () => {
    return (
        <>
            <Route path="/downloadpage" component={withRouter(DownloadDataForm)} />
        </>
    )
};

export default DownloadPage;

