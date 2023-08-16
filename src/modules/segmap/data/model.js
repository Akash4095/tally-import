import React from 'react';
import * as Yup from 'yup'
import { v4 } from 'uuid'
import moment from 'moment'
import { merge, debounce } from 'lodash'
import axios from 'axios'
import { TALLY_URL } from '../../../store/path'
import userACL from '../../../store/access'


export const segmap = () => ({
    rlbCid: "",
    rlbSegid: "",
    rlbSegmentName: "",
    rlbCompanyName: "",
    rlbCompanyGstNo: "",
    companyName: "",
    status: 1,
    uid_create: "",
    uid_update: "",

})

export const segmapSchema = Yup.object({
    rlbSegmentName: Yup.string()
        .required('RLB Segment Name (Required)'),
    // rlbCompanyGstNo: Yup.string()
    //     .required('Tally Company GST No (Required)'),
    uid_create: Yup.string().nullable(),
    uid_update: Yup.string().nullable()
})

export const duplicateCheckSegmap = debounce(checkSegmap, 800)

function checkSegmap(value, values) {

    const data = merge({}, userACL.atFetch())
    let obj = {}
    obj.rlbCid = data.cid
    obj.rlbSegid = data.cid
    if (value && value !== null && value !== undefined && value !== "" && value.length > 2)
        return axios.post(TALLY_URL + "/mapping/segMapExists-check", obj)
            .then(response => {
                if (response.data === 'duplicate') {
                    return "Duplicate"
                }
            })
            .catch(error => "")
}


export const searchColumns = [
    {
        Header: <div style={{ textAlign: 'left' }} >Company Name</div>,
        accessor: 'companyName',
        Cell: row => <div className='ellipsisDiv' style={{ width: '90%' }} title={(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'segmapfilter1',

    },
    {
        Header: <div style={{ textAlign: 'left' }} >RealBooks Company Name</div>,
        accessor: 'rlbCompanyName',
        Cell: row => <div className='ellipsisDiv' style={{ textAlign: "left", paddingLeft: "5px", width: '90%' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'segmapfilter2'
    },
    {
        Header: <div style={{ textAlign: 'left', paddingLeft: '5px' }} >RealBooks Segment Name</div>,
        accessor: 'rlbSegmentName',
        Cell: row => <div className='ellipsisDiv' style={{ textAlign: "left", paddingLeft: '8px', width: '90%' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'segmapfilter3'
    },
    {
        Header: <div style={{ textAlign: 'left', paddingLeft: '5px' }} >RealBooks Company GST No</div>,
        accessor: 'rlbCompanyGstNo',
        Cell: row => <div style={{ textAlign: "left", paddingLeft: '8px', width: '90%' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'segmapfilter4'
    },
    {
        Header: <div style={{ textAlign: 'left', paddingLeft: '5px' }} >Access Key</div>,
        accessor: 'accessKey',
        Cell: row => <div style={{ textAlign: "left", paddingLeft: '8px' }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'segmapfilter5'
    },

]