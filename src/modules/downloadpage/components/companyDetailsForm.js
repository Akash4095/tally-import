import React, { useState, useEffect } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { Button, Container, Form, Header, Modal } from 'semantic-ui-react'
import { FormikCheckBoxComponent, FormikDateComponent, FormikInputComponent } from '../../../utilities/formUtils'
import { getDownloadData } from '../data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { saveInputDataForConvert } from '../data/actions';
import { downloadSchema } from '../data/model';
import CompanyNameSelect from '../../filelist/components/selectCompanyName';
import { getIsSegmapFetched, selectCompanyName } from '../../segmap/data/selectors';
import { merge } from 'lodash';
import userACL from '../../../store/access';
import { fetchSegmap } from '../../segmap/data/actions';

const CompanyDetailsComponent = (props) => {

    const initialValues = useSelector(state => getDownloadData(state, props))
    const options = useSelector(state => selectCompanyName(state, props))
    const companyNameFetched = useSelector(state => getIsSegmapFetched(state, props))
    let data = merge({}, userACL.atFetch())

    const dispatch = useDispatch()


    const companyDetails = options.filter((item) => item.rlbSegid == data.segid)
    let companyName = companyDetails ? companyDetails.length > 0 ? companyDetails[0].text : "" : ""

    useEffect(() => {
        if (!companyNameFetched) {
            let obj = {}
            obj.rlbCid = data.cid
            obj.rlbSegid = data.segid
            if (data) {
                dispatch(fetchSegmap(obj))
            }
        }
    }, []);

    const saveInputData = (values) => {
        dispatch(saveInputDataForConvert(values))
        props.setVisible(true)
        props.setModalOpen(false)
        props.setStartBtn(false)
    }


    return (
        <Container>
            <Formik id="download"
                initialValues={initialValues}
                validationSchema={downloadSchema}
                onSubmit={(values) => { saveInputData(values) }}
                render={({ handleSubmit, errors, onChange, values, handleChange }) => (
                    <Form as={FormikForm} size="small" width={5} onSubmit={handleSubmit}>
                        <div style={{ paddingBottom: "12px", width: "66%" }}>
                            <Field name="company_name" component={FormikInputComponent} setFieldValueM={companyName} label='Tally Company Name' readOnly={true} className="background-gray" />
                        </div>
                        <Form.Group widths={3} style={{ paddingBottom: "5px" }}>
                            <Field name="fromdate" component={FormikDateComponent} label='Transaction Start From Date' isTxn='false' placeholder='From Date' />
                            <Field name="todate" component={FormikDateComponent} label='Transaction End To Date' isTxn='false' placeholder='To Date' />
                        </Form.Group>
                        <Form.Group widths={3} style={{ paddingBottom: "5px" }}>
                            <Field name="opening_date" component={FormikDateComponent} label='Opening Date' isTxn='false' placeholder='Opening Date' />
                            <span style={{ marginTop: "22px", marginLeft: "10px" }}>
                                <Field name="used" defaultChecked={true} label="Used Master Only" component={FormikCheckBoxComponent} ></Field>
                            </span>
                        </Form.Group>
                        <Button style={{ padding: "12px 30px" }} type="submit" color='blue'>Save</Button>
                    </Form>
                )}
            />
        </Container>
    )
}

export default CompanyDetailsComponent