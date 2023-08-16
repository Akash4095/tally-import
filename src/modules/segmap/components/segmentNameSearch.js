import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as select from '../data/selectors'
import { Field } from 'formik'
import { searchSegmap } from '../data/actions'
import userACL from '../../../store/access'
import { merge } from 'lodash'
import { FormikSelectComponent } from '../../../utilities/formUtils'



const SegmentSearch = ({ name, isTxn, label, isLabel, setOnCall, focus, placeholder, validation, computeValue, index, fieldName, fromField, otherList, isSelection, passFunct, classNameGet, getValue: callback }, props) => {

    const options = useSelector(state => select.selectSegment(state, props))
    const dispatch = useDispatch()

    const data = merge({}, userACL.atFetch())

    useEffect(() => {
        let values = {}
        values.cid = data.cid
        dispatch(searchSegmap(values))
    }, [])

    const getValue = (value, setFieldValue) => {
        console.log(value, '-----value')
        let selectedRow = options.filter((item) => {
            return item.value === value
        })
        let data = selectedRow ? selectedRow[0] : ""
        // console.log(data ? data.key : "", '-----------selec')
        setFieldValue('rlbSegid', data ? data.key : "")
        
        if (callback) {
            callback(value, setFieldValue)
        }
    }


    return (
        <Field name={name} isLabel={isLabel} isTxn={isTxn} label={label} marginTop={true} classNameGet={classNameGet} validation={validation} isSelection={isSelection} component={FormikSelectComponent} computeValue={computeValue} index={index} fieldName={fieldName} fromField={fromField} otherList={otherList} userProps={{ options, getValue }} focus={focus} placeholder={placeholder} />
    )
}

export default SegmentSearch