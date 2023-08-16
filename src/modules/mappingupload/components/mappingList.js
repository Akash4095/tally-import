import { merge } from "lodash";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Header,
  Button,
  Modal,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import userACL from "../../../store/access";
import { heightSet, rowBodyHeightSet } from "../../../utilities/heightSet";
import {
  fetchFileList,
  saveFileDownloadInitialRes,
  startFileDownload,
} from "../../filelist/data/actions";
import {
  deleteMappingList,
  downloadMappingTemplate,
  fetchMappingList,
  setNotifyDone,
  clearSingleMappingRes,
} from "../data/action";
import { searchColumns, searchColumnsFile } from "../data/model";
import {
  getFilteredFileList,
  getFilteredMappingList,
  getIsMappingUploadFetched,
  getMappingUploadList,
  getNotification,
  getSaveResponse,
} from "../data/selectors";
import {
  getIsFileDownloadStarted,
  getIsFileListFetched,
} from "../../filelist/data/selectors";
import MappingUpload from "./mappingUpload";
import { MappingTableListDiv } from "./tableListDiv";
import { TableListDiv } from "../../filelist/components/tableListDiv";
import { StickyTable, Row, Cell } from "react-sticky-table";
import MappindEdit from "./mappindEdit";
import Notification from "../../../utilities/notificationUtils";
import MappindAdd from "./mappingAdd";
import { toast } from "react-toastify";

