import React, { useEffect } from 'react';
import { Field } from 'formik'
import { FormikSelectComponent } from '../../../utilities/formUtils'


const DownloadOptions = ({ name, isTxn, isLabel, label, isSelection, placeholder, userProps, width, callback, index, type }, props) => {

    const options = [
        { key: 'accvou', text: 'Accounts', value: 'accvou'},
        { key: 'invvou', text: 'Invoice', value: 'invvou' },
        { key: 'excvou', text: 'Exception', value: 'excvou' },
        { key: 'clear', text: 'Clear', value: 'clear' },
    
      ]

      
    return (
        <Field name={name} isLabel={isLabel} isTxn={isTxn} label={label} isSelection={isSelection} component={FormikSelectComponent} userProps={{ options, index, placeholder }} placeholder={placeholder} width={width}> </Field>
    )

}


export default DownloadOptions;