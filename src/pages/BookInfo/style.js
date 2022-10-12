import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: whitesmoke;
    margin-top:  10vh;
    margin-bottom:  30vh;

    @media(max-width: 900px){
            margin-top: 200px;
        }

    #modal {
        width: 90%;
        min-height: 80%;

        display: flex;
        border: 1px solid gray;
        border-radius: 10px;
        background-color: white;
        box-shadow: 1px 1px 5px 2px lightgray;
        border: 1px solid lightgray;

        @media(max-width: 900px){
            flex-direction: column;
        }
        
        #modal-left {
            width: 30%;
            border-radius: 10px 0px 0px 10px;


            @media(max-width: 900px){
                border-radius: 10px 10px 0px 0px;
                width: 100%;
            }

            #imageBook {
                width: 140px;
                height: 220px;
                border-radius: 15px;
                position: relative;
                top: 0;
                margin-top: -40px;
                margin-bottom: 30px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                transition: all 0.5s;

                &:hover {
                    transform: translateY(-8px);
                }
            }
        }

        #modal-right {
            width: 70%;
            border-radius: 0px 10px 10px 0px;
            #infos {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 250px;
                @media(max-width: 900px){
                    justify-content: center;
                    align-items: center;
                    justify-content: space-around;
                }
                h1 {
                    height: 35px;
                    font-size: 1.8rem;
                    @media(max-width: 900px){
                        font-size: 16px;
                        font-weight: 500;
                        text-align: center;
                    }
                }

                h2 {
                    height: 35px;
                    font-size: 1.3rem;
                    @media(max-width: 900px){
                        font-size: 14px;
                        font-weight: 400;
                    }
                }
            }

            #votes {
                display: flex;
                align-items: center;
            }

            @media(max-width: 900px){
                border-radius: 0px 0px 10px 10px;
                width: 100%;
            }

            #boxes {
                display: flex;
                margin-bottom: 20px;
               
                .box {
                    height: 130px;
                    width: 130px;
                    border-radius: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    
                    box-shadow: 1px 1px 5px 2px lightgray;

                    h1 {
                        text-align: center;
                    }

                }

                @media(min-width: 900px){
                    .box + .box {
                        margin-left: 50px;
                    }
                    padding: 20px;
                }

                @media(max-width: 900px){
                    flex-wrap: wrap;
                    justify-content: center;
                    .box  {
                        margin: 10px;

                    }
                }
            }

            #comments {
                @media (max-width: 900px){
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            #description {
                width: 100%;
                padding: 20px 50px 20px 0px;
                @media (max-width: 900px){
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 20px 20px 20px;
                }
            }
           
        }
    }
    
    
`;