const MappingList = (props) => {
  const [header, setHeader] = useState("Upload File List");
  const [heights, setHeight] = useState("");
  const [getBodyHeight, setGetBodyHeight] = useState("");
  const [mapList, setMapList] = useState(false);
  const [fileList, setFileList] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [mappingEditModal, setMappingEditModal] = useState({
    open: false,
    data: "",
  });
  const [mappingAddModal, setMappingAddModal] = useState({
    open: false,
    data: "",
  });
  const [uploadSuccessModalOpen, setUploadSuccessModalOpen] = useState(false);
  const [downloadSuccessModalOpen, setDownloadSuccessModalOpen] = useState({
    open: false,
    type: "",
    msg: "",
  });
  const [mappingDeleteModal, setMappingDeleteModal] = useState({
    open: false,
    msg: "",
  });
  const [loaderActive, setLoaderActive] = useState(false);
  const data = merge({}, userACL.atFetch());
  const date = new Date();
  const todayDate = moment(date).format("YYYY-MM-DD");

  const dispatch = useDispatch();

  const mappingList = useSelector((state) =>
    getFilteredMappingList(state, props)
  );
  const fileListData = useSelector((state) =>
    getFilteredFileList(state, props)
  );
  const isMappingFetched = useSelector((state) =>
    getIsMappingUploadFetched(state, props)
  );
  const isFileListFetched = useSelector((state) =>
    getIsFileListFetched(state, props)
  );
  const startFileDownloadRes = useSelector((state) =>
    getIsFileDownloadStarted(state)
  );
  const savedRes = useSelector((state) =>
    getSaveResponse(state, props)
  );

  const callHeightFunc = () => {
    heightSet(setHeight);
    rowBodyHeightSet(setGetBodyHeight);
  };

  useEffect(() => {
    let obj = {};
    obj.cid = data.cid;
    dispatch(fetchMappingList(obj));
    setFileList(true);
    let values = {};
    if (data) {
      values.fromdt = todayDate;
      values.todt = todayDate;
      values.cid = data.cid;
      values.segid = data.segid;
      dispatch(fetchFileList(values));
    }
  }, []);

  useEffect(() => {
    if (fileUploaded) {
      setTimeout(() => {
        setUploadSuccessModalOpen(true);
        let values = {};
        if (data) {
          values.fromdt = todayDate;
          values.todt = todayDate;
          values.cid = data.cid;
          values.segid = data.segid;
          dispatch(fetchFileList(values));
        }
        let obj = {};
        obj.cid = data.cid;
        dispatch(fetchMappingList(obj));
      }, 1000);
    }
  }, [fileUploaded]);

  const setUploadSuccessFunction = () => {
    setUploadSuccessModalOpen(false);
    setFileUploaded(false);
  };

  const showUploadList = () => {
    setMapList(true);
    setFileList(false);
    setHeader("Mapping List");
  };

  const showFileList = () => {
    setFileList(true);
    setMapList(false);
    setHeader("Upload File List");
  };
  const editMappingData = (obj) => {
    setMappingEditModal({ open: true, data: obj });
  };

  const deleteMappingEntry = (row) => {
    dispatch(deleteMappingList(row));
    setDeleteId(row.id);
    setMappingDeleteModal({ open: false, msg: "" });
  };

  const mappingAction = ({ object: obj }) => {
    return (
      <>
        <span
          style={{ cursor: "pointer", color: "#4183C4" }}
          onClick={() => editMappingData(obj)}
        >
          Edit
        </span>
        <span>&nbsp;&nbsp;</span>
        <span
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => setMappingDeleteModal({ open: true, msg: obj })}
        >
          Delete
        </span>
      </>
    );
  };

  const startFileDownloadFunc = (obj) => {
    if (obj) {
      dispatch(startFileDownload(obj));
      setDownloading(true);
    }
  };

  useEffect(() => {
    if (startFileDownloadRes) {
      if (
        startFileDownloadRes.type === "success" ||
        startFileDownloadRes.type === "Success"
      ) {
        setTimeout(() => {
          setDownloading(false);
          setDownloadSuccessModalOpen({
            open: true,
            type: "success",
            msg: "Please Wait Until it gets Downloaded by the Browser.",
          });
        });
      }
      if (
        startFileDownloadRes === "error" ||
        startFileDownloadRes === "Error"
      ) {
        setTimeout(() => {
          setDownloading(false);
          setDownloadSuccessModalOpen({
            open: true,
            type: "error",
            msg: startFileDownloadRes,
          });
          dispatch(saveFileDownloadInitialRes({}));
        }, 600);
      }
    }
  }, [startFileDownloadRes]);

  useEffect(() => {
    if (savedRes) {
      if (savedRes.type === "success") {
        toast.success(savedRes.msg)
        dispatch(clearSingleMappingRes())
      }
      if (savedRes.type === "error") {
        toast.error(savedRes.msg)
        dispatch(clearSingleMappingRes())
      }
    }
  }, [savedRes])

  const templateDownload = () => {
    dispatch(downloadMappingTemplate());
  };

  const filesListAction = ({ object: postObj }) => {
    return <></>;
  };

  return (
    <Container>
      <Grid id="headContent">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" align="left">
              {header}
            </Header>
          </Grid.Column>
          <Grid.Column width={8}>
            {fileList ? (
              <>
                <Button
                  onClick={() => setDisplayStatus(true)}
                  color="green"
                  floated="right"
                >
                  Upload
                </Button>
                <Button
                  onClick={() => templateDownload()}
                  color="blue"
                  floated="right"
                >
                  Mapping Template Download
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setDisplayStatus(true)}
                  basic
                  color="green"
                  floated="right"
                  disabled
                >
                  Upload
                </Button>
                <Button
                  onClick={() => templateDownload()}
                  color="blue"
                  floated="right"
                >
                  Mapping Template Download
                </Button>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div className="mapping_upload_container">
        {downloading && (
          <Dimmer active>
            <Loader active>Downloading File</Loader>
          </Dimmer>
        )}
        <Grid>
          <Grid.Row>
            <Grid.Column>
              {fileList ? (
                <Button
                  size="mini"
                  color="blue"
                  style={{ marginRight: "10px", padding: "8px 18px" }}
                  onClick={() => showFileList()}
                >
                  Upload File List
                </Button>
              ) : (
                <Button
                  size="mini"
                  basic
                  color="grey"
                  style={{ marginRight: "10px", padding: "8px 18px" }}
                  onClick={() => showFileList()}
                >
                  Upload File List
                </Button>
              )}
              {mapList ? (
                <Button
                  size="mini"
                  color="blue"
                  style={{ marginRight: "10px", padding: "8px 18px" }}
                  onClick={() => showUploadList()}
                >
                  Mapping List
                </Button>
              ) : (
                <Button
                  size="mini"
                  basic
                  color="grey"
                  style={{ marginRight: "10px", padding: "8px 18px" }}
                  onClick={() => showUploadList()}
                >
                  Mapping List
                </Button>
              )}
              {mapList ? (
                <Button
                  floated="right"
                  color="green"
                  size="mini"
                  style={{ marginRight: "10px", padding: "8px 18px" }}
                  onClick={() => setMappingAddModal({ open: true, data: "" })}
                >
                  Add Mapping
                </Button>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {fileList ? (
          <div className="" style={{ paddingTop: "10px" }}>
            <TableListDiv
              columns={searchColumnsFile}
              data={fileListData}
              Actions={filesListAction}
              dataFetched={isFileListFetched}
              startFileDownloadFunc={startFileDownloadFunc}
              setHeight={parseFloat(heights) - 90}
              getIndex={5}
              filterBoxNone={""}
              rightBox={""}
              centerBox={""}
              callHeightFunc={callHeightFunc}
              paddingShort={2}
              getWidth={"100%"}
              actionClass={"mappingActionTdr"}
            />
          </div>
        ) : null}
        {mapList ? (
          <div className="" style={{ paddingTop: "10px" }}>
            <MappingTableListDiv
              columns={searchColumns}
              data={mappingList}
              Actions={mappingAction}
              dataFetched={isMappingFetched}
              setHeight={parseFloat(heights) - 90}
              getIndex={3}
              filterBoxNone={""}
              rightBox={""}
              centerBox={""}
              callHeightFunc={callHeightFunc}
              paddingShort={2}
              getWidth={"100%"}
              actionClass={"mappingActionTdr"}
            />
          </div>
        ) : null}
      </div>

      <>
        {deleteId ? (
          <Notification
            id={deleteId}
            notifySelector={getNotification}
            notifyDoneAction={setNotifyDone}
            type="delete"
          />
        ) : null}
      </>

      <Modal size="large" open={displayStatus} style={{ marginTop: "50px" }}>
        <Modal.Header>
          {
            <Header as="h2" align="left">
              Mapping Upload
              <Button
                basic
                color="red"
                floated="right"
                onClick={() => setDisplayStatus(false)}
              >
                Close
              </Button>
            </Header>
          }
        </Modal.Header>
        <Modal.Content>
          <MappingUpload
            setDisplayStatus={setDisplayStatus}
            setFileUploaded={setFileUploaded}
          />
        </Modal.Content>
      </Modal>
      <Modal open={uploadSuccessModalOpen} size="mini">
        <Modal.Header>Upload Status</Modal.Header>
        <Modal.Content>
          <h4>File Uploaded Successfully</h4>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="button"
            positive
            onClick={() => setUploadSuccessFunction()}
          >
            OK
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal open={downloadSuccessModalOpen.open} size="mini">
        <Modal.Header>Download Status</Modal.Header>
        <Modal.Content>
          <h4>{downloadSuccessModalOpen.msg}</h4>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="button"
            positive
            onClick={() =>
              setDownloadSuccessModalOpen({ open: false, type: "", msg: "" })
            }
          >
            OK
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal open={mappingEditModal.open} size="small">
        <Modal.Header>
          Edit Mapping Entry
          <Button
            size="mini"
            basic
            color="red"
            floated="right"
            onClick={() => setMappingEditModal({ open: false, data: "" })}
          >
            Close
          </Button>
        </Modal.Header>
        <Modal.Content>
          <MappindEdit
            mappingEditModal={mappingEditModal}
            setMappingEditModal={setMappingEditModal}
          />
        </Modal.Content>
      </Modal>
      <Modal open={mappingAddModal.open} size="small">
        <Modal.Header>
          Add Mapping Entry
          <Button
            size="mini"
            basic
            color="red"
            floated="right"
            onClick={() => setMappingAddModal({ open: false, data: "" })}
          >
            Close
          </Button>
        </Modal.Header>
        <Modal.Content>
          <MappindAdd
            mappingAddModal={mappingAddModal}
            setMappingAddModal={setMappingAddModal}
          />
        </Modal.Content>
      </Modal>
      <Modal open={mappingDeleteModal.open} size="mini">
        <Modal.Header>Mapping List</Modal.Header>
        <Modal.Content>
          <h4>Do you want to delete this row</h4>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="button"
            color="green"
            onClick={() => setMappingDeleteModal({ open: false, msg: "" })}
          >
            No
          </Button>
          <Button
            type="button"
            color="red"
            onClick={() => deleteMappingEntry(mappingDeleteModal.msg)}
          >
            yes
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default MappingList;
