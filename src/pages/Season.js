/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import style from "styled-components";
import { BidivAdd } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import Button from "../components/Button";
import { getRecommendation, getUser } from "../api/apiService";
import moment from 'moment';

const Season = () => {
    const [recommendations, setRecommendation] = useState([]);

    const [user, setUser] = useState();

    const {
        user: { email },
    } = useContext(AuthContext);


    const fetchUser = async () => await getUser(email);
    const fetchRecommendation = async () => await getRecommendation();

    useEffect(async () => {
        const { data } = await fetchRecommendation();
        const user = email ? await fetchUser() : "";
        setUser(user.data);
        setRecommendation(data);
    }, [email])

    return (
        <div className="flex justify-center flex-col items-center h-full w-screen font-poppins">
            <div className="w-4/5 h-full">
                {recommendations?.map(({ bookRecommended, description, user, seasonEndDate }) => {
                    console.log(seasonEndDate, 'seasonEnd')
                    return (
                        <div className="flex m-4 sm:h-card h-96 justify-between shadow-sm rounded-xl border-gray-100 bg-white">
                            <div className="w-1/5 flex h-full justify-center items-center lg:flex hidden">
                                <img className="h-3/4" src={bookRecommended.image} />
                            </div>
                            <div className="lg:w-3/4 w-4/4 flex flex-col justify-between">
                                <div>
                                    <h2 className="lg:text-left text-center mt-6 tracking-wider text-3xl">{bookRecommended.title}</h2>
                                </div>
                                <div>
                                    <span>
                                        <p className="lg:text-base text-sm mt-4 tracking-wider text-ellipsis overflow-hidden lg:p-0 px-4">{description}</p>
                                    </span>
                                </div>
                                <div className="w-full sm:h-1/4 sm:mt-4 mt-2 flex sm:justify-end justify-center items-end ">
                                    <div className="lg:h-full flex justify-between w-full items-center md:p-0 p-4 mb-2 md:text-base text-sm sm:flex-row flex-col translate-x-2.5 translate-y-7">
                                        <div>
                                            <span>Recomendação até  {moment(seasonEndDate).format('DD-MM-YYYY')}</span>
                                        </div>
                                        <div className="lg:flex-col flex flex-row">
                                            <span>{user.name}</span>
                                            <span className='text-right ml-4'>{user.department}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-18 flex justify-end items-end lg:flex hidden'>
                                <img className='m-4 w-3/4 rounded-full h-1/4' src={user.pictureUrl || 'https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg'} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-4/5 h-12 flex justify-end px-4 m-4">
                <Link to="/recomendacao/adicionar">
                    {user && user?.profile === "lider-supremo" && (
                        <Button height={"h-full"} width={"w-22"} styleCustom={"rounded-xl"}>
                            Adicionar
                        </Button>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Season;
