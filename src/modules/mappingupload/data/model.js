import moment from 'moment'
import React from 'react'
import * as Yup from 'yup'
import { displayDate } from '../../../utilities/listUtils'

export const mapping = () => ({
    cid: "",
    segid: "",
    uid_create: "",
    uid_update: "",
    type: "",
    tally_name: "",
    rlb_name: ""
})

export const mappingUploadSchema = Yup.object({
    type: Yup.string().required("Type (Required)"),
    rlb_name: Yup.string()
        .min(3, 'RealBokks Name (Min 3 Characters Needed)')
        .required("RealBokks Name (Required)"),
    tally_name: Yup.string()
        .min(3, 'Tally Name (Min 3 Characters Needed)')
        .required("Tally Name (Required)"),
    uid_create: Yup.string().nullable(),
    uid_update: Yup.string().nullable()
})

export const searchColumns = [
    {
        Header: <div style={{ textAlign: 'left', paddingLeft: "5px" }} >Type</div>,
        accessor: 'type',
        Cell: row => <div style={{ width: '90%', paddingLeft: "8px" }} title={(row.value) ? row.value : ""}>{(row.value && row.value !== undefined && row.value !== "") ? ((row.value == "LE") ? "Ledger Map" : (row.value == "CC") ? "Cost Center Map" : (row.value == "IT") ? "Item Map" : (row.value == "VT") ? "Voucher Map" : "") : ""}</div>,
        classNameGet: 'mapping1',

    },
    {
        Header: <div style={{ textAlign: 'left', paddingLeft: '5px' }} >Tally Name</div>,
        accessor: 'tally_name',
        Cell: row => <div className='ellipsisDiv' style={{ textAlign: "left", paddingLeft: '8px', width: '90%' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'mapping3'
    },
    {
        Header: <div style={{ textAlign: 'left' }} >RealBooks Name</div>,
        accessor: 'rlb_name',
        Cell: row => <div className='ellipsisDiv' style={{ textAlign: "left", paddingLeft: "5px", width: '90%' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'mapping2'
    },
   

]

function filterDate(rows, id, filterValue) {
    return rows.filter(row => {
        let rowValue = moment(row.values[id]).format("DD-MM-YYYY hh-mm-ss")
        let check = filterValue.replace(/[ ]/gi, " ").replace(/[*]/gi, "-").replace(/[.]/gi, "-").replace(/[+]/gi, "-").replace(/[/]/gi, "-").replace(/[,]/gi, "-").replace(/[:]/gi, "-")
        return rowValue !== undefined ?
            String(rowValue).toLowerCase().startsWith(String(check).toLowerCase())
            : true
    })
}


export const searchColumnsFile = [
    {
        Header: <div style={{ textAlign: 'left' }} >File Type</div>,
        accessor: 'file_type',
        Cell: row => <div className='ellipsisDiv' style={{ width: '85%', paddingLeft: '8px' }} title={(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'unitfilter1',

    },
    {
        Header: <div style={{ textAlign: 'left', paddingLeft: '5px' }} >Uploaded Date & Time</div>,
        accessor: 'dt_create',
        Cell: row => <div style={{ textAlign: "left", paddingLeft: '8px' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? displayDate(row.value) : ""}</div>,
        classNameGet: 'unitfilter3',
        filter: filterDate
    },
    {
        Header: <div style={{ textAlign: 'left' }} >File Name</div>,
        accessor: 'org_name',
        Cell: row => <div className='ellipsisDiv' style={{ textAlign: "left", paddingLeft: "8px", width: '85%' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'unitfilter2'
    },
    {
        Header: <div style={{ textAlign: 'left', paddingLeft: '5px' }} >File Status</div>,
        accessor: 'file_status',
        Cell: row => <div style={{ textAlign: "left", paddingLeft: '10px' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'unitfilter4'
    },

]