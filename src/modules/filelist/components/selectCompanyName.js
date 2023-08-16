import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Field } from 'formik'
import { FormikSelectComponent } from '../../../utilities/formUtils'
import { merge } from 'lodash';
import userACL from '../../../store/access';
import { getIsSegmapFetched, selectCompanyName } from '../../segmap/data/selectors';
import { fetchSegmap } from '../../segmap/data/actions';


const CompanyNameSelect = ({ name, isTxn, isLabel, label, isSelection, focus, placeholder, setData, validation, computeValue, index, fieldName, fromField, otherList, passFunct, classNameGet, getValue: callback }, props) => {


    const companyNameFetched = useSelector(state => getIsSegmapFetched(state, props))
    const result = useSelector(state => selectCompanyName(state, props))
    const dispatch = useDispatch()

    const options = result.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.value === thing.value && t.text === thing.value
    ))
  )
    const data = merge({}, userACL.atFetch())
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


    const getValue = (value, setFieldValue, indGet) => {

    }

    return (
        <Field name={name} isLabel={isLabel} isTxn={isTxn} label={label} setData={setData} classNameGet={classNameGet} validation={validation} isSelection={isSelection} component={FormikSelectComponent} computeValue={computeValue} index={index} fieldName={fieldName} fromField={fromField} otherList={otherList} userProps={{ options, getValue }} focus={focus} placeholder={placeholder}> </Field>
    )
}


export default CompanyNameSelect;
