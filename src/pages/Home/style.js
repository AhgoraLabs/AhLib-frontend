import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 85vh;
    padding: 20px 50px;

    @media (max-width: 900px) {
        padding: 10px ;
    }

    #header {
        padding-left: 7px;
        margin-bottom: 15px;
        #title {
            font-size: 3vw;
            @media (max-width: 900px) {
                font-size: 20px;
            }
        }

        #subtitle {
            font-size: 2vw;
            color: '#494949';
            @media (max-width: 900px) {
                font-size: 18px;
            }
        }
    }

`;

export const Dashboard = styled.div`
    width: 100%;
    height: 90%;
    display: flex;

    @media (max-width: 900px) {
        flex-direction: column;
    }
        
    #right {
        width: 70%;
        height: 90%;

        @media (max-width: 900px) {
            width: 100%;
        }

        #top {
            display: flex;
            width: 100%;
            height: 50%;
            justify-content: space-around;
            align-items: center;
            background-color: white;
            border-radius: 15px;

            @media (max-width: 900px) {
                flex-direction: column;
                height: 100%;
                margin-bottom: 20px;
            }
            box-shadow: 1px 1px 5px 1px lightgray;
        }
        #bottom {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            width: 100%;
            height: 50%;
            border-radius: 15px;
            box-shadow: 1px 1px 5px 1px lightgray;

            @media (min-width: 900px) {
                margin-top: 10px;
            }

            img {
                width: 50%;
            }
        }
    }
    #left {
        background-color: white;
        width: 30%;
        height: 91.5%;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        box-shadow: 1px 1px 5px 1px lightgray;
        
        @media (min-width: 900px) {
            margin-left: 10px;
        }

        @media (max-width: 900px) {
            width: 100%;
            margin-top: 20px;
        }

        #title {
            font-size: 1.7vw;
            @media (max-width: 900px) {
                font-size: 20px;
            }
        }

        #infos {
            h3 {
                margin: 10px;
                display: flex;
                align-items: center;
            }
        }

        #qrcode {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 50px;

            h1 {
                font-size: 20px;
            }
        }
    }
`;