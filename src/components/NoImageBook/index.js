import styled from "styled-components";

function NoImageBook(props) {
    const Title = styled.h1`
        font-size: 1.5em;
        text-align: center;
        color: black;
    `;

    const NoImage = styled.p`
        width: 150px;
        height: 190px;
        border-radius: 3px;
        position: relative;
        top: 0;
        padding: 5px;
        padding-top: 70px;
        font-size: 10px;
        text-align: center;
        margin-top: 20px;
        background-color: ${props => (props.color ? props.color : "lightblue")};
    `;

    const randomColor = {
        0: "#FFCB00",
        1: "#FF8A00",
        2: "#FF5E00",
        3: "#F1948A",
        4: "#D2B4DE",
        5: "#A9CCE3",
        6: "#A3E4D7",
        7: "#F9E79F",
        8: "#F5CBA7",
        9: "#CCD1D1",
        10: "#52BE80",
    };

    return (
        <>
            <NoImage color={randomColor[Math.floor(Math.random() * 10)]}>
                <Title>{props.title}</Title>
            </NoImage>
        </>
    );
}

export default NoImageBook;
