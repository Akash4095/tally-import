import moment from 'moment';
import React from 'react';
import * as Yup from 'yup'
import { displayAmtInLakh, displayDate } from '../../../utilities/listUtils'


export const fileSearchList = () => ({
    fromdt: "",
    todt: ""
})

export const filePostButton = () => ({
    fromdate: "",
    todate: "",
    company_name: "",
    checked:"no",
})

export const postingSchema = Yup.object({
    company_name: Yup.string()
        .required('Tally Company Name (Required)'),
})

export const postingDaybookSchema = Yup.object({
    fromdate: Yup.string()
        .required('From Date (Required)'),
    todate: Yup.string().required('To Date (Required)'),
})



function filterDate(rows, id, filterValue) {
    return rows.filter(row => {
        let rowValue = moment(row.values[id]).format("DD-MM-YYYY hh-mm-ss")
        let check = filterValue.replace(/[ ]/gi, " ").replace(/[*]/gi, "-").replace(/[.]/gi, "-").replace(/[+]/gi, "-").replace(/[/]/gi, "-").replace(/[,]/gi, "-").replace(/[:]/gi, "-")
        
        // console.log(rowValue,'=====value')
        // console.log(check,'==check')
        // console.log(filterValue,'==filter')
        
        return rowValue !== undefined ? 
            String(rowValue).toLowerCase().startsWith(String(check).toLowerCase())
        : true
    })
  }

export const searchColumns = [
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