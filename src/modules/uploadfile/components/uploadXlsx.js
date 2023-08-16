import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Header, Form, Button, Grid, Dimmer, Loader, Image, Segment, Input, Icon, Select } from 'semantic-ui-react';
import { TALLY_URL } from '../../../store/path'
import { post } from "axios";
import userACL from '../../../store/access';
import { merge } from 'lodash';
import DragDrop from './dragDropXlsx';


const UploadXlsxFile = (props) => {

    const [fileObj, setFileObj] = useState();
    const [fileType, setFileType] = useState('');
    const [selectFileMsg, setSelectFileMsg] = useState('');
    const [fileName, setFileName] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [fileSelectColor, setFileSelectColor] = useState("blue");
    const [isWaiting, setWaiting] = useState(false);
    const [result, setResult] = useState("");
    const [resultColor, setResultColor] = useState("green");
    let data = merge({}, userACL.atFetch())



    return (
        <Container >
            <Grid columns='equal'>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column width={5}>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <br /><br />
                        <Segment placeholder padded='very' color="blue" raised >
                            <Header icon>
                                <Icon name='file outline' color='green' />
                                <br />
                                {selectFileMsg}
                            </Header>
                            <br />
                            <DragDrop
                                setWaiting={setWaiting}
                                setSelectFileMsg={setSelectFileMsg}
                                setDisplayStatus={props.setDisplayStatus}
                                setFileUploaded={props.setFileUploaded}
                                setUploadType={props.setUploadType}
                                gstLedgerBtn={props.gstLedgerBtn} openingTrailBalBtn={props.openingTrailBalBtn}
                             
                            />
                            <br />
                            <br />
                            <br />

                         
                            {isWaiting
                                ? <Dimmer active inverted> <Loader indeterminate>Processing File</Loader> </Dimmer>
                                : null
                            }
                    
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};

export default UploadXlsxFile;