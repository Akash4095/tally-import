import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    downloadFile, downloadPostedBillsPayable, downloadPostedBillsReceivable, downloadPostedCC, downloadPostedDaybook, downloadPostedGstData, downloadPostedGstLedger, downloadPostedItemMaster, downloadPostedLedgerMaster, downloadPostedOpeningTrailBal, downloadPostedVtype, downloadVtype, fetchFileList, postDaybook, postGstData,
    postGstLedger, postVtype, saveDownloadPostedBillsPayable, saveDownloadPostedBillsReceivable, saveDownloadPostedCC, saveDownloadPostedDaybook, saveDownloadPostedGstData, saveDownloadPostedGstLedger, saveDownloadPostedItemMaster, saveDownloadPostedLedgerMaster, saveDownloadPostedOpeningTrailBal, saveDownloadPostedVtype, saveFileDownloadInitialRes, savePostedBillsPayable, savePostedBillsReceivable, savePostedCC, savePostedDaybook,
    savePostedGstData, savePostedGstLedger, savePostedItemMaster, savePostedLedgerMaster, savePostedOpeningTrailBal, savePostedVtype, saveUnsyncPostedFileRes, startFileDownload, unsyncPostedFile, saveDownloadPostedOpeningStock, savePostedOpeningStock, downloadPostedOpeningStock, savePostedStockJournal, downloadPostedStockJournal, saveDownloadPostedStockJournal
} from '../data/actions'
import { Header, Table, TableBody, Container, TableHeader, Button, Modal, Grid, Form, Dimmer, Loader, Label, Icon, TransitionablePortal, Segment } from 'semantic-ui-react';
import {
    getFileListSearch, getFilteredBillsPayableList, getFilteredBillsReceivableList, getFilteredCcList, getFilteredDaybookList, getFilteredFileList, getFilteredGstDataList, getFilteredGstLedgerList, getFilteredItemMasterList, getFilteredLedgerMasterList, getFilteredOpeningStockList, getFilteredOpeningTrailBalList,
    getFilteredStockJournalList, getFilteredVtypeList, getIsBillsPayableDownloaded, getIsBillsPayablePosted, getIsBillsReceivableDownloaded, getIsBillsReceivablePosted, getIsCCDownloaded, getIsCCPosted, getIsDaybookDownloaded, getIsDaybookPosted, getIsFileDownloaded, getIsFileDownloadStarted, getIsFileListFetched,
    getIsGstDataDownloaded, getIsGstDataPosted, getIsGstLedgerDownloaded, getIsGstLedgerPosted, getIsItemMasteraPosted, getIsItemMasterDownloaded, getIsLedgerMasterDownloaded, getIsLedgerMasterPosted, getIsOpeningStockDownloaded, getIsOpeningStockPosted, getIsOpeningTrailBalDownloaded, getIsOpeningTrailBalPosted, getIsStockJournalDownloaded,
    getIsStockJournalPosted, getIsUnsyncFileRes, getIsVtypeDownloaded, getIsVtypePosted
} from '../data/selectors';
import { TableListDiv } from './tableListDiv';
import { StickyTable, Row, Cell } from 'react-sticky-table'
import { heightSet, rowBodyHeightSet } from '../../../utilities/heightSet'
import { searchColumns } from '../data/model';
import { Field, Formik, Form as FormikForm } from 'formik';
import { FormikDateComponent } from '../../../utilities/formUtils';
import UploadXmlFile from '../../uploadfile/components/uploadXml';
import { cloneDeep, merge } from 'lodash';
import userACL from '../../../store/access';
import moment from 'moment';
import PostDateComponent from './postDateComponent';
import UploadXlsxFile from '../../uploadfile/components/uploadXlsx';
import { getIsSegmapFetched } from '../../segmap/data/selectors';
import { fetchSegmap } from '../../segmap/data/actions';


