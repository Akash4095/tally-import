import { merge } from "lodash";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Icon } from "semantic-ui-react";
import userACL from "../../../store/access";
import { TALLY_URL } from "../../../store/path";
import { post } from "axios";

const fileTypes = ["xlsx", "xls", "XLSX", "XLS"];

function DragDrop(props) {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [error, setError] = useState(false);
    const [uploadedSuccess, setUploadedSuccess] = useState(false);
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
        if (fileObj != null) {
            return post(url, formData, config).then(response => {
                if (response) {
                    props.setUploadType(fileType)
                    console.log('response', response)
                    if (response.data.hello == "error") {
                        setError(true)
                        setUploadMsg(fileObj.name + " : Uploaded with errors!")
                        props.setWaiting(false)
                    } else {

                        setUploadedSuccess(true)
                        setUploadMsg(fileObj.name + " : Successfully Uploaded!")
                        props.setDisplayStatus(false)
                        props.setFileUploaded(true)
                        props.setWaiting(false)

                    }
                }
                props.setWaiting(true)
            });;
        }


    };



    useEffect(() => {
        if (props.openingTrailBalBtn) {
            setFileType("opening_Trail_balance")
            props.setSelectFileMsg(" Please Upload Files (.xlsx, .xls)")
        }

        if (props.gstLedgerBtn) {
            setFileType("gst_ledger")
            props.setSelectFileMsg(" Please Upload Files (.xlsx, .xls)")
        }

    }, [props.openingTrailBalBtn, props.gstLedgerBtn])

    const typeErrorFunc = (err) => {
        setError(true)
        setUploadMsg("Only Xlsx / Xls files are allowed")
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
                error ? <p style={{ marginLeft: "28%", paddingTop: "10px", fontSize: "16px", color: "red" }}>{uploadMsg}</p>
                    :
                    uploadedSuccess ?
                        <p style={{ marginLeft: "28%", paddingTop: "10px", fontSize: "16px", color: "green" }}>{uploadMsg}</p>
                        :
                        <p style={{ marginLeft: "28%", paddingTop: "10px", fontSize: "16px", }}>{uploadMsg}</p>

            }

        </>
    );
}

export default DragDrop;