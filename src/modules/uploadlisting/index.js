import React from 'react';
import { Route, withRouter } from 'react-router';
import UploadListingForm from "./components/uploadListing";


const UploadListing = () => {
    return (
        <>
            <Route path="/exe/exes3upload" component={withRouter(UploadListingForm)} />
        </>
    )
};

export default UploadListing;

