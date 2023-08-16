import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Header,
  Form,
  Button,
  Grid,
  Dimmer,
  Loader,
  Image,
  Segment,
  Transition,
  Icon,
  Modal,
  TransitionablePortal,
  Checkbox,
} from "semantic-ui-react";
import * as select from "../data/selectors";
import CompanyDetailsComponent from "./companyDetailsForm";
import {
  clearDB,
  clearDBResponse,
  downloadAccount,
  downloadCC,
  downloadException,
  downloadExceptionOpeningStock,
  downloadIG,
  downloadInventory,
  downloadLG,
  downloadOB,
  downloadOpeningStock,
  downloadStockJournal,
  saveInputDataForConvert,
} from "../data/actions";
import userACL from "../../../store/access";
import {
  selectCompanyName,
  getIsSegmapFetched,
} from "../../segmap/data/selectors";
import { merge } from "lodash";
import { fetchSegmap } from "../../segmap/data/actions";

const DownloadDataForm = (props) => {
  const [type, setType] = useState(false);
  const [openClearDbModel, setOpenClearDbModel] = useState(false);
  const [chechBoxClicked, setChechBoxClicked] = useState(false);
  const [dbSuccesModal, setDbSuccesModal] = useState(false);
  const [startBtn, setStartBtn] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loaderActive, setLoaderActive] = useState(false);
  const [dbloaderActive, setDbLoaderActive] = useState(false);
  const [portal, setPortal] = useState(false);
  const dispatch = useDispatch();

  const dbCleared = useSelector((state) => select.getIsDbCleared(state, props));

  const LGDownloaded = useSelector((state) =>
    select.getIsLGDownloaded(state, props)
  );
  const IGDownloaded = useSelector((state) =>
    select.getIsIGDownloaded(state, props)
  );
  const OBDownloaded = useSelector((state) =>
    select.getIsOBDownloaded(state, props)
  );
  const CCDownloaded = useSelector((state) =>
    select.getIsCCDownloaded(state, props)
  );
  const OpeningStockDownloaded = useSelector((state) =>
    select.getIsOpeningStockDownloaded(state, props)
  );
  const stockJournalDownloaded = useSelector((state) =>
    select.getIsStockJournalDownloaded(state, props)
  );
  const vtypeDownloaded = useSelector((state) =>
    select.getIsVtypeDownloaded(state, props)
  );
  const exceptionOpeningStockDownloaded = useSelector((state) =>
    select.getIsExceptionOpeningStockDownloaded(state, props)
  );
  const accountDownloaded = useSelector((state) =>
    select.getIsAccountDownloaded(state, props)
  );
  const inventoryDownloaded = useSelector((state) =>
    select.getIsInventoryDownloaded(state, props)
  );
  const exceptionDownloaded = useSelector((state) =>
    select.getIsExceptionDownloaded(state, props)
  );
  const inputDataForConvert = useSelector((state) =>
    select.getIsInputDataForConvert(state, props)
  );
  const options = useSelector((state) => selectCompanyName(state, props));
  const companyNameFetched = useSelector((state) =>
    getIsSegmapFetched(state, props)
  );
  let data = merge({}, userACL.atFetch());

  const companyDetails = options.filter((item) => item.rlbSegid == data.segid);
  let companyName = companyDetails
    ? companyDetails.length > 0
      ? companyDetails[0].text
      : ""
    : "";

  useEffect(() => {
    if (!companyNameFetched) {
      let obj = {};
      obj.rlbCid = data.cid;
      obj.rlbSegid = data.segid;
      if (data) {
        dispatch(fetchSegmap(obj));
      }
    }
  }, []);

  // useEffect(() => {
  //     if (document.getElementsByClassName("markedMenuOpt") && document.getElementsByClassName("markedMenuOpt").length) {
  //         if (document.getElementsByClassName("markedMenuOpt")[0].classList) {
  //             document.getElementsByClassName("markedMenuOpt")[0].classList.remove("markedMenuOpt")
  //         }
  //     }
  //     let obj = document.getElementById("downloadpage");
  //     obj.classList.add("markedMenuOpt");
  // }, [])

  useEffect(() => {
    if (
      accountDownloaded ||
      inventoryDownloaded ||
      exceptionDownloaded ||
      LGDownloaded ||
      IGDownloaded ||
      OBDownloaded ||
      CCDownloaded ||
      OpeningStockDownloaded ||
      exceptionOpeningStockDownloaded ||
      stockJournalDownloaded ||
      vtypeDownloaded
    ) {
      setTimeout(() => {
        setLoaderActive(false);
      }, 500);
    }
  }, [
    accountDownloaded,
    inventoryDownloaded,
    exceptionDownloaded,
    LGDownloaded,
    IGDownloaded,
    OBDownloaded,
    CCDownloaded,
    OpeningStockDownloaded,
    exceptionOpeningStockDownloaded,
    stockJournalDownloaded,
    vtypeDownloaded,
  ]);

  const startDownloadOption = () => {
    setModalOpen(true);
    setPortal(false);
    dispatch(saveInputDataForConvert({}));
  };

  // functions for download  buttons

  const convertDownloadLG = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "LG";
      obj.used = inputDataForConvert.used;
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = "";
      dispatch(downloadLG(obj));
      setLoaderActive(true);
    }
  };

  const convertDownloadIG = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "IG";
      obj.used = inputDataForConvert.used;
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = "";
      dispatch(downloadIG(obj));
      setLoaderActive(true);
    }
    setLoaderActive(true);
  };

  const convertDownloadOB = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "OB";
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = inputDataForConvert.opening_date;
      dispatch(downloadOB(obj));
      setLoaderActive(true);
    }
  };

  const convertDownloadCC = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "CC";
      obj.used = inputDataForConvert.used;
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = "";
      dispatch(downloadCC(obj));
      setLoaderActive(true);
    }
  };

  const convertDownloadOpeningStock = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "opening_stock";
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = inputDataForConvert.opening_date;
      dispatch(downloadOpeningStock(obj));
      setLoaderActive(true);
    }
  };

  const convertDownloadExceptionOpeningStock = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "exception_opening_stock";
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = inputDataForConvert.opening_date;
      dispatch(downloadExceptionOpeningStock(obj));
      setLoaderActive(true);
    }
  };

  const convertDownloadAccount = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.company_name = inputDataForConvert.company_name;
      obj.fromdate = inputDataForConvert.fromdate;
      obj.todate = inputDataForConvert.todate;
      dispatch(downloadAccount(obj));
      setLoaderActive(true);
    }
  };

  const convertDownloadInventory = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.company_name = inputDataForConvert.company_name;
      obj.fromdate = inputDataForConvert.fromdate;
      obj.todate = inputDataForConvert.todate;
      dispatch(downloadInventory(obj));
      setLoaderActive(true);
    }
  };
  const convertDownloadException = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.company_name = inputDataForConvert.company_name;
      dispatch(downloadException(obj));
      setLoaderActive(true);
    }
  };

  const convertDownloadStockJournal = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "stck_jr";
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = inputDataForConvert.opening_date;
      dispatch(downloadStockJournal(obj));
      setLoaderActive(true);
    }
  };
  const convertDownloadVtypes = () => {
    if (inputDataForConvert) {
      let obj = {};
      obj.file_type = "vtype";
      obj.used = inputDataForConvert.used;
      obj.company_name = inputDataForConvert.company_name;
      obj.opening_date = inputDataForConvert.opening_date;
      dispatch(downloadStockJournal(obj));
      setLoaderActive(true);
    }
  };

  const clearDatabase = () => {
    let values = {};
    values.company_name = companyName;
    dispatch(clearDB(values));
    setDbLoaderActive(true);
    setOpenClearDbModel(false);
  };

  useEffect(() => {
    if (
      dbCleared.type === "success" ||
      dbCleared.type === "error" ||
      dbCleared.type === "Error"
    ) {
      setDbSuccesModal(true);
      setDbLoaderActive(false);
      dispatch(clearDBResponse({}));
    }
  }, [dbCleared]);

  const clearDataBaseBackFunc = () => {
    setOpenClearDbModel(false);
    setChechBoxClicked(false);
  };
  const closeDbSuccesModal = () => {
    setDbSuccesModal(false);
    setChechBoxClicked(false);
    // if (dbCleared.type === 'success') {
    //     setTimeout(() => {
    //         window.location.reload(false)
    //     }, 800)
    // }
  };

  const onClicked = (checked) => {
    if (checked === true) {
      setChechBoxClicked(true);
    } else {
      setChechBoxClicked(false);
    }
  };
  return (
    <Container>
      <div className="downloadpage_container">
        {loaderActive && (
          <Dimmer active>
            <Loader indeterminate>Preparing Files</Loader>
          </Dimmer>
        )}
        {dbloaderActive && (
          <Dimmer active>
            <Loader indeterminate>Clearing Files</Loader>
          </Dimmer>
        )}
        <Grid>
          <Grid.Column width={11}>
            <div className="contentCenterHeader">
              <Header as="h2">Convert And Download</Header>
            </div>
            {startBtn ? (
              <div
                className="contentCenterBtn"
                onClick={() => startDownloadOption()}
              >
                <Button
                  inverted
                  color="green"
                  size="small"
                  style={{ padding: "15px 35px", borderRadius: "50px" }}
                  icon
                  labelPosition="right"
                >
                  <Icon name="power off" />
                  Start
                </Button>
              </div>
            ) : null}

            <div className="downloadBtnPadding">
              <Grid className="gridPadding">
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Header as="h2" basic color="green">
                        Masters
                      </Header>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Header as="h2" color="green">
                        Openings
                      </Header>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Header as="h2" basic color="green">
                        Transactions
                      </Header>
                    </Transition>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid className="gridPadding">
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadLGButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadLG()}
                      >
                        <Icon name="download" />
                        Ledger and Ledger Groups
                      </Button>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadOBButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadOB()}
                      >
                        <Icon name="download" />
                        Opening Balance
                      </Button>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadAccButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadAccount()}
                      >
                        <Icon name="download" />
                        Accounting Vouchers
                      </Button>
                    </Transition>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid className="gridPadding">
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadIGButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadIG()}
                      >
                        <Icon name="download" />
                        Item and Item Groups
                      </Button>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadOBButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadOpeningStock()}
                      >
                        <Icon name="download" />
                        Opening Stock
                      </Button>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadInvButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadInventory()}
                      >
                        <Icon name="download" />
                        Inventory Vouchers
                      </Button>
                    </Transition>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid className="gridPadding">
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadOBButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadCC()}
                      >
                        <Icon name="download" />
                        Cost Center Master
                      </Button>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadOBButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadExceptionOpeningStock()}
                      >
                        <Icon name="download" />
                        Exception Opening Stock
                      </Button>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadExcepButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadException()}
                      >
                        <Icon name="download" />
                        Exception Vouchers
                      </Button>
                    </Transition>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid className="gridPadding">
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadExcepButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadVtypes()}
                      >
                        <Icon name="download" />
                        Voucher Types
                      </Button>
                    </Transition>
                  </Grid.Column>
                  <Grid.Column width={5}></Grid.Column>
                  <Grid.Column width={5}>
                    <Transition
                      visible={visible}
                      animation="scale"
                      duration={500}
                    >
                      <Button
                        className="downloadExcepButton"
                        size="tiny"
                        basic
                        color="blue"
                        icon
                        labelPosition="right"
                        onClick={() => convertDownloadStockJournal()}
                      >
                        <Icon name="download" />
                        Stock And Journal
                      </Button>
                    </Transition>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>

            <Grid>
              <Grid.Column width={5}></Grid.Column>
              <Grid.Column width={5}>
                <Transition visible={visible} animation="scale" duration={500}>
                  <Button
                    className="clearBtn"
                    inverted
                    color="red"
                    icon
                    labelPosition="right"
                    onClick={() => setOpenClearDbModel(true)}
                  >
                    <Icon name="trash" />
                    Clear DB
                  </Button>
                </Transition>
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column width={5} floated="right">
            <Button
              size="medium"
              content={"Guidance For Download"}
              basic
              color="blue"
              style={{ marginLeft: "25%" }}
              onClick={() => setPortal(!portal)}
            />
            <TransitionablePortal
              open={portal}
              transition={{ animation: "scale", duration: 1000 }}
            >
              <Segment className="guidance-for-dc-segment">
                <Grid>
                  <Grid.Column>
                    <Header className="guidanceHeader">Start Button</Header>
                    <ul>
                      <li>
                        For Convert and Download the File please click on Start
                      </li>
                    </ul>
                    <ul>
                      <li> Fill All The Inputs and Save</li>
                    </ul>
                    <Header className="guidanceHeader">Download Buttons</Header>
                    <ul>
                      <li>
                        Click on File Type for Download the Converted File
                      </li>
                    </ul>
                  </Grid.Column>
                </Grid>
                <Button
                  floated="right"
                  basic
                  color="red"
                  onClick={() => setPortal(false)}
                  style={{ marginTop: "2%" }}
                >
                  Close
                </Button>
              </Segment>
            </TransitionablePortal>
          </Grid.Column>
        </Grid>

        <Modal open={isModalOpen} size="small">
          <Modal.Header>
            <Header as="h2">
              Inputs For Data Conversion
              <Button
                basic
                color="red"
                floated="right"
                onClick={() => setModalOpen(false)}
              >
                Close
              </Button>
            </Header>
          </Modal.Header>
          <Modal.Content>
            <CompanyDetailsComponent
              setVisible={setVisible}
              setStartBtn={setStartBtn}
              setModalOpen={setModalOpen}
              setDbLoaderActive={setDbLoaderActive}
            />
          </Modal.Content>
        </Modal>

        <Modal
          open={openClearDbModel}
          size="small"
          onClose={() => clearDataBaseBackFunc()}
        >
          <Modal.Header style={{ color: "red" }}>
            Clear All Records
          </Modal.Header>
          <Modal.Content>
            <h4>
              <span style={{ color: "#2185d0" }}>Tally Company</span> :
              {companyName}
            </h4>
            <Checkbox
              label="I am agree to delete All Data of Above Mentioned Company"
              onClick={(e, { checked }) => onClicked(checked)}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              stype={{ paddingRight: "20px" }}
              type="button"
              inverted
              color="green"
              onClick={() => clearDataBaseBackFunc()}
            >
              Back
            </Button>
            {chechBoxClicked ? (
              <Button type="submit" color="red" onClick={() => clearDatabase()}>
                Ok
              </Button>
            ) : (
              <Button disabled type="submit" color="red">
                Ok
              </Button>
            )}
          </Modal.Actions>
        </Modal>

        <Modal open={dbSuccesModal} size="mini">
          <Modal.Header>Data Base Clear Status</Modal.Header>
          <Modal.Content>
            {dbCleared.type === "error" ? (
              <h4 style={{ color: "red" }}>
                {dbCleared ? dbCleared.data : ""}
              </h4>
            ) : (
              <h4>{dbCleared ? dbCleared.data : ""}</h4>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button
              stype={{ paddingRight: "20px" }}
              type="button"
              color="green"
              onClick={() => closeDbSuccesModal(false)}
            >
              Ok
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </Container>
  );
};

export default DownloadDataForm;
