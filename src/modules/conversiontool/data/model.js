import React from 'react';

export const conversion = () => ({
    vname: "",
 
})

export const searchColumns = [
    {
        Header: <div style={{ textAlign: 'left' }} >Name</div>,
        accessor: 'name',
        Cell: row => <div className='ellipsisDi' style={{ width: '210px', paddingLeft: "8px" }} title={(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'rlbccfil1',

    },
    {
        Header: <div style={{ textAlign: 'left' }} >Category Name</div>,
        accessor: 'categoryName',
        Cell: row => <div style={{ textAlign: "left", paddingLeft: "8px" }}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'rlbccfil2'
    },
    {
        Header: <div style={{ textAlign: 'left' }} >Category Id</div>,
        accessor: 'categoryId',
        Cell: row => <div className='ellipsisDi' style={{ width: '210px', paddingLeft: "8px" }} title={(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}>{(row.value && row.value !== undefined && row.value !== null && row.value !== 'NULL' && row.value !== "0" && row.value !== 0) ? row.value : ""}</div>,
        classNameGet: 'rlbccfil3',

    },


]