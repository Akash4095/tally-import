import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Header, Form, Button, Grid, Dimmer, Loader, Image, Segment, Input, Icon, Select } from 'semantic-ui-react';
import { TALLY_URL } from '../../../store/path'
import { post } from "axios";
import userACL from '../../../store/access';
import { merge } from 'lodash';
import DragDrop from './dragDropXml';


const UploadDataForm = (props) => {

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

    // const onFormSubmit = e => {
    //     e.preventDefault(); // Stop form submit
    //     let nameFile = fileName.replace(/\./g, ';'),
    //         extention = nameFile.split(";")[1]
    //     // console.log("extention========="+extention)
    //     // console.log("nameFile========="+nameFile)

    //     if (extention.toString().toLowerCase() === "xml") {
    //         if (fileObj != null) {
    //             fileUpload().then(response => {
    //                 props.setUploadType(fileType)
    //                 if (response) {
    //                     setWaiting(false)
    //                     if (response.data.hello == "error") {
    //                         // console.log('error=========')
    //                         setResultColor("red")
    //                         setResult(fileName + " : Uploaded with errors!")
    //                     }
    //                     else
    //                         setResult(fileName + " : Successfully Uploaded!")
    //                     props.setDisplayStatus(false)
    //                     props.setFileUploaded(true)
    //                     resetForm()
    //                 }
    //             });
    //             setWaiting(true)
    //         }
    //         else {
    //             console.log("Cannot upload")
    //             setResult("Error in Uploading, try again!")
    //         }
    //     } else {
    //         console.log("Cannot upload")
    //         setResultColor("red")
    //         setResult("Only XML file allowed to upload")
    //     }

    // };


    // const fileChange = e => {
    //     // console.log("File chosen --->", e.target.files[0].name);
    //     setFileObj(e.target.files[0])
    //     setFileName(e.target.files[0].name)
    //     setFileSelectColor("white")
    //     setSubmitDisabled(false)
    //     setResult('')
    // };

    // const resetForm = () => {
    //     setFileObj('')
    //     setFileName('')
    //     setFileSelectColor("blue")
    //     setSubmitDisabled(true)
    // };


    // const fileUpload = () => {
    //     const url = TALLY_URL + "/xml/file-upload";
    //     const formData = new FormData();
    //     let obj = {}
    //     obj.cid = data.cid
    //     obj.segid = data.segid
    //     obj.file_type = fileType
    //     let jsonObj = JSON.stringify(obj)
    //     formData.append("file", fileObj);
    //     formData.append("payload", jsonObj);
    //     const config = { crossDomain: true, headers: { 'Content-Type': 'application/json' } };
    //     return post(url, formData, config);
    // };


    // useEffect(() => {
    //     if (props.ledgerMasterBtn) {
    //         setFileType("ledger_master")
    //         setSelectFileMsg(" Please Upload Files (.xml)")

    //     }
    //     if (props.itemMasterBtn) {
    //         setFileType("item_master")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.ccBtn) {
    //         setFileType("cc_master")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.billsReceivableBtn) {
    //         setFileType("bills_receivable")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.billsPayableBtn) {
    //         setFileType("bills_payable")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.openingStockBtn) {
    //         setFileType("opening_stock")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.daybookBtn) {
    //         setFileType("daybook")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.vtypeBtn) {
    //         setFileType("vtypes")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.gstDataBtn) {
    //         setFileType("gst_data")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    //     if (props.stockJournalBtn) {
    //         setFileType("stck_jr")
    //         setSelectFileMsg(" Please Upload Files (.xml)")
    //     }
    // }, [props.ledgerMasterBtn, props.itemMasterBtn, props.ccBtn, props.billsReceivableBtn, props.billsPayableBtn, props.openingStockBtn, props.daybookBtn, props.vtypeBtn, props.gstDataBtn, props.stockJournalBtn])



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
                                ledgerMasterBtn={props.ledgerMasterBtn} itemMasterBtn={props.itemMasterBtn}
                                ccBtn={props.ccBtn} billsReceivableBtn={props.billsReceivableBtn} billsPayableBtn={props.billsPayableBtn}
                                openingStockBtn={props.openingStockBtn} daybookBtn={props.daybookBtn} vtypeBtn={props.vtypeBtn}
                                gstDataBtn={props.gstDataBtn} stockJournalBtn={props.stockJournalBtn}
                            />
                            <br />
                            <br />
                            <br />
                            {/* <Form onSubmit={onFormSubmit}>
                                
                                <Form.Field>
                                    {submitDisabled
                                        ? <Button as="label" htmlFor="file" type="button" size="large" style={{ color: "white" }} color={fileSelectColor}>
                                            Select File
                                        </Button>
                                        : <Button as="label" htmlFor="file" type="button" size="large" style={{ color: "black" }} color={fileSelectColor}>
                                            Select File
                                        </Button>
                                    }
                                    <Input type="file" id="file" style={{ display: "none" }} onChange={fileChange} />
                                    <p style={{ textAlign: 'center', paddingTop: "5px" }}>{fileName}</p>
                                  
                                </Form.Field>
                                <br />
                                {(submitDisabled)
                                    ? <Button type="submit" size="large" color="gray" disabled >Upload</Button>
                                    : <Button type="submit" size="large" color="blue" >Upload</Button>
                                }
                            </Form> */}
                            {isWaiting
                                ? <Dimmer active inverted> <Loader indeterminate>Processing File</Loader> </Dimmer>
                                : null
                            }
                            {/* <p style={{ textAlign: 'center', paddingTop: "5px", color: `${resultColor}` }}>{result}</p> */}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};

export default UploadDataForm;