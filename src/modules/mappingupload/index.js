import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import MappingList from "./components/mappingList"

const MappingUpload = () => {
    return (
        <Container>
            <Route path='/mapping' component={withRouter(MappingList)} />
        </Container>
    )
}

export default MappingUpload