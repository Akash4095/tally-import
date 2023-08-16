import { merge } from "lodash";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Icon } from "semantic-ui-react";
import userACL from "../../../store/access";
import { TALLY_URL } from "../../../store/path";
import { post } from "axios";

const fileTypes = ["xml", "XML"];

function DragDrop(props) {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [error, setError] = useState(false);
    const [uploadSuccess, setUploadedSuccess] = useState(false);
    const [uploadMsg, setUploadMsg] = useState('No files uploaded yet');
    let data = merge({}, userACL.atFetch())

    const handleChange = (fileObj) => {
        props.setWaiting(true)
        const url = TALLY_URL + "/xml/file-upload";
        const formData = new FormData();
        let obj = {}
        obj.cid = data.cid
        obj.segid = data.segid
        obj.file_type = fileType
        let jsonObj = JSON.stringify(obj)
        formData.append("file", fileObj);
        formData.append("payload", jsonObj);
        const config = { crossDomain: true, headers: { 'Content-Type': 'application/json' } };
        return post(url, formData, config).then(response => {
            if (response) {
                props.setUploadType(fileType)
                console.log('response', response)
                props.setWaiting(false)
                if (response.data.hello == "error") {
                    setError(true)
                    setUploadMsg(fileObj.name + " : Uploaded with errors!")
                    props.setWaiting(false)
                } else {

                    setUploadMsg(fileObj.name + " : Successfully Uploaded!")
                    setUploadedSuccess(true)
                    props.setDisplayStatus(false)
                    props.setFileUploaded(true)
                    props.setWaiting(false)

                }
            }
            props.setWaiting(true)
        });;

    };



    useEffect(() => {
        if (props.ledgerMasterBtn) {
            setFileType("ledger_master")
            props.setSelectFileMsg(" Please Upload Files (.xml)")

        }
        if (props.itemMasterBtn) {
            setFileType("item_master")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.ccBtn) {
            setFileType("cc_master")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.billsReceivableBtn) {
            setFileType("bills_receivable")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.billsPayableBtn) {
            setFileType("bills_payable")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.openingStockBtn) {
            setFileType("opening_stock")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.daybookBtn) {
            setFileType("daybook")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.vtypeBtn) {
            setFileType("vtypes")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.gstDataBtn) {
            setFileType("gst_data")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
        if (props.stockJournalBtn) {
            setFileType("stck_jr")
            props.setSelectFileMsg(" Please Upload Files (.xml)")
        }
    }, [props.ledgerMasterBtn, props.itemMasterBtn, props.ccBtn, props.billsReceivableBtn, props.billsPayableBtn, props.openingStockBtn, props.daybookBtn, props.vtypeBtn, props.gstDataBtn, props.stockJournalBtn])

    const typeErrorFunc = (err) => {
        setError(true)
        setUploadMsg("Only Xml files are allowed")
    }
    return (
        <>
            <FileUploader
                name="file"
                handleChange={handleChange}
                types={fileTypes}
                maxSize={10000}
                onTypeError={(err) => typeErrorFunc(err)}
                children={<div className="ewqTBN"><Icon name='file' size="large"></Icon> Click here or Drag file here</div>}

            />
            {
                error ? <p style={{ marginLeft: "25%", paddingTop: "25px", fontSize: "16px", color: "red" }}>{uploadMsg}</p>
                    :
                    uploadSuccess ?
                        <p style={{ marginLeft: "25%", paddingTop: "25px", fontSize: "16px", color: "green" }}>{uploadMsg}</p>
                        :
                        <p style={{ marginLeft: "25%", paddingTop: "25px", fontSize: "16px", }}>{uploadMsg}</p>

            }

        </>
    );
}

export default DragDrop;