/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { getCommentsById, getLoanByBookId } from "../api/apiService";
import { totalStars } from "../utils/totalStar";
import CircularProgress from "@mui/material/CircularProgress";

import NoImage from "../components/NoImageBook";

const Box = ({ title, image, bookId }) => {
    const [loan, setLoan] = useState({});
    const [votes, setVotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const fetchLoan = async () => {
        let loanInformation = await getLoanByBookId(bookId);
        setLoan(loanInformation);
    };

    const getTotalRating = async () => {
        const response = await getCommentsById(bookId);
        const data = response.map(({ stars }) => stars);
        setVotes(data);
    };

    setTimeout(() => {
        setLoading(false);
    }, 600);

    useEffect(() => {
        getTotalRating();
        fetchLoan();
    }, []);

    return (
        <div onClick={() => (window.location = `/livros/info/${bookId}`)} className="h-80 w-56 m-4 mx-10 cursor-pointer bg-white border border-gray-100 rounded-3xl shadow-input-box-shadow">
            <div className="flex justify-center">
                {image ? <div style={{ backgroundImage: `url(${image})` }} className="flex justify-center h-48 w-44 mt-4 bg-no-repeat bg-contain bg-center "></div> : <NoImage title={title} />}
            </div>
            <div className={`truncate text-center m-1 flex  flex-col items-center ${title.length > 28 ? "text-xs capitalize break-normal" : " capitalize"}`}>
                <label>{title.split(":")[0]}</label>
                <div>
                    {isLoading ? (
                        <div className="font-thin flex items-center justify-center">
                            <CircularProgress size={20} />
                        </div>
                    ) : (
                        <div className={`${loan ? "text-base font-thin text-danger font-medium" : " text-base font-thin text-textbook font-medium"} text-center `}>{loan ? "alugado" : "Livre"}</div>
                    )}
                </div>
                {votes.length > 0 && <Rating name="half-rating-read" defaultValue={totalStars(votes)} precision={0.5} readOnly />}
            </div>
        </div>
    );
};

export default Box;
