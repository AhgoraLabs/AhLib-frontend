import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import Box from '../components/Box';
import { Link } from 'react-router-dom';
import { totalStars } from '../utils/totalStar';
import { dados } from '../utils/mock';
import { BiBookAdd } from "react-icons/bi";
import { IconContext } from 'react-icons';
const buttonsValues = [
    {
        name: 'Cadastrar',
        path: '/livros/cadastrar',
        icon: <BiBookAdd className="w-12" />
    }
]

const Books = () => {
    return (
        <div>
            <header className='w-full flex justify-center h-32 items-center'>
                <Input placeholder={'Pesquisar'} />
            </header>
            <main className=' w-full flex justify-between'>
                <section className='w-56 h-large'>
                </section>
                <section className='w-8/12 h-large flex justify-center flex-row flex-wrap'>
                    {dados.map(({ id, title, authors, star, image, coments, alugado }) => (
                        <Link to={`livros/bookInfo/${id}`}>
                            <Box title={title} authors={authors} star={totalStars(star)} image={image} coments={coments} alugado={alugado} />
                        </Link>
                    ))}
                </section>
                <aside className='w-56 h-large flex flex-col items-end'>
                    <IconContext.Provider value={{ color: '#fff' }}>
                        {buttonsValues.map(({ name, icon, path }) => (
                            <Link to={path}>
                                <Button>
                                    {icon}
                                    <label>
                                        {name}
                                    </label>
                                </Button>
                            </Link>
                        ))}
                    </IconContext.Provider>
                </aside>
            </main>
        </div>
    )
}

export default Books
