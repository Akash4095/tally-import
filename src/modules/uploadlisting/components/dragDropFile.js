import { merge } from "lodash";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Icon } from "semantic-ui-react";
import userACL from "../../../store/access";
import { TALLY_URL } from "../../../store/path";
import { post } from "axios";

const fileTypes = ["exe"];

function DragDrop(props) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const [uploadedSuccess, setUploadedSuccess] = useState(false);
    const [uploadMsg, setUploadMsg] = useState('No files uploaded yet');
    let data = merge({}, userACL.atFetch())

    const handleChange = (fileObj) => {
        // console.log('fileObj', fileObj)
        props.setWaiting(true)
        const url = TALLY_URL + "/exe/exes3upload";
        const formData = new FormData();
        formData.append("file", fileObj);
        formData.append("realesename", props.releaseName);
        formData.append("key", props.keyName);
        const config = { crossDomain: true, headers: { 'Content-Type': 'application/json' } };

        if (fileObj != null) {
            if (props.releaseName !== "" && props.keyName !== "") {
                return post(url, formData, config).then(response => {
                    if (response) {
                        console.log('response', response.data)
                        if (response.data.type === "error") {
                            setError(true)
                            setUploadMsg(response.data.msg)
                            props.setWaiting(false)
                        } else {
                            setError(false)
                            setUploadedSuccess(true)
                            setUploadMsg("File Uploaded")
                            props.setDisplayStatus(false)
                            props.setFileUploaded(true)
                            props.setWaiting(false)

                        }
                    }
                    // props.setWaiting(true)
                });;
            }
            else {
                props.setWaiting(false)
                props.setReleaseModal(true)
            }
        }



    };



    const typeErrorFunc = (err) => {
        setError(true)
        setUploadMsg("Only Exe files are allowed")
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