import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 85vh;
    border: 1px solid;


    #menu {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 40px;
        width: 100%;
    }

    #table {
        width: 100%;
        height: 77vh;
        padding: 10px 15%;
        overflow: auto;    
        margin-top: 10px;
    }

    .card {
        .card-left {
            font-size: 18px;
            width: 80%;
            display: flex;
            flex-direction: column;

            .person-name {
                display: flex;
                align-items: center;
            }

            .book-name {
                margin-bottom: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid gray;
                display: flex;
                align-items: center;
            }

            .date {
                display: flex;
                align-items: center;
            }
        }
        display: flex;
        border: 1px solid gray;
        border-radius: 10px; 
        padding: 10px;
        box-shadow: 0px 2px 5px 1px gray;
        margin-bottom: 20px;
    }

    .div-buttons{
        display: flex;
    }
`;