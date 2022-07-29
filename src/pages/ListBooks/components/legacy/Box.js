/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { getCommentsById, getLoanByBookId } from "../../../api/apiService";
import { totalStars } from "../../../utils/totalStar";
import CircularProgress from "@mui/material/CircularProgress";

import NoImage from "../../../components/NoImageBook";

const Box = ({ title, image, bookId, averageStars, isBookLoaned }) => {
    const [loan, setLoan] = useState({});
    const [votes, setVotes] = useState([]);
    const [isLoading, setLoading] = useState(true);


    setTimeout(() => {
        setLoading(false);
    }, 600);

    return (
        <div onClick={() => (window.location = `/livros/info/${bookId}`)} className="h-80 w-56 m-4 mx-10 cursor-pointer bg-white border border-gray-100 rounded-3xl shadow-input-box-shadow">
            <div className="flex justify-center">
                {image ? <div style={{ backgroundImage: `url(${image})` }} className="flex justify-center h-48 w-44 mt-4 bg-no-repeat bg-contain bg-center "></div> : <NoImage title={title} />}
            </div>
            <div className={`truncate text-center m-1 flex  flex-col items-center ${title.length > 15 ? "break-words" : " capitalize"}`}>
                <label className="break-words w-40" style={{textColor: 'red'}}>{title.split(":")[0]}</label>
                <div>
                    {isLoading ? (
                        <div className="font-thin flex items-center justify-center">
                            <CircularProgress size={20} />
                        </div>
                    ) : (
                        <div className={`${isBookLoaned ? "text-base font-thin text-danger font-medium" : " text-base font-thin text-textbook font-medium"} text-center `}>{isBookLoaned ? "alugado" : "Livre"}</div>
                    )}
                </div>
                {averageStars > 0 && <Rating name="half-rating-read" defaultValue={averageStars} precision={0.5} readOnly />}
            </div>
        </div>
    );
};

export default Box;
