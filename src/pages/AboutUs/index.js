import { Container } from "./styles";
import arrows1 from "./assets/arrows_1.png";
import arrows2 from "./assets/arrows_2.png";

//person
import pedro from "./assets/pedro_photo.png";
import pablo from "./assets/pablo_photo.png";
import bruno1 from "./assets/bruno1_photo.png";
import bruno2 from "./assets/bruno2_photo.png";
import joarle from "./assets/joarle_photo.png";

function AboutUs() {
    const team = [
        {
            name: "Pedro",
            role: "Desenvolvedor",
            photo: pedro,
            link: 'https://github.com/pedrosarkis',
        },
        {
            name: "Bruno",
            role: "Desenvolvedor",
            photo: bruno1,
            link: 'https://github.com/BrunoRodriguesNasc',
        },
        {
            name: "Joarle",
            role: "Implantador",
            photo: joarle,
            link: 'https://github.com/Joarle',
        },
        {
            name: "Pablo",
            role: "Desenvolvedor",
            photo: pablo,
            link: 'https://github.com/pablobion',
        },
        {
            name: "Bruno",
            role: "Suporte",
            photo: bruno2,
            link: 'https://github.com/correaa1',
        },
    ];

    return (
        <Container>
            <div id="header">
                <img src={arrows1} />
                <div id="header-container">
                    <h1>
                        O Ahlib é<h1 style={{ marginLeft: 15 }}>Open source</h1>
                    </h1>
                    <h2>Contribua com o nosso projeto e nos ajude a organizar os empréstimos de livro da Ahgora.</h2>
                    <a href="https://github.com/AhgoraLabs" target="_blank">
                        <button>GITHUB</button>
                    </a>
                </div>
                <img src={arrows2} />
            </div>
            <div id="team">
                <h1>Conheça a família Ahlib</h1>
                <div id="modals">
                    {team.map(elem => (
                        <div className="modal">
                            <a href={elem.link} target="_blank"><img href={elem.link} src={elem.photo}/></a>

                            <h1>{elem.name}</h1>
                            <h2>{elem.role}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default AboutUs;
