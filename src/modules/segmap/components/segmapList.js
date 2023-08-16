import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSaved, deleteSegmap, fetchSegmap, setNotifyDone } from "../data/actions";
import {
    Header,
    Table,
    TableBody,
    Container,
    TableHeader,
    Button,
    Modal,
    Grid,
    Checkbox,
    TransitionablePortal,
    Segment,
    Icon,
} from "semantic-ui-react";
import { getFilteredSegmap } from "../data/selectors";
import { TableListDiv } from "./tableListDiv";
import { StickyTable, Row, Cell } from "react-sticky-table";
import { heightSet, rowBodyHeightSet } from "../../../utilities/heightSet";
import Notification from "../../../utilities/notificationUtils";
import { searchColumns } from "../data/model";
import * as select from "../data/selectors";
import { Link } from "react-router-dom";
import userACL from "../../../store/access";
import { merge } from "lodash";
import { clearDB } from "../../downloadpage/data/actions";

const SegmapList = (props) => {
    const [heights, setHeight] = useState("");
    const [copied, setCopied] = useState(false);
    const [getBodyHeight, setGetBodyHeight] = useState("");
    const segmap = useSelector((state) => getFilteredSegmap(state));
    const isSavedUpdated = useSelector(state => select.getIsSaved(state, props))
    const [segmapId, setSegmapId] = useState("");
    const [segmapRow, setSegmapRow] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [segmentDeleteModel, setSegmentDeleteModel] = useState(false);
    const [chechBoxClicked, setChechBoxClicked] = useState(false);
    const [showAccKey, setShowAccKey] = useState({ open: false, msg: "" });
    const data = merge({}, userACL.atFetch());

    const dispatch = useDispatch();

    useEffect(() => {
        let obj = {};
        obj.rlbCid = data.cid;
        obj.rlbSegid = data.segid
        if (data) {
            dispatch(fetchSegmap(obj));
        }
    }, []);

    useEffect(() => {
        if (isSavedUpdated) {
            let obj = {};
            obj.rlbCid = data.cid;
            obj.rlbSegid = data.segid
            dispatch(fetchSegmap(obj));
            dispatch(clearSaved());
        }
    }, [isSavedUpdated])

    // useEffect(() => {
    //     if (
    //         document.getElementsByClassName("markedMenuOpt") &&
    //         document.getElementsByClassName("markedMenuOpt").length
    //     ) {
    //         if (document.getElementsByClassName("markedMenuOpt")[0].classList) {
    //             document
    //                 .getElementsByClassName("markedMenuOpt")[0]
    //                 .classList.remove("markedMenuOpt");
    //         }
    //     }
    //     let obj = document.getElementById("segmap");
    //     obj.classList.add("markedMenuOpt");
    // }, []);

    const callHeightFunc = () => {
        heightSet(setHeight);
        rowBodyHeightSet(setGetBodyHeight);
    };

    const deleteSegmentFromList = (values) => {
        const getVlaue = { id: values.id };
        userACL.atUpdate(getVlaue);
        dispatch(deleteSegmap(getVlaue));

        let obj = {};
        obj.company_name = values.companyName;

        dispatch(clearDB(obj));
        setSegmentDeleteModel(false);
    };

    const segmapActions = ({ object: segmapObj }) => {
        return (
            <>
                <Link to={"/segmap/edit/" + segmapObj.id}>Edit</Link>
                <span>&nbsp;&nbsp;</span>
                <span
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                        setSegmentDeleteModel(true);
                        setSegmapRow(segmapObj);
                        setSegmapId(segmapObj.id);
                    }}
                >
                    Delete
                </span>
            </>
        );
    };
    const onClicked = (checked) => {
        if (checked === true) {
            setChechBoxClicked(true);
        } else {
            setChechBoxClicked(false);
        }
    };
    const segmentDelBackFunc = () => {
        setSegmentDeleteModel(false);
        setChechBoxClicked(false);
    };

    const viewAccessKey = (row) => {
        setShowAccKey({ open: true, msg: row.id });
    };

    const closeAccessKeyModal = () => {
        setShowAccKey({ open: false, msg: "" });
        setCopied(false);
    }
    const copyToClipboard = (msg) => {
        navigator.clipboard.writeText(msg).then(() => {
            console.log("accessKey=", msg)
        }).catch((err) => {
            console.log("clipboard copy err", err);
        });
        setCopied(true);
    };

    return (
        <Container>
            <div className='segmap_cart_container'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={9}>
                            <Header as="h2" align="left">
                                Segmap List
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div className="" style={{ paddingTop: "10px" }}>
                    <StickyTable
                        className="tableLayout"
                        stickyHeaderCount={1}
                        stickyColumnCount={0}
                        style={{ width: "100%" }}
                    >
                        <TableListDiv
                            columns={searchColumns}
                            data={segmap}
                            Actions={segmapActions}
                            viewAccessKey={viewAccessKey}
                            setHeight={parseFloat(heights) - 140}
                            getIndex={5}
                            filterBoxNone={"5,"}
                            rightBox={""}
                            centerBox={""}
                            callHeightFunc={callHeightFunc}
                            paddingShort={2}
                            getWidth={"100%"}
                            actionClass={"actionTdDR"}
                        />
                    </StickyTable>
                </div>
                <>
                    {segmapId ? (
                        <Notification
                            id={segmapId}
                            notifySelector={select.getNotification}
                            notifyDoneAction={setNotifyDone}
                            type="delete"
                        />
                    ) : null}
                </>

                {/* <Modal open={isModalOpen} size="mini">
                <Modal.Header>Segmap List</Modal.Header>
                <Modal.Content>
                    <h4>Do you want to delete this row</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="button" positive onClick={() => setModalOpen(false)}>No</Button>
                    <Button type="button" color='red' onClick={() => { deleteSegmentFromList(segmapId) }}>Yes</Button>
                </Modal.Actions>
            </Modal> */}
                <Modal open={segmentDeleteModel} size="small">
                    <Modal.Header style={{ color: "re" }}>
                        Clear Segment Records
                    </Modal.Header>
                    <Modal.Content>
                        <h4>
                            {" "}
                            <span style={{ color: "red" }}>
                                You are deleteing a Segment that means this operation will delete
                                the segment mapping and all transactions, that can not be
                                reverted.
                            </span>
                        </h4>
                        <Checkbox
                            label="I understood"
                            onClick={(e, { checked }) => onClicked(checked)}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            stype={{ paddingRight: "20px" }}
                            type="button"
                            color="green"
                            onClick={() => segmentDelBackFunc()}
                        >
                            No
                        </Button>
                        {chechBoxClicked ? (
                            <Button
                                type="submit"
                                color="red"
                                onClick={() => deleteSegmentFromList(segmapRow)}
                            >
                                Yes
                            </Button>
                        ) : (
                            <Button disabled type="submit" color="red">
                                Yes
                            </Button>
                        )}
                    </Modal.Actions>
                </Modal>
                <Modal
                    open={showAccKey.open}
                    size="mini"
                // onClose={() => closeAccessKeyModal()}
                >
                    <Modal.Header>
                        Access Key
                        <p
                            className="copyBtn"
                            title="Copy"
                            onClick={() => copyToClipboard(showAccKey.msg)}
                        >
                            {
                                copied ? <span > <Icon color="blue" name="check" />Copied </span> :
                                    <Icon color="blue" name="copy" />
                            }
                        </p>
                    </Modal.Header>
                    <Modal.Content>
                        <p>{showAccKey.msg}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            stype={{ paddingRight: "20px" }}
                            type="button"
                            basic
                            color="red"
                            onClick={() => closeAccessKeyModal()}
                        >
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </Container>
    );
};

export default SegmapList;
