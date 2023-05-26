import React, { useEffect, useState } from "react";
import { styled, Box } from "@mui/system";
import { Modal } from '@mui/material';




import Button from "./Button";
import { Rating } from "@mui/material";
import { getCommentsById } from "../api/apiService";
import ModalAdd from "./ModalAdd";

const StyledModal = styled(Modal)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Backdrop = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
`;

const style = {
    width: 600,
    height: 700,
    border: "2px solid #000",
    display: "flex",
    flexDirection: "column",
    p: 2,
    px: 4,
    pb: 3,
    backgroundColor: "#fff",
    textAlign: "center",
    overflow: "auto",
};

export default function ModalComments({ open, setOpen, bookId, currentComments }) {

    const [comments, setComments] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpen(false);
    };

    const openModalAddComments = () => {
        setOpenModal(!openModal);
    };

    const getComments = async bookId => {
        const comments = await getCommentsById(bookId);
        setComments(comments);
    };

    useEffect(() => {
        if (open) blurEverythingElse();
        else unblurEverything();
        setComments(currentComments);
    }, [open, currentComments]);

    useEffect(() => { });
    const blurEverythingElse = () => {
        document.querySelectorAll(":not(#modal):not(.MuiBox-root css-li7oki):not(html):not(body)").forEach(element => (element.style.filter = "blur(2px)"));
    };

    const unblurEverything = () => {
        document.querySelectorAll("*").forEach(element => (element.style.filter = ""));
    };
    return (
        <div id="modal-comments">
            <ModalAdd open={openModal} setOpen={setOpenModal} bookId={bookId} getComments={getComments} />
            <StyledModal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={open} onClose={closeModal} BackdropComponent={Backdrop}>
                <Box sx={style}>
                    <h1 className="text-lg bold">Comentários</h1>

                    <div className="flex justify-evenly mt-5 flex-col">
                        {comments.length > 0 &&
                            comments.map(comment => (
                                <div className="bg-secondary w-full flex flex-col mb-4">
                                    <div className="text-left pl-4 py-4">
                                        <h3>{comment.by}</h3>
                                    </div>
                                    <div className="flex items-center pl-4  py-4">
                                        <Rating defaultValue={comment.stars} readOnly></Rating>
                                        <span className="pl-4 font-bold">{comment.comment}</span>
                                    </div>
                                </div>
                            ))}
                        <div className="flex justify-center">
                            <Button width="w-24" height="h-8" fontSize="text-l" onClick={openModalAddComments}>
                                Adicionar
                            </Button>
                        </div>
                    </div>
                </Box>
            </StyledModal>
        </div>
    );
}
