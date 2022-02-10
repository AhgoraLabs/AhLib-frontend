import styled from "styled-components";

export const Container = styled.div`
    height: 85vh;

    #header {
        display: flex;
        justify-content: space-between;
        font-size: 40px;

        #header-container {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            h1 {
                display: flex;
                font-size: 60px;
                font-weight: bold;
                h1 {
                    color: #ff3c78;
                    font-weight: bold;
                }
            }

            h2 {
                color: gray;
                text-align: center;
                font-size: 32px;
                margin: 0px 40px 0px 20px;
                width: 50vw;
            }

            button {
                background-color: #335aff;
                padding: 10px 30px 10px 30px;
                border-radius: 10px;
                color: white;
                font-size: 24px;
                margin-top: 30px;
                cursor: pointer;
            }
        }
    }

    #team {
        margin-top: 80px;
        display: flex;
        align-items: center;
        flex-direction: column;

        h1 {
            font-size: 60px;
            color: #494949;
            display: flex;
            align-items: center;
            h1 {
                color: #ff3c78;
            }
        }

        #modals {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 40px;

            .modal {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.35);
                border-radius: 10px;
                padding: 20px;
                height: 220px;
                margin: 30px;
                img {
                    border-radius: 50%;
                    width: 120px;
                    height: 120px;
                }
                h1 {
                    font-size: 24px;
                    font-weight: bold;
                    color: #494949;
                    margin-top: 10px;
                }
                h2 {
                    font-weight: bold;
                    color: gray;
                }
            }
        }
    }
`;
