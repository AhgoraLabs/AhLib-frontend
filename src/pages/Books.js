import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import Box from '../components/Box';
import { totalStart } from '../utils/totalStar';
import { dados }  from '../utils/mock';
import { BiBookAdd, BiCommentEdit, BiTrashAlt } from "react-icons/bi";
import { IconContext } from 'react-icons';
const buttonsValues = [
    {
        name: 'Cadastrar',
        icon: <BiBookAdd className="w-12" />
    },
    {
        name: 'Editar',
        icon: <BiCommentEdit className="w-12" />
    },
    {
        name: 'Deletar',
        icon: <BiTrashAlt className="w-12" />
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
                {dados.map(({title , authors, star, image, coments, alugado}) => (
                   <Box title={title} authors={authors} star={totalStart(star)} image={image} coments={coments}  alugado={alugado}/>
                ))}
                </section>
                <aside className='w-56 h-large flex flex-col items-end'>
                    <IconContext.Provider value={{ color: '#fff' }}>
                        {buttonsValues.map(({ name, icon }) => (
                            <Button>
                                {icon}
                                <label>
                                    {name}
                                </label>
                            </Button>
                        ))}
                    </IconContext.Provider>
                </aside>
            </main>
        </div>
    )
}

export default Books
