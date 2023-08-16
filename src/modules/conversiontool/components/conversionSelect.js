import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalesmanager } from "../data/actions";
import * as select from "../data/selectors";
import { Field } from "formik";
import { FormikSelectComponent } from "../../../utilities/formUtils";
import {
    getFilteredConversionTool,
    getIsConversionToolFetched,
} from "../data/selectors";
import { merge } from "lodash";
import userACL from "../../../store/access";

const ConversionToolSelect = (
    {
        name,
        isTxn,
        isLabel,
        label,
        isSelection,
        focus,
        placeholder,
        validation,
        computeValue,
        index,
        fieldName,
        fromField,
        otherList,
        passFunct,
        classNameGet,
        setFieldValue,
        getValue: callback,
    },
    props
) => {
    const options = useSelector((state) =>
        getFilteredConversionTool(state)
    );
    const convestionFetched = useSelector((state) =>
        getIsConversionToolFetched(state, props)
    );
    const dispatch = useDispatch();

    const data = merge({}, userACL.atFetch());

    const getValue = (value, setFieldValue, values) => {
        if (passFunct) {
            passFunct(value);
        }
    };

    useEffect(() => {
        if (options.length > 0) {
            setFieldValue("vname", options[0].value)
        }
    }, [convestionFetched])

    return (
        <Field
            name={name}
            isLabel={isLabel}
            isTxn={isTxn}
            label={label}
            classNameGet={classNameGet}
            validation={validation}
            isSelection={isSelection}
            component={FormikSelectComponent}
            computeValue={computeValue}
            index={index}
            fieldName={fieldName}
            fromField={fromField}
            otherList={otherList}
            userProps={{ options, getValue }}
            focus={focus}
            placeholder={placeholder}
        >
        </Field>
    );
};

export default ConversionToolSelect;
