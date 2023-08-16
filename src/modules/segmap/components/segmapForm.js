import React, { useEffect, useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { Button, Container, Form, Grid, Header, Segment, TransitionablePortal } from 'semantic-ui-react'
import { FormikInputComponent } from '../../../utilities/formUtils';
import { getSegmap, getSegmapParams, getNotification, getFetchedCompanyDetails } from '../data/selectors'
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../../../utilities/notificationUtils';
import { setNotifyDone, createSegmap, editSegmap, fetchCompanyDetails, searchSegmap } from '../data/actions';
import { v4 } from 'uuid';
import userACL from '../../../store/access';
import { merge } from 'lodash';
import { segmapSchema } from '../data/model';
import SegmentSearch from './segmentNameSearch'


const SegmapForm = (props) => {

    const segmap = useSelector(state => getSegmap(state, props))
    const params = useSelector(state => getSegmapParams(state, props))
    const data = merge({}, userACL.atFetch())
    const dispatch = useDispatch()

    const [savedSegmapId, setSavedSegmapId] = useState(false)
    const [portal, setPortal] = useState(false)

    const companyDetails = useSelector(state => getFetchedCompanyDetails(state))
    let companyObj = companyDetails ? companyDetails[0] : ""

    useEffect(() => {
        let obj = {}
        obj.cid = data.cid
        if (data) {
            dispatch(fetchCompanyDetails(obj))
        }
    }, [])

    useEffect(() => {
        let values = {}
        values.cid = data.cid
        dispatch(searchSegmap(values))
    }, [])

    // useEffect(() => {
    //     if (document.getElementsByClassName("markedMenuOpt") && document.getElementsByClassName("markedMenuOpt").length) {
    //         if (document.getElementsByClassName("markedMenuOpt")[0].classList) {
    //             document.getElementsByClassName("markedMenuOpt")[0].classList.remove("markedMenuOpt")
    //         }
    //     }
    //     let obj = document.getElementById("segmap");
    //     obj.classList.add("markedMenuOpt");
    // }, [])


    const saveSegmap = (values, resetForm) => {
        if (props.match.path === "/segmap/create") {
            userACL.atCreate(values)
            values.rlbCompanyName = companyObj.company_name
            values.rlbCid = values.cid
            delete values.dt_create
            delete values.dt_update
            delete values.cid
            delete values.segid
            delete values.txnid
            dispatch(createSegmap(values))
            setSavedSegmapId(values.rlbSegid)
        }

        if (props.match.path === "/segmap/edit/:id") {
            userACL.atUpdate(values)
            values.rlbCompanyName = companyObj.company_name
            delete values.dt_create
            delete values.dt_update
            delete values.txnid
            delete values.cid
            delete values.segid
            dispatch(editSegmap(values))
            setSavedSegmapId(values.id)
            setTimeout(function () {
                props.history.push(`/segmap/list`)
            }, 1000)

        }
    }

    return (
        <Container>
        <div className='segmap_cart_container'>
            <Header as='h2'>{params.title}</Header>

            <Grid>
                <Grid.Column width={8}>
                    <Formik size="large" width={8}
                        initialValues={segmap}
                        validationSchema={segmapSchema}
                        onSubmit={(values, { resetForm }) => saveSegmap(values, resetForm)}
                        render={({ values, handleSubmit, errors, resetForm, setFieldValue, onChange, handleChange, handleBlur }) => (

                            <Form as={FormikForm} size='small' className="CustomeForm" onSubmit={handleSubmit} >
                              
                                    <SegmentSearch name='rlbSegmentName' label='RealBooks Segment Name' isMandatory={true} sefFocus={true} placeholder='Select Segment' isLabel={false} isTxn={true} isSelection={true} />
                             

                              
                                    <Field name='companyName' label='Tally Company Name' component={FormikInputComponent} />
                             

                              
                                    <Field name='rlbCompanyGstNo' label='Tally Comapany GST No' component={FormikInputComponent} />
                             

                                <Button type="submit" size="medium" color="blue" floated='right' className="CustomeBTN" >{params.submitButtonText}</Button>

                                {savedSegmapId ?
                                    <Notification id={savedSegmapId} resetForm={resetForm} notifySelector={getNotification} notifyDoneAction={setNotifyDone} type='save' />
                                    :
                                    null}
                            </Form>
                        )}
                    />
                </Grid.Column>
                <Grid.Column width={5} floated="right">
                    <Button
                        size='medium'
                        content={'Guidance For Create Segmap'}
                        basic color='green'
                        style={{ marginLeft: "42px" }}
                        onClick={() => setPortal(!portal)}
                    />
                    <TransitionablePortal
                        open={portal}
                        transition={{ animation: 'scale', duration: 1000 }}
                    >
                        <Segment
                            className="guidance-for-segmap-segment"
                        >
                            <Grid>
                                <Grid.Column>
                                    <Header className='guidanceHeader'>RealBooks Segment Name</Header>
                                    <ul>
                                        <li>Select the RealBooks Company.</li>
                                    </ul>

                                    <Header className='guidanceHeader'>Tally Company Name</Header>
                                    <ul>
                                        <li>Fill the Tally Company Name</li>
                                    </ul>

                                    <Header className='guidanceHeader'>Tally Company GSTIN</Header>
                                    <ul>
                                        <li>Fill the Tally Company GSTIN.</li>
                                    </ul>
                                </Grid.Column>
                            </Grid>
                            <Button floated='right' basic color='red' onClick={() => setPortal(false)} style={{ marginTop: "2%" }} >Close</Button>
                        </Segment>
                    </TransitionablePortal>

                </Grid.Column>
            </Grid>

            </div>
        </Container>

    )
}

export default SegmapForm;