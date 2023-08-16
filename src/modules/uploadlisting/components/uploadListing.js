import React, { useEffect, useState } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import {
    Container,
    Header,
    Form,
    Button,
    Grid,
    Dimmer,
    Loader,
    Image,
    Segment,
    Input,
    Icon,
    Select,
    Modal,
} from "semantic-ui-react";
import userACL from "../../../store/access";
import DragDrop from "./dragDropFile";
import { merge } from "lodash";
import { FormikInputComponent } from "../../../utilities/formUtils";

const UploadListingForm = (props) => {
    const [selectFileMsg, setSelectFileMsg] = useState("");
    const [isWaiting, setWaiting] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [displayStatus, setDisplayStatus] = useState(false);
    const [releaseModal, setReleaseModal] = useState(false);
    const [releaseName, setReleaseName] = useState("");
    const [keyName, setKeyName] = useState("");

    let initialVal = { releasename: "", key:"" };

    const saveReleseName = (values, value, setFieldValue) => {
        setReleaseName(value)
    };
    const saveKeyFunc =(values, value, setFieldValue)=>{
        setKeyName(value)
    }
    const saveVtype = () => {

    }
    return (
        <Container>
            <Container>
                <Formik
                    initialValues={initialVal}
                    validationSchema={null}
                    onSubmit={(values, { resetForm }) => saveVtype(values, resetForm)}
                    render={({
                        handleSubmit,
                        errors,
                        onChange,
                        values,
                        handleChange,
                        setFieldValue,
                    }) => (
                        <Form
                            as={FormikForm}
                            onSubmit={handleSubmit}
                            className="CustomeForm"
                        >
                            <div style={{ width: "36%", marginLeft: "32%" }}>
                                <Field
                                    name="releasename"
                                    label="Realese Name"
                                    component={FormikInputComponent}
                                    isMandatory={true}
                                    onChangeFunc={saveReleseName}
                                />
                            </div>
                            <div style={{ width: "36%", marginLeft: "32%" }}>
                                <Field name='key' component={FormikInputComponent} label='Access Key' isMandatory={true} onChangeFunc={saveKeyFunc} />
                            </div>
                        </Form>
                    )}
                />
            </Container>
            <Grid columns="equal">
                <Grid.Row verticalAlign="middle">
                    <Grid.Column width={5}></Grid.Column>
                    <Grid.Column width={6}>
                        <br />
                        <Segment placeholder padded="very" color="blue" raised>
                            <Header icon>
                                <Icon name="file outline" color="green" />
                                <br />
                                {selectFileMsg}
                            </Header>
                            <br />
                            <DragDrop
                                setWaiting={setWaiting}
                                setSelectFileMsg={setSelectFileMsg}
                                setDisplayStatus={setDisplayStatus}
                                setFileUploaded={setFileUploaded}
                                releaseName={releaseName}
                                keyName={keyName}
                                setReleaseModal={setReleaseModal}
                            />
                            <br />
                            <br />
                            <br />

                            {isWaiting ? (
                                <Dimmer active inverted>
                                    <Loader indeterminate>Processing File</Loader>{" "}
                                </Dimmer>
                            ) : null}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5}></Grid.Column>
                </Grid.Row>
            </Grid>
            <Modal open={releaseModal} size="mini">
                <Modal.Header>Error</Modal.Header>
                <Modal.Content>
                    <h4>Realese Name/Access Key Cannot be blank</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="button" negative onClick={() => setReleaseModal(false)}>Ok</Button>
                </Modal.Actions>
            </Modal>
        </Container>
    );
};

export default UploadListingForm;
