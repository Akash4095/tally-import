import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Dimmer, Grid, Header, Form, Loader, Modal } from 'semantic-ui-react'
import { Formik, Field, Form as FormikForm } from 'formik'
import { heightSet, rowBodyHeightSet } from '../../../utilities/heightSet'
import { downloadConversionToolList, fetchConversionToolList, rlbCostCenterSync } from '../data/actions';
import userACL from '../../../store/access';
import { merge } from 'lodash';
import ConversionToolSelect from './conversionSelect'
import { getConversion } from '../data/selectors'
import { FormikInputComponent } from '../../../utilities/formUtils'


const ConversionToolList = (props) => {

  const [heights, setHeight] = useState('')
  const [getBodyHeight, setGetBodyHeight] = useState('')
  const [loader, setLoader] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const data = merge({}, userACL.atFetch())

  const initialValues = useSelector(state => getConversion(state, props))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchConversionToolList())
  }, [])



  // useEffect(() => {
  //   if (document.getElementsByClassName("markedMenuOpt") && document.getElementsByClassName("markedMenuOpt").length) {
  //     if (document.getElementsByClassName("markedMenuOpt")[0].classList) {
  //       document.getElementsByClassName("markedMenuOpt")[0].classList.remove("markedMenuOpt")
  //     }
  //   }
  //   let obj = document.getElementById("migration");
  //   obj.classList.add("markedMenuOpt");
  // }, [])

  const callHeightFunc = () => {
    heightSet(setHeight)
    rowBodyHeightSet(setGetBodyHeight)
  }

  const download = (values, resetForm) => {
    dispatch(downloadConversionToolList(values))
    setLoader(true)
    setTimeout(() => {
      setIsModalOpen(true)
      setLoader(false)
    }, 5000)
  }
  return (
    <Container className="convesion-tool-container">
    <br></br>
    <br></br>
      <Grid>
        <Grid.Row>
          <Grid.Column width={9}>
            <Header as='h2' align='left'>Conversion Tool  List</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={null}
        onSubmit={(values, { resetForm }) => download(values, resetForm)}
        render={({ values, handleSubmit, resetForm, errors, handleChange, onChange, setFieldValue }) => (

          <Form as={FormikForm} onSubmit={handleSubmit} size='small' className="CustomeForm">
            <Form.Group widths={2}>
              <ConversionToolSelect name='vname' label='Select Version' isMandatory={true} isSelection={true} setFieldValue={setFieldValue} />
            </Form.Group>
            {/* <br/> */}
            <p style={{color:"#2185D0", marginLeft:"5%", fontSize:"16px"}}>You are recomended to use the latest vesrion.</p>
            <Button type="submit" size="medium" color="blue" className="CustomeBT" style={{ marginLeft: "17%", marginTop: "2%" }}>
              Download
            </Button>
          </Form>
        )}
      />
      <Modal open={isModalOpen} size="mini">
        <Modal.Header>Download Status</Modal.Header>
        <Modal.Content>
          <p>If File Not Downloaded Yet Please wait for few second</p>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" color='green' onClick={() => { setIsModalOpen(false) }}>Close</Button>
        </Modal.Actions>
      </Modal>
      {(loader) &&
        <Dimmer active>
          <Loader active>Downloading File</Loader>
        </Dimmer>
      }
    </Container>
  )

}

export default ConversionToolList