const FileList = (props) => {

    const [heights, setHeight] = useState('')
    const [getBodyHeight, setGetBodyHeight] = useState('')
    const [searchClicked, setSearchedClicked] = useState(false)
    const [fileUploaded, setFileUploaded] = useState(false)
    const [displayStatus, setDisplayStatus] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [postSuccessModalOpen, setPostSuccessModalOpen] = useState({ open: false, msg: "" })
    const [uploadSuccessModalOpen, setUploadSuccessModalOpen] = useState(false)
    const [filePendingModalOpen, setFilePendingModalOpen] = useState(false)
    const [uploadType, setUploadType] = useState('')
    const [downloadSuccessModalOpen, setDownloadSuccessModalOpen] = useState({ open: false, type: "", msg: "" })
    const [postModalOpen, setPostModalOpen] = useState(false)
    const [unsyncModalOpen, setUnsyncModalOpen] = useState(false)
    const [postObj, setPostObj] = useState('')
    const [gstObj, setGstObj] = useState('')
    const [dateObj, setDateObj] = useState('')
    const [guidancePortal, setGuidancePortal] = useState(false)
    // buttons states
    const [ledgerMasterBtn, setLedgerMasterBtn] = useState(false)
    const [itemMasterBtn, setItemMasterBtn] = useState(false)
    const [ccBtn, setCcBtn] = useState(false)
    const [billsReceivableBtn, setBillsRecivableBtn] = useState(false)
    const [billsPayableBtn, setBillsPayableBtn] = useState(false)
    const [openingTrailBalBtn, setOpeningTrailBalBtn] = useState(false)
    const [openingStockBtn, setOpeningStockBtn] = useState(false)
    const [daybookBtn, setDaybookBtn] = useState(false)
    const [vtypeBtn, setVtypeBtn] = useState(false)
    const [gstLedgerBtn, setGstLedgerBtn] = useState(false)
    const [gstDataBtn, setGstDataBtn] = useState(false)
    const [stockJournalBtn, setStockJournalBtn] = useState(false)
    const [header, setHeader] = useState("Ledger Master File List")
    const [uploadheader, setUploadHeader] = useState("Upload Ledger Master File ")
    const [postheader, setPostHeader] = useState("Ledger Master Posting")
    const [timer, setTimer] = useState(false)


    const [loaderActive, setLoaderActive] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const fileListSearch = useSelector(state => getFileListSearch(state, props))
    const dataFetched = useSelector(state => getIsFileListFetched(state, props))
    const startFileDownloadRes = useSelector(state => getIsFileDownloadStarted(state))

    // listing selectors
    const ledgerMasterList = useSelector(state => getFilteredLedgerMasterList(state))
    const itemMasterList = useSelector(state => getFilteredItemMasterList(state))
    const ccList = useSelector(state => getFilteredCcList(state))
    const billsReceivableList = useSelector(state => getFilteredBillsReceivableList(state))
    const billsPayableList = useSelector(state => getFilteredBillsPayableList(state))
    const openingStockList = useSelector(state => getFilteredOpeningStockList(state))
    const openingTrailBalList = useSelector(state => getFilteredOpeningTrailBalList(state))
    const daybookList = useSelector(state => getFilteredDaybookList(state))
    const vtypeList = useSelector(state => getFilteredVtypeList(state))
    const gstLedgerList = useSelector(state => getFilteredGstLedgerList(state))
    const gstDataList = useSelector(state => getFilteredGstDataList(state))
    const stockJournalList = useSelector(state => getFilteredStockJournalList(state))



    // data for checking is Posted
    const ledgerMasterPosted = useSelector(state => getIsLedgerMasterPosted(state, props))
    const itemMasterPosted = useSelector(state => getIsItemMasteraPosted(state, props))
    const ccPosted = useSelector(state => getIsCCPosted(state, props))
    const billsReceivablePosted = useSelector(state => getIsBillsReceivablePosted(state, props))
    const billsPayablePosted = useSelector(state => getIsBillsPayablePosted(state, props))
    const openingStockPosted = useSelector(state => getIsOpeningStockPosted(state, props))
    const stockJournalPosted = useSelector(state => getIsStockJournalPosted(state, props))
    const openingTrailBalPosted = useSelector(state => getIsOpeningTrailBalPosted(state, props))
    const vtypePosted = useSelector(state => getIsVtypePosted(state, props))
    const daybookPosted = useSelector(state => getIsDaybookPosted(state, props))
    const gstLedgerPosted = useSelector(state => getIsGstLedgerPosted(state, props))
    const gstDataPosted = useSelector(state => getIsGstDataPosted(state, props))

    // data for checking is Downloaded
    const ledgerMasterDownloaded = useSelector(state => getIsLedgerMasterDownloaded(state, props))
    const itemMasterDownloaded = useSelector(state => getIsItemMasterDownloaded(state, props))
    const ccDownloaded = useSelector(state => getIsCCDownloaded(state, props))
    const billsReceivableDownloaded = useSelector(state => getIsBillsReceivableDownloaded(state, props))
    const billsPayableDownloaded = useSelector(state => getIsBillsPayableDownloaded(state, props))
    const openingStockDownloaded = useSelector(state => getIsOpeningStockDownloaded(state, props))
    const stockJournalDownloaded = useSelector(state => getIsStockJournalDownloaded(state, props))
    const openingTrailBalDownloaded = useSelector(state => getIsOpeningTrailBalDownloaded(state, props))
    const vtypeDownloaded = useSelector(state => getIsVtypeDownloaded(state, props))
    const daybookDownloaded = useSelector(state => getIsDaybookDownloaded(state, props))
    const gstLedgerDownloaded = useSelector(state => getIsGstLedgerDownloaded(state, props))
    const gstDataDownloaded = useSelector(state => getIsGstDataDownloaded(state, props))
    const date = new Date()
    const todayDate = moment(date).format("YYYY-MM-DD")

    // data for unsync 
    const gstUnsyncRes = useSelector(state => getIsUnsyncFileRes(state, props))
    const companyNameFetched = useSelector(state => getIsSegmapFetched(state, props))

    // console.log(gstUnsyncRes, '=============gstunsync res')
    const dispatch = useDispatch()
    let data = merge({}, userACL.atFetch())

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

    useEffect(() => {
        if (fileUploaded) {
            setTimeout(() => {
                setUploadSuccessModalOpen(true)
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                    if (uploadType === "gst_data") {
                        setGstDataBtn(true)
                    } else if (uploadType === "gst_ledger") {
                        setGstLedgerBtn(true)
                    } else if (uploadType === "daybook") {
                        setDaybookBtn(true)
                    }
                    else if (uploadType === "ledger_master") {
                        setLedgerMasterBtn(true)
                    }
                    else if (uploadType === "item_master") {
                        setItemMasterBtn(true)
                    }
                    else if (uploadType === "cc_master") {
                        setCcBtn(true)
                    }
                    else if (uploadType === "bills_receivable") {
                        setBillsRecivableBtn(true)
                    }
                    else if (uploadType === "bills_payable") {
                        setBillsPayableBtn(true)
                    }
                    else if (uploadType === "opening_Trail_balance") {
                        setOpeningTrailBalBtn(true)
                    }
                    else if (uploadType === "opening_stock") {
                        setOpeningStockBtn(true)
                    }
                    else if (uploadType === "stck_jr") {
                        setStockJournalBtn(true)
                    }
                    else {
                        setVtypeBtn(true)
                    }
                    //calling listing after uploded
                }
            }, 800)
        }
    }, [fileUploaded])

    const setUploadSuccessFunction = () => {
        setUploadSuccessModalOpen(false)
        setFileUploaded(false)
    }
 
    useEffect(() => {
        if (ledgerMasterPosted.type === "success") {
            let obj = cloneDeep(ledgerMasterPosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedLedgerMaster(obj))
            setTimeout(() => {
                dispatch(savePostedLedgerMaster({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 1000)
            setTimer(setTimeout(function () {
                setLoaderActive(false)
                setFilePendingModalOpen(true)
            }, 240000))

        }
    }, [ledgerMasterPosted])

    useEffect(() => {
        if (daybookPosted.type === "success") {
            let obj = cloneDeep(daybookPosted)
            obj.fromdate = dateObj.fromdate
            obj.todate = dateObj.todate
            dispatch(downloadPostedDaybook(obj))
            setTimeout(() => {
                dispatch(savePostedDaybook({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 1000)
            setTimer(setTimeout(function () {
                setLoaderActive(false)
                setFilePendingModalOpen(true)
            }, 240000))
        }
    }, [daybookPosted])

    useEffect(() => {
        if (itemMasterPosted.type === "success") {
            let obj = cloneDeep(itemMasterPosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedItemMaster(obj))
            setTimeout(() => {
                dispatch(savePostedItemMaster({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [itemMasterPosted])

    useEffect(() => {
        if (ccPosted.type === "success") {
            let obj = cloneDeep(ccPosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedCC(obj))
            setTimeout(() => {
                dispatch(savePostedCC({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [ccPosted])

    useEffect(() => {
        if (billsReceivablePosted.type === "success") {
            let obj = cloneDeep(billsReceivablePosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedBillsReceivable(obj))
            setTimeout(() => {
                dispatch(savePostedBillsReceivable({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [billsReceivablePosted])

    useEffect(() => {
        if (billsPayablePosted.type === "success") {
            let obj = cloneDeep(billsPayablePosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedBillsPayable(obj))
            setTimeout(() => {
                dispatch(savePostedBillsPayable({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [billsPayablePosted])

    useEffect(() => {
        if (openingTrailBalPosted.type === "success") {
            let obj = cloneDeep(openingTrailBalPosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedOpeningTrailBal(obj))
            setTimeout(() => {
                dispatch(savePostedOpeningTrailBal({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [openingTrailBalPosted])

    useEffect(() => {
        if (openingStockPosted.type === "success") {
            let obj = cloneDeep(openingStockPosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedOpeningStock(obj))
            setTimeout(() => {
                dispatch(savePostedOpeningStock({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [openingStockPosted])

    useEffect(() => {
        if (stockJournalPosted.type === "success") {
            let obj = cloneDeep(stockJournalPosted)
            obj.company_name = dateObj.company_name
            obj.file_type = postObj.file_type
            dispatch(downloadPostedStockJournal(obj))
            setTimeout(() => {
                dispatch(savePostedStockJournal({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [stockJournalPosted])

    useEffect(() => {
        if (vtypePosted.type === "success") {
            let obj = cloneDeep(vtypePosted)
            dispatch(downloadPostedVtype(obj))
            setTimeout(() => {
                dispatch(savePostedVtype({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [vtypePosted])

    useEffect(() => {
        if (gstLedgerPosted.type === "success") {
            let obj = cloneDeep(gstLedgerPosted)
            obj.company_name = dateObj.company_name
            dispatch(downloadPostedGstLedger(obj))
            setTimeout(() => {
                dispatch(savePostedGstLedger({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [gstLedgerPosted])

    useEffect(() => {
        if (gstDataPosted.type === "success") {
            let obj = cloneDeep(gstDataPosted)
            obj.company_name = dateObj.company_name
            dispatch(downloadPostedGstData(obj))
            setTimeout(() => {
                dispatch(savePostedGstData({}))
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 500)
        }
    }, [gstDataPosted])

    useEffect(() => {
        if (vtypeDownloaded || daybookDownloaded || gstLedgerDownloaded || gstDataDownloaded || ledgerMasterDownloaded || itemMasterDownloaded || ccDownloaded || billsReceivableDownloaded || billsPayableDownloaded || openingTrailBalDownloaded || openingStockDownloaded || stockJournalDownloaded) {
            if (vtypeDownloaded.type === "success" || daybookDownloaded.type === "success" || gstLedgerDownloaded.type === "success" || gstDataDownloaded.type === "success"
                || ledgerMasterDownloaded.type === "success" || itemMasterDownloaded.type === "success" || ccDownloaded.type === "success" || billsReceivableDownloaded.type === "success" || billsPayableDownloaded.type === "success" || openingTrailBalDownloaded.type === "success" || openingStockDownloaded.type === "success" || stockJournalDownloaded.type === "success") {

                if (ledgerMasterDownloaded.type === "success") {
                    clearTimeout(timer);
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedLedgerMaster({}))
                    }, 1200)

                }
                if (daybookDownloaded.type === "success") {
                    clearTimeout(timer);
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedDaybook({}))
                    }, 1200)

                }
                if (vtypeDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedVtype({}))
                    }, 1200)

                }
                if (gstLedgerDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedGstLedger({}))
                    }, 1200)

                }
                if (gstDataDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedGstData({}))
                    }, 1200)

                }

                if (itemMasterDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedItemMaster({}))
                    }, 1200)

                }
                if (ccDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedCC({}))
                    }, 1200)

                }
                if (billsReceivableDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedBillsReceivable({}))
                    }, 1200)

                }
                if (billsPayableDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedBillsPayable({}))
                    }, 1200)

                }
                if (openingTrailBalDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedOpeningTrailBal({}))
                    }, 1200)

                }
                if (openingStockDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedOpeningStock({}))
                    }, 1200)

                }
                if (stockJournalDownloaded.type === "success") {
                    setPostSuccessModalOpen({ open: true, msg: "Data Posted Successfully" })
                    setLoaderActive(false)
                    setTimeout(() => {
                        dispatch(saveDownloadPostedStockJournal({}))
                    }, 1200)
                }


            }

        }

    }, [vtypeDownloaded, daybookDownloaded, gstLedgerDownloaded, gstDataDownloaded, ledgerMasterDownloaded, itemMasterDownloaded, ccDownloaded, billsReceivableDownloaded, billsPayableDownloaded, openingTrailBalDownloaded, openingStockDownloaded, stockJournalDownloaded])

    useEffect(() => {
        if (vtypePosted || daybookPosted || gstLedgerPosted || gstDataPosted || ledgerMasterPosted || itemMasterPosted || ccPosted || billsReceivablePosted || billsPayablePosted || openingTrailBalPosted || openingStockPosted || stockJournalPosted) {
            if (vtypePosted === "Error" || daybookPosted === "Error" || gstLedgerPosted === "Error" || gstDataPosted === "Error"
                || ledgerMasterPosted === "Error" || itemMasterPosted === "Error" || ccPosted === "Error" || billsReceivablePosted === "Error" || billsPayablePosted === "Error" || openingTrailBalPosted === "Error" || openingStockPosted === "Error" || stockJournalPosted === "Error") {

                setPostSuccessModalOpen({ open: true, msg: "Got Error" })

                if (vtypePosted === "Error") {
                    dispatch(savePostedVtype({}))
                }
                if (daybookPosted === "Error") {
                    dispatch(savePostedDaybook({}))
                }
                if (gstLedgerPosted === "Error") {
                    dispatch(savePostedGstLedger({}))
                }
                if (gstDataPosted === "Error") {
                    dispatch(savePostedGstData({}))
                }
                if (ledgerMasterPosted === "Error") {
                    dispatch(savePostedLedgerMaster({}))
                }
                if (itemMasterPosted === "Error") {
                    dispatch(savePostedItemMaster({}))
                }
                if (ccPosted === "Error") {
                    dispatch(savePostedCC({}))
                }
                if (billsReceivablePosted === "Error") {
                    dispatch(savePostedBillsReceivable({}))
                }
                if (billsPayablePosted === "Error") {
                    dispatch(savePostedBillsPayable({}))
                }
                if (openingTrailBalPosted === "Error") {
                    dispatch(savePostedOpeningTrailBal({}))
                }
                if (openingStockPosted === "Error") {
                    dispatch(savePostedOpeningStock({}))
                }
                if (stockJournalPosted === "Error") {
                    dispatch(savePostedStockJournal({}))
                }
                setLoaderActive(false)
            }

        }

    }, [vtypePosted, daybookPosted, gstLedgerPosted, gstDataPosted, ledgerMasterPosted, itemMasterPosted, ccPosted, billsReceivablePosted, billsPayablePosted, openingTrailBalPosted, openingStockPosted, stockJournalPosted])

    useEffect(() => {
        if (startFileDownloadRes) {
            if (startFileDownloadRes.type === "success" || startFileDownloadRes.type === "Success") {
                setTimeout(() => {
                    setDownloading(false)
                    setDownloadSuccessModalOpen({ open: true, type: "success", msg: "Please Wait Until it gets Downloaded by the Browser." })
                    setPostSuccessModalOpen({ open: false, msg: "" })
                })
            }
            if (startFileDownloadRes === "error" || startFileDownloadRes === "Error") {
                setTimeout(() => {
                    setDownloading(false)
                    setDownloadSuccessModalOpen({ open: true, type: "error", msg: startFileDownloadRes })
                    dispatch(saveFileDownloadInitialRes({}))
                }, 600)
            }
        }

    }, [startFileDownloadRes])


    useEffect(() => {
        let values = {}
        if (data) {
            values.fromdt = todayDate
            values.todt = todayDate
            values.cid = data.cid
            values.segid = data.segid
            dispatch(fetchFileList(values))
            setLedgerMasterBtn(true)
        }
    }, [])

    useEffect(() => {
        let values = {}
        if (data) {
            if (vtypeDownloaded || daybookDownloaded || gstLedgerDownloaded || gstDataDownloaded || ledgerMasterDownloaded || itemMasterDownloaded || ccDownloaded || billsReceivableDownloaded || billsPayableDownloaded || openingTrailBalDownloaded || openingStockDownloaded || stockJournalDownloaded) {
                values.fromdt = todayDate
                values.todt = todayDate
                values.cid = data.cid
                values.segid = data.segid
                dispatch(fetchFileList(values))
                //calling listing after posted
            }

        }
    }, [vtypeDownloaded, daybookDownloaded, gstLedgerDownloaded, gstDataDownloaded, ledgerMasterDownloaded, itemMasterDownloaded, ccDownloaded, billsReceivableDownloaded, billsPayableDownloaded, openingTrailBalDownloaded, openingStockDownloaded, stockJournalDownloaded])


    // useEffect(() => {
    //     if (document.getElementsByClassName("markedMenuOpt") && document.getElementsByClassName("markedMenuOpt").length) {
    //         if (document.getElementsByClassName("markedMenuOpt")[0].classList) {
    //             document.getElementsByClassName("markedMenuOpt")[0].classList.remove("markedMenuOpt")
    //         }
    //     }
    //     let obj = document.getElementById("filelist");
    //     obj.classList.add("markedMenuOpt");
    // }, [])

    const callHeightFunc = () => {
        heightSet(setHeight)
        rowBodyHeightSet(setGetBodyHeight)
    }

    const fetchList = (values) => {
        if (values.fromdt && values.todt) {
            values.cid = data.cid
            values.segid = data.segid
            dispatch(fetchFileList(values))
            setSearchedClicked(true)
        }
    }




    const openPostingPage = (obj) => {
        if (obj.file_type === "vtypes") {
            setTimeout(() => {
                dispatch(postVtype(obj))
                setLoaderActive(true)
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    dispatch(fetchFileList(values))
                }
            }, 1000)
        }

        if (obj.file_type === "ledger_master" || obj.file_type === "item_master" || obj.file_type === "cc_master" || obj.file_type === "bills_receivable" || obj.file_type === "bills_payable" || obj.file_type === "opening_Trail_balance" || obj.file_type === "opening_stock" || obj.file_type === "stck_jr" || obj.file_type === "daybook" || obj.file_type === "gst_data" || obj.file_type === "gst_ledger") {
            setPostModalOpen(true)
        }

        setPostObj(obj)
    }

    const unsyncFunction = (obj) => {
        dispatch(unsyncPostedFile(obj))
    }

    useEffect(() => {
        if (gstUnsyncRes) {
            if (gstUnsyncRes.type === "success") {
                setUnsyncModalOpen(true)
                let values = {}
                if (data) {
                    values.fromdt = todayDate
                    values.todt = todayDate
                    values.cid = data.cid
                    values.segid = data.segid
                    setTimeout(() => {
                        dispatch(fetchFileList(values))
                    }, 500)
                    //calling listing after unsync
                }
                dispatch(saveUnsyncPostedFileRes({}))
            }
        }
    }, [gstUnsyncRes])



    const postFilesAction = ({ object: postObj }) => {
        return (
            <>
                {postObj.file_status === "pending" ?

                    <Button type="button" size="tiny" color="green" onClick={() => openPostingPage(postObj)}>Post</Button>
                    : null
                }
                {
                    postObj.file_type === "daybook" || postObj.file_type === "gst_data" ? postObj.file_status === "uploaded" ?
                        <Button type="button" size="tiny" color="red" onClick={() => unsyncFunction(postObj)}>Unsync</Button>
                        : null : null
                }
            </>
        )
    }

    const startFileDownloadFunc = (obj) => {
        if (obj) {
            dispatch(startFileDownload(obj))
            setDownloading(true)
        }
    }

    const showDaybookList = () => {
        setDaybookBtn(true)
        setVtypeBtn(false)
        setGstLedgerBtn(false)
        setGstDataBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("DayBook File List")
        setUploadHeader("Upload DayBook File")
        setPostHeader("Post DayBook File")
    }

    const showVtypesList = () => {
        setVtypeBtn(true)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setGstDataBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Vtypes File List")
        setUploadHeader("Upload Vtypes File")
        setPostHeader("Post Vtypes File")
    }
    const showGstLedgerList = () => {
        setGstLedgerBtn(true)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstDataBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("GST Ledger File List")
        setUploadHeader("Upload GST Ledger File")
        setPostHeader("Post GST Ledger File")
    }
    const showGstDataList = () => {
        setGstDataBtn(true)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("GST Data File List")
        setUploadHeader("Upload GST Data File")
        setPostHeader("Post GST Data File")
    }
    const showStockJournalList = () => {
        setStockJournalBtn(true)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setGstDataBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setGuidancePortal(false)
        setHeader("Stock Journal File List")
        setUploadHeader("Upload Stock Journal File")
        setPostHeader("Post Stock Journal File")
    }
    const showLedgerMasterList = () => {
        setLedgerMasterBtn(true)
        setGstDataBtn(false)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Ledger Master File List")
        setUploadHeader("Upload Ledger Master File")
        setPostHeader("Post Ledger Master File")
    }
    const showItemMasterList = () => {
        setItemMasterBtn(true)
        setGstDataBtn(false)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setLedgerMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Item Master File List")
        setUploadHeader("Upload Item Master File")
        setPostHeader("Post Item Master File")
    }
    const showCcList = () => {
        setCcBtn(true)
        setBillsRecivableBtn(false)
        setGstDataBtn(false)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Cost Center File List")
        setUploadHeader("Upload Cost Center File")
        setPostHeader("Post Cost Center File")
    }
    const showBillsRecivableList = () => {
        setBillsRecivableBtn(true)
        setGstDataBtn(false)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Bills Receivable File List")
        setUploadHeader("Upload Bills Receivable File")
        setPostHeader("Post Bills Receivable File")
    }
    const showBillsPayableList = () => {
        setBillsPayableBtn(true)
        setGstDataBtn(false)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Bills Payable File List")
        setUploadHeader("Upload Bills Payable File")
        setPostHeader("Post Bills Payable File")
    }

    const showOpeningTrailBalList = () => {
        setGstDataBtn(false)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(true)
        setCcBtn(false)
        setOpeningStockBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Opening Trial Balance File List")
        setUploadHeader("Upload Opening Trial Balance File")
        setPostHeader("Post Opening Trial Balance File")
    }

    const showOpeningStockList = () => {
        setOpeningStockBtn(true)
        setGstDataBtn(false)
        setVtypeBtn(false)
        setDaybookBtn(false)
        setGstLedgerBtn(false)
        setLedgerMasterBtn(false)
        setItemMasterBtn(false)
        setBillsRecivableBtn(false)
        setBillsPayableBtn(false)
        setOpeningTrailBalBtn(false)
        setCcBtn(false)
        setStockJournalBtn(false)
        setGuidancePortal(false)
        setHeader("Opening Stock File List")
        setUploadHeader("Upload Opening Stock File")
        setPostHeader("Post Opening Stock File")
    }

    return (
        <Container>
            {(loaderActive) &&
                <Dimmer active>
                    <Loader active>Posting data</Loader>
                </Dimmer>
            }
            {(downloading) &&
                <Dimmer active>
                    <Loader active>Downloading File</Loader>
                </Dimmer>
            }
            <Grid id='headContent' >
                <Grid.Row>
                    <Grid.Column width={5} floated="left">
                        {
                            ledgerMasterBtn || itemMasterBtn || ccBtn || billsReceivableBtn || billsPayableBtn || openingStockBtn || openingTrailBalBtn || daybookBtn || vtypeBtn || gstLedgerBtn || gstDataBtn || stockJournalBtn ? <Header as='h2' align='left'>{header}</Header> : null
                        }

                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button
                            size='tiny'
                            content={'Guidance For File Upload/Post/Download'}
                            basic color='green'
                            style={{ marginLeft: "1%" }}
                            onClick={() => setGuidancePortal(!guidancePortal)}
                            floated='rigt'
                        />
                    </Grid.Column>
                    <Grid.Column width={7} floated="right" >
                        <Formik id="ciformSearch"
                            initialValues={fileListSearch}
                            validationSchema={null}
                            onSubmit={(values) => { fetchList(values) }}
                            render={({ handleSubmit, errors, onChange, values, handleChange }) => (
                                <Form as={FormikForm} size="small" className="ciformSearch" width={5} onSubmit={handleSubmit}>
                                    <Form.Group >
                                        <Field name="fromdt" component={FormikDateComponent} setFieldValueM={todayDate} isLabel='false' isTxn='true' placeholder='From Date' />
                                        <Field name="todt" component={FormikDateComponent} setFieldValueM={todayDate} isLabel='false' isTxn='true' placeholder='To Date' />
                                        <Button type="submit" size="small" color='blue' style={{height:"35px", marginTop:"4px"}} > Search </Button>
                                        <Button type="type" size="small" color='green' onClick={() => setDisplayStatus(true)}  style={{height:"35px", marginTop:"4px"}}  >Upload</Button>
                                    </Form.Group>
                                </Form>
                            )}
                        />
                    </Grid.Column>
                </Grid.Row>

            </Grid>
            <div className='manual_upload_container'> 
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {
                            ledgerMasterBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showLedgerMasterList()}>Accounting Master</Button> :
                                <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showLedgerMasterList()}>Accounting Master</Button>
                        }
                        {
                            gstLedgerBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showGstLedgerList()}>GST Ledger</Button>
                                : <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showGstLedgerList()}>GST Ledger</Button>
                        }
                        {
                            ccBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showCcList()}>CC</Button> :
                                <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showCcList()}>CC</Button>
                        }
                        {
                            itemMasterBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showItemMasterList()}>Inventory Master</Button> :
                                <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showItemMasterList()}>Inventory Master</Button>
                        }
                        {
                            vtypeBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showVtypesList()}>Vtypes</Button>
                                : <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showVtypesList()}>Vtypes</Button>
                        }
                        {
                            billsReceivableBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showBillsRecivableList()}>Bills Receivable</Button> :
                                <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showBillsRecivableList()}>Bills Receivable</Button>
                        }
                        {
                            billsPayableBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showBillsPayableList()}>Bills Payable</Button> :
                                <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showBillsPayableList()}>Bills Payable</Button>
                        }
                        {
                            openingTrailBalBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showOpeningTrailBalList()}>Opening Trial Balance</Button> :
                                <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showOpeningTrailBalList()}>Opening Trial Balance</Button>
                        }

                        {
                            openingStockBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showOpeningStockList()}>Opening Stock</Button>
                                : <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showOpeningStockList()}>Opening Stock</Button>
                        }
                        {
                            stockJournalBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showStockJournalList()}>Stock Journal</Button>
                                : <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showStockJournalList()}>Stock Journal</Button>
                        }
                        {
                            daybookBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showDaybookList()}>DayBook</Button> :
                                <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showDaybookList()}>DayBook</Button>
                        }
                        {
                            gstDataBtn ? <Button size='mini' color='blue' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showGstDataList()}>GST Data</Button>
                                : <Button size='mini' basic color='grey' style={{ marginRight: "", padding:"7px 12px" }} onClick={() => showGstDataList()}>GST Data</Button>
                        }

                    </Grid.Column>

                </Grid.Row>
            </Grid>

            {ledgerMasterBtn ? (ledgerMasterList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={ledgerMasterList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {itemMasterBtn ? (itemMasterList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={itemMasterList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {ccBtn ? (ccList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={ccList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {billsReceivableBtn ? (billsReceivableList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={billsReceivableList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {billsPayableBtn ? (billsPayableList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={billsPayableList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {openingStockBtn ? (openingStockList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={openingStockList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {openingTrailBalBtn ? (openingTrailBalList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={openingTrailBalList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }

            {daybookBtn ? (daybookList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={daybookList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {vtypeBtn ? (vtypeList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={vtypeList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div> : null
            }
            {gstLedgerBtn ? (gstLedgerList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={gstLedgerList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div>
                : null
            }
            {gstDataBtn ? (gstDataList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={gstDataList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div>
                : null
            }
            {stockJournalBtn ? (stockJournalList.length === 0 && searchClicked && dataFetched) ? <p className='no-data-found'>No Data Found...</p> :
                <div className='' style={{ paddingTop: "10px" }}>
                    <StickyTable className='tableLayout' stickyHeaderCount={1} stickyColumnCount={0} style={{ width: '100%' }}>
                        <TableListDiv columns={searchColumns} data={stockJournalList} Actions={postFilesAction} startFileDownloadFunc={startFileDownloadFunc} setHeight={parseFloat(heights) - 80} getIndex={4} filterBoxNone={''} rightBox={''} centerBox={''} callHeightFunc={callHeightFunc} paddingShort={2} getWidth={'100%'} actionClass={"actionTdDRUpload"} />
                    </StickyTable>
                </div>
                : null
            }
            <TransitionablePortal
                open={guidancePortal}
                transition={{ animation: 'scale', duration: 1000 }}
            >
                <Segment
                    className="guidance-for-file-list"
                >
                    <Grid>
                        <Grid.Column>
                            <Header className='guidanceHeader' >File Upload</Header>
                            <ul>
                                <li>Click on Upload on Top Right of Screen</li>
                                <li>Select the File type</li>
                                <li>Ledger Master, Item Master, Bills Payable, Bills Receivable File type should be ( .xml )</li>
                                <li>DayBook, Vtype, GST Data File type should be ( .xml )</li>
                                <li>GST Ledger & Opening Trial Balance File type should be ( .xlsx )</li>
                            </ul>
                            <Header className='guidanceHeader' >File Posting </Header>
                            <ul>
                                <li>Click on the Post button to consider the File for conversion into RealBooks format.</li>
                            </ul>
                            <Header className='guidanceHeader' >File Download</Header>
                            <ul>
                                <li>Click on File Name in ( Org Name ) Column to Download the File</li>
                            </ul>
                        </Grid.Column>
                    </Grid>
                    <Button floated='right' basic color='red' onClick={() => setGuidancePortal(false)} style={{ marginTop: "2%" }} >Close</Button>
                </Segment>
            </TransitionablePortal>

            <Modal size="large" open={displayStatus} style={{ marginTop: "50px" }} >
                <Modal.Header>
                    {
                        ledgerMasterBtn || itemMasterBtn || ccBtn || billsReceivableBtn || billsPayableBtn || openingStockBtn || openingTrailBalBtn || daybookBtn || vtypeBtn || gstLedgerBtn || gstDataBtn || stockJournalBtn ? <Header as='h2' align='left'> {uploadheader}<Button basic color='red' floated='right' onClick={() => setDisplayStatus(false)}>Close</Button></Header> : null
                    }

                </Modal.Header>
                <Modal.Content>
                    {
                        (openingTrailBalBtn || gstLedgerBtn) ?
                            <UploadXlsxFile gstLedgerBtn={gstLedgerBtn} openingTrailBalBtn={openingTrailBalBtn}
                                setDisplayStatus={setDisplayStatus} setUploadType={setUploadType} setFileUploaded={setFileUploaded} />
                            :
                            <UploadXmlFile
                                setDisplayStatus={setDisplayStatus} setUploadType={setUploadType} setFileUploaded={setFileUploaded}
                                ledgerMasterBtn={ledgerMasterBtn} itemMasterBtn={itemMasterBtn}
                                ccBtn={ccBtn} billsReceivableBtn={billsReceivableBtn} billsPayableBtn={billsPayableBtn}
                                openingStockBtn={openingStockBtn} daybookBtn={daybookBtn} vtypeBtn={vtypeBtn}
                                gstDataBtn={gstDataBtn} stockJournalBtn={stockJournalBtn}

                            />
                    }

                </Modal.Content>
            </Modal>
            <Modal open={postModalOpen} size="small">
                <Modal.Header>
                    {
                        ledgerMasterBtn || itemMasterBtn || ccBtn || billsReceivableBtn || billsPayableBtn || openingStockBtn || openingTrailBalBtn || daybookBtn || vtypeBtn || gstLedgerBtn || gstDataBtn || stockJournalBtn ? <Header as='h2'>{postheader}</Header> : null
                    }

                </Modal.Header>
                <Modal.Content>
                    <PostDateComponent setPostModalOpen={setPostModalOpen} setLoaderActive={setLoaderActive} setModalOpen={setModalOpen} postObj={postObj} setGstObj={setGstObj} setDateObj={setDateObj} />
                </Modal.Content>
            </Modal>
            <Modal open={postSuccessModalOpen.open} size="mini">
                <Modal.Header>Post Status</Modal.Header>
                <Modal.Content>
                    <h4>{postSuccessModalOpen.msg}</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="button" positive onClick={() => setPostSuccessModalOpen({ open: false, msg: "" })}>OK</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={uploadSuccessModalOpen} size="mini">
                <Modal.Header>Upload Status</Modal.Header>
                <Modal.Content>
                    <h4>File Uploaded Successfully</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="button" positive onClick={() => setUploadSuccessFunction()}>OK</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={filePendingModalOpen} size="mini">
                <Modal.Header>Status Pending</Modal.Header>
                <Modal.Content>
                    <h4>Please check file list for status</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="button" positive onClick={() => setFilePendingModalOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={downloadSuccessModalOpen.open} size="mini">
                <Modal.Header>Download Status</Modal.Header>
                <Modal.Content>
                    <h4>{downloadSuccessModalOpen.msg}</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="button" positive onClick={() => setDownloadSuccessModalOpen({ open: false, type: "", msg: "" })}>OK</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={unsyncModalOpen} size="mini">
                <Modal.Header>Unsync Status</Modal.Header>
                <Modal.Content>
                    <h4>Posted File is Unsynced</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="button" positive onClick={() => setUnsyncModalOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
            </div>
        </Container>
    )
}

export default FileList;