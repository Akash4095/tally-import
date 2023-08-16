import React from 'react';
import { Route, withRouter } from 'react-router';
import ConversionToolList from "./components/conversionToolList";


const ConversionToolListing = () => {
    return (
        <>
            <Route path="/conversiontool" component={withRouter(ConversionToolList)} />
        </>
    )
};

export default ConversionToolListing;

