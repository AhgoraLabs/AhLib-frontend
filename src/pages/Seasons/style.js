import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    @media (min-width: 900px) {
        padding: 30px 15%;
    }

    .card {
        display: flex;
        width: 100%;
        margin-bottom: 80px;
        border-radius: 10px;
        background-color: white;
        box-shadow: 1px 1px 5px 1px lightgray;
        padding: 10px;

        @media (max-width: 900px) {
            flex-direction: column;
        }

        .card-left {
            width: 15%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            @media (max-width: 900px) {
                width: 100%;
            }

            #imageBook {
                width: 140px;
                height: 160px;
                border-radius: 10px;
                position: relative;
                top: 0;
                margin-top: -50px;
                margin-bottom: 10px;
                margin-left: 30px;
            }
        }

        .card-right {
            width: 85%;
            height: 100%;
            padding: 5px;
            display: flex;
            flex-direction: column;

            @media (max-width: 900px) {
                width: 100%;
            }

            .div-title {
                width: 100%;
                font-weight: 400;
                h1 {
                    font-size: 1.7vw;
                    @media (max-width: 900px) {
                        font-size: 14px;
                        text-align: center;
                    }
                }
            }

            .div-description{
                

                @media (max-width: 900px) {
                    order: 3;
                    height: 100px;
                }

                p {
                    font-size: 16px;
                    @media (max-width: 500px) {
                        font-size: 3.5vw;
                        text-align: center;
                    }
                    color: #494949;
                    margin-top: 10px;
                   
                }
            }

            .div-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
               
                @media (max-width: 900px) {
                    flex-direction: column;
                    margin-top: 20px;
                    order: 2;
                }
                .div-footer-left {
                    span {
                        font-weight: 500;
                    }
                }
                .div-footer-right {
                    display: flex;
                    align-items: center;
                    .person {
                        display: flex;
                        flex-direction: column
                        
                    }
                    img {
                        width: 50px;
                        height: 50px;
                    }
                }
            }
        }
    }

    #addButton {
        height: 40px;
        margin-bottom: 30px;

        @media (max-width: 900px) {
            margin-bottom: 60px;
        }
    }
`;
