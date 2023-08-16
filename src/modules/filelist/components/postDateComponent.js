import React from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { Button, Container, Form, Header, Modal } from 'semantic-ui-react'
import { FormikCheckBoxComponent, FormikDateComponent, FormikInputComponent } from '../../../utilities/formUtils'
import { getFilePostDataValues, getFilePostDate } from '../data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFileList, postBillsPayable, postBillsReceivable, postCC, postDaybook, postGstData, postGstLedger, postItemMaster, postLedgerMaster, postOpeningStock, postOpeningTrailBal, postStockJournal, postVtype } from '../data/actions';
import { useState } from 'react';
import { cloneDeep, merge } from 'lodash';
import { postingDaybookSchema, postingSchema } from '../data/model';
import userACL from '../../../store/access';
import moment from 'moment';
import CompanyNameSelect from './selectCompanyName';
import { selectCompanyName } from '../../segmap/data/selectors';

const PostDateComponent = (props) => {

    const postDataValues = useSelector(state => getFilePostDataValues(state, props))
    const options = useSelector(state => selectCompanyName(state, props))
    let postingData = props.postObj
    let data = merge({}, userACL.atFetch())
    const date = new Date()
    const todayDate = moment(date).format("YYYY-MM-DD")
    const dispatch = useDispatch()


    const companyDetails = options.filter((item) => item.rlbSegid == data.segid)
    let companyName = companyDetails ? companyDetails.length > 0 ? companyDetails[0].text : "" : ""

    const PostData = (values) => {
        let obj = props.postObj
        props.setDateObj(values)
        if (obj) {
            if (obj.file_type === "ledger_master") {
                dispatch(postLedgerMaster(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "item_master") {
                dispatch(postItemMaster(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "cc_master") {
                dispatch(postCC(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "bills_receivable") {
                dispatch(postBillsReceivable(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "bills_payable") {
                dispatch(postBillsPayable(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "opening_Trail_balance") {
                dispatch(postOpeningTrailBal(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "opening_stock") {
                dispatch(postOpeningStock(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "daybook") {
                dispatch(postDaybook(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }

            if (obj.file_type === "gst_data") {
                dispatch(postGstData(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }

            if (obj.file_type === "gst_ledger") {
                dispatch(postGstLedger(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
            if (obj.file_type === "stck_jr") {
                dispatch(postStockJournal(obj))
                props.setLoaderActive(true)
                setTimeout(() => {
                    let values = {}
                    if (data) {
                        values.fromdt = todayDate
                        values.todt = todayDate
                        values.cid = data.cid
                        values.segid = data.segid
                        dispatch(fetchFileList(values))
                    }
                }, 1000)
            }
        }
        props.setPostModalOpen(false)
    }


    return (
        <Container>

            <Formik id="filelist"
                initialValues={postDataValues}
                validationSchema={postingData.file_type === "daybook" ? postingDaybookSchema : postingSchema}
                onSubmit={(values) => { PostData(values) }}
                render={({ handleSubmit, errors, onChange, values, handleChange, setFieldValue }) => (
                    <Form as={FormikForm} size="small" className="ciformSearch" width={5} onSubmit={handleSubmit}>
                        {
                            (postingData.file_type === "gst_data" || postingData.file_type === "gst_ledger" || postingData.file_type === "ledger_master" || postingData.file_type === "item_master" || postingData.file_type === "cc_master" || postingData.file_type === "bills_receivable" || postingData.file_type === "bills_payable" || postingData.file_type === "opening_Trail_balance" || postingData.file_type === "opening_stock" || postingData.file_type === "stck_jr") ?
                                <>
                                    {/* <CompanyNameSelect name='company_name' setFieldValue={setFieldValue} label='Tally Company Name' placeholder='Tally Company Name' isSelection={true} /> */}
                                    <Field name="company_name" component={FormikInputComponent} setFieldValueM={companyName} label='Tally Company Name' readOnly={true} className="background-gray" style={{width:"75%"}} />
                                </>
                                :
                                null
                        }

                        {
                            postingData.file_type === "daybook" ?
                                <>
                                    <Form.Group widths={2}>
                                        <Field name="fromdate" component={FormikDateComponent} label='From Date' isTxn='false' placeholder='From Date' />
                                    </Form.Group>
                                    <Form.Group widths={2} style={{ paddingBottom: "10px" }}>
                                        <Field name="todate" component={FormikDateComponent} label='To Date' isTxn='false' placeholder='To Date' />
                                    </Form.Group>
                                </>
                                :
                                null
                        }


                        {postingData.file_type === "gst_data" ?
                            <Form.Group widths={1} style={{ paddingBottom: "10px" }}>
                                <Field name="checked" label="I Have Posted All Above Data : Vtypes, Daybook & Gst_Ledger " component={FormikCheckBoxComponent} ></Field>
                            </Form.Group>
                            :
                            null}

                        <br />
                        <Button stype={{ paddingRight: "20px" }} type="button" color='red' onClick={() => props.setPostModalOpen(false)}>Back</Button>
                        {postingData.file_type === "gst_data" ? values.checked === "yes" ? <Button type="submit" color='green'>Post</Button> : <Button disabled type="submit" color='green'>Post</Button> : <Button type="submit" color='green'>Post</Button>}

                    </Form>
                )}
            />
        </Container>
    )
}

export default PostDateComponent