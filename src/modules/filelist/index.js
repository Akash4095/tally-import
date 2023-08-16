import React from 'react'
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import FileList from './components/fileList';

const FileListIndex = () => {
    return (
        <Container>
            <Route path='/filelist/list' component={withRouter(FileList)} />
        </Container>
    )
}

export default FileListIndex;