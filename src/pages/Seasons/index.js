/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { likeRecommendation, removeLikeRecommendation } from '../../api/SeasonService/index';
import * as AiIcons from 'react-icons/ai';
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import Button from "../../components/Button";
import { getRecommendation, getUser } from "../../api/apiService";
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import ReadMoreReact from 'read-more-react';

import {Container} from './style.js'

const Season = () => {
    const [recommendations, setRecommendation] = useState([]);

    const [user, setUser] = useState();

    const {
        user: { id: userId, email, profile, name: userName },
    } = useContext(AuthContext);

    console.log(useContext(AuthContext));

    const handleRemoveLike = async (id) => {
        await removeLikeRecommendation(id);
        await refreshRecomendationList();
    }

    const handleLike = async (id) => {
        await likeRecommendation(id);
        await refreshRecomendationList();
    }


    const fetchUser = async () => await getUser(email);
    const fetchRecommendation = async () => await getRecommendation();

    useEffect(async () => {
        refreshRecomendationList();
    }, [])

    const refreshRecomendationList = async () => {
        const { data } = await fetchRecommendation();
        setRecommendation(data);
    }

    return (
        <Container>
           
                <div id='addButton'>
                    <Link to="/recomendacao/adicionar">
                        {profile && profile === "lider-supremo" && (
                            <Button height={"h-full"} width={"w-22"} styleCustom={"rounded-xl"}>
                                Adicionar
                            </Button>
                        )} 
                    </Link>
                </div>
                {recommendations.length > 0 ? recommendations?.map(({ _id: seasonId, bookRecommended, description, likedList = [], user, seasonEndDate }) => {

                    return (

                        <div className='card'>
                           <div className="card-left">
                               <div id="imageBook">
                                <Link to={`livros/info/${bookRecommended._id}`} className="h-3/4">
                                        <img className="h-full" src={bookRecommended.image} />
                                    </Link>
                               </div>
                           </div>
                           <div className="card-right">
                                <div className="div-title">
                                    <h1> {bookRecommended.title}</h1>
                                </div>
                                <div className="div-description">
                                    <p>{description}</p>
                                </div>
                                <div className="div-footer">
                                    <div className="div-footer-left">
                                        <span>Recomendação até  {moment(seasonEndDate).format('DD-MM-YYYY')}</span>
                                    </div>
                                    <div className="div-footer-right">
                                        <div className='person'>
                                            <span>{user.name}</span>
                                            <span className='text-right ml-4'>{user.department}</span>
                                        </div>
                                        <img className='m-4 w-3/4 rounded-full h-1/4' src={user.pictureUrl || 'https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg'} />
                                        <ReactTooltip />
                                        <div
                                            style={{cursor: 'pointer'}}
                                            data-tip={`${likedList.length} pessoas curtiram esta recomendação`} 
                                            className={`${likedList.some(({ id }) => id === userId ) ? 'text-blue-800' : 'text-black-800'} mb-2 text-3xl bg-none`}>
                                            <AiIcons.AiFillLike onClick={() => { likedList.some(({ id }) => id === userId) ? handleRemoveLike(seasonId) : handleLike(seasonId) }} />
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    );
                }) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Sem recomendações para serem exibidas</h1></div>
                )}
         
            
        </Container>
    );
};

export default Season;
