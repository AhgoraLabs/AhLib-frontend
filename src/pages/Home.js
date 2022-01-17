import React, { useState } from 'react'
import Button from '../components/Button';
import Input from '../components/Input'


const Home = () => {
    const [names, setNames] = useState(['Pedro', 'João', 'Joarle', 'Pablo', 'Jheny']);
    const [clickedTimes, setClickedTimes] = useState(0);
    const [text, setText] = useState('');


    const handleClick = (e) => {
        setNames()
    }

    const handleType = (e) => {
        setText(e.target.value);
    }

    return (
        <div>

            <h1> O botão foi clicado {clickedTimes} vezes </h1>
            <Button onClick={handleClick} > Clique  em mim</Button>

            {/* {names.map(name => {
                return (
                    <Input value={name}/>
                )
            })} */}
            {names.length > 4 && names[1]}
        </div>
    )
}

export default Home
