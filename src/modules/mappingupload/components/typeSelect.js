import { Field } from "formik";
import React,{useEffect} from "react";
import { FormikSelectComponent } from "../../../utilities/formUtils";

const TypeSelect = (
    {
        name,
        isTxn,
        isLabel,
        label,
        isSelection,
        focus,
        placeholder,
        width,
        validation,
        isMandatory,
        setFieldValue,
        getValue: callback,
    },
    props
) => {
  

 
    const opt = [
        {
            key: "LE",
            text: "Ledger Map",
            value: "LE",
        },
        {
            key: "VT",
            text: "Voucher Map",
            value: "VT",
        },
        {
            key: "CC",
            text: "Cost Centre Map",
            value: "CC",
        },
        {
            key: "IT",
            text: "Item Map",
            value: "IT",
        },
    ];
    const getSelectedValue = (values) => {
        // console.log(values,'---values')
    };

    return (
        <>
            <Field
                name={name}
                isLabel={isLabel}
                label={label}
                isTxn={isTxn}
                isSelection={isSelection}
                component={FormikSelectComponent}
                isMandatory={isMandatory}
                userProps={{ options: opt, getValue: getSelectedValue, placeholder }}
                placeholder={placeholder}
                focus={focus}
                width={width}
            />
        </>
    );
};

export default TypeSelect;
