import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as ImIcons from 'react-icons/im';



export const SideBarData = [
    {
        title: 'Home',
        path: '/Home',
        icon: <AiIcons.AiFillHome />,
        cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`
    },
    {
        title: 'Relatórios',
        path: '/relatorios',
        icon: <IoIcons.IoIosPaper />,
        cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`
    },
    {
        title: 'Livros',
        path: '/livros',
        icon: <ImIcons.ImBooks />,
        cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`
    },
    {
        title: 'Equipe',
        path: '/Home',
        icon: <IoIcons.IoMdPeople />,
        cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`
    },
    {
        title: 'Sugestões',
        path: '/sugestoes',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`
    },
    {
        title: 'Suporte',
        path: '/Home',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`
    },
]
