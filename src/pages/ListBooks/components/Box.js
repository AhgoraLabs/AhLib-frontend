/* eslint-disable react-hooks/exhaustive-deps */
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import React, { useState } from "react";
import styled from "styled-components";
import NoImage from "../../../components/NoImageBook";



const BoxContainer = styled.div`
    border: 1px solid lightgray;
    width: 13rem;
    height: 20rem;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 10px 5px 2px lightgray;
    margin: 35px 25px;
    cursor: pointer;
    transition: all 0.5s;
    background-color: ghostwhite;

    &:hover {
        border: 2px solid lightgray;
        transform: translateY(-8px);
    }

    #imageBook {
        width: 140px;
        height: 220px;
        border-radius: 10px;
        position: relative;
        top: 0;
        margin-top: -40px;
        margin-bottom: 10px;
    }

    #titleBook {
        color: black;
        text-transform: capitalize;
        cursor: pointer;
    }
`;


const Box = ({ title, image, bookId, averageStars, isBookLoaned, isBookBooked }) => {
    const [isLoading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 600);

    return (
        <BoxContainer onClick={() => (window.location = `/livros/info/${bookId}`)} >
            <div className="flex justify-center">
                {image ?  <img id="imageBook" src={image} /> : <NoImage title={title} />}
            </div>

            <div className={` text-center m-1`}> 
                <div>
                    {isLoading ? (
                        <div className="font-thin flex items-center justify-center">
                            <CircularProgress size={20} />
                        </div>
                    ) : (
                        <div className={`${isBookLoaned ? "text-base font-thin text-danger font-medium" : isBookBooked ? "text-base font-thin text-yellow-700 font-medium" :  "text-base font-thin text-textbook font-medium"} text-center `}>{isBookLoaned ? "alugado" : isBookBooked ? "Reservado" : "Livre"}</div>
                    )}
                </div>
                <label id="titleBook"> {title.split(":")[0]}</label>
                {averageStars > 0 && <Rating name="half-rating-read" defaultValue={averageStars} precision={0.5} readOnly />}
            </div>
        </BoxContainer>
    );
};

export default Box;
