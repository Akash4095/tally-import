import React, { useState } from 'react'
import { Formik, Field, Form as FormikForm } from 'formik';
import { useDispatch } from 'react-redux'
import { FormikInputComponent } from '../../../utilities/formUtils';
import { mappingUploadSchema } from '../data/model'
import Notification from '../../../utilities/notificationUtils';
import { getNotification } from '../data/selectors';
import { editMappingList, setNotifyDone } from '../data/action';
import { cloneDeep, merge } from 'lodash';
import userACL from '../../../store/access';
import { Container, Form, Button } from 'semantic-ui-react';
import TypeSelect from './typeSelect';

const MappindEdit = (props) => {

  const data = merge({}, userACL.atFetch())
  const [savedSegmapId, setSavedSegmapId] = useState("")
  let initialValues = cloneDeep(props.mappingEditModal.data)

  const dispatch = useDispatch()

  const updateMappingUploadEntry = (values, resetForm) => {
    userACL.atCreate(values)
    delete values.dt_create
    delete values.dt_update
    delete values.status
    dispatch(editMappingList(values))
    setSavedSegmapId(values.id)
    props.setMappingEditModal({ open: false, data: "" })
  }

  return (
    <Container>

      <Formik size="large" width={8}
        initialValues={initialValues}
        validationSchema={mappingUploadSchema}
        onSubmit={(values, { resetForm }) => updateMappingUploadEntry(values, resetForm)}
        render={({ values, handleSubmit, errors, resetForm, setFieldValue, onChange, handleChange, handleBlur }) => (

          <Form as={FormikForm} size='small' className="CustomeF" onSubmit={handleSubmit} >
            <Form.Group widths={2}>
              <TypeSelect name='type' label='Type' isMandatory={true} sefFocus={true} placeholder='Select Type' isLabel={false} isTxn={true} isSelection={true} />
              {/* <Field name='type' label='Type' component={FormikInputComponent} isMandatory={true} /> */}
            </Form.Group>
            <Form.Group widths={2}>
              <Field name='tally_name' label='Tally Name' component={FormikInputComponent} isMandatory={true} />
            </Form.Group>
            <Form.Group widths={2}>
              <Field name='rlb_name' label='RealBooks Name' component={FormikInputComponent} isMandatory={true} />
            </Form.Group>
           

            <Button stype={{ paddingRight: "20px" }} type="button" color='red' onClick={() => props.setMappingEditModal({ open: false, data: "" })}>Back</Button>
            <Button type="submit" color='blue'>Update</Button>

            {savedSegmapId ?
              <Notification id={savedSegmapId} notifySelector={getNotification} notifyDoneAction={setNotifyDone} type='save' />
              :
              null}
          </Form>
        )}
      />
    </Container>

  )
}

export default MappindEdit