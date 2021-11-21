import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as ImIcons from 'react-icons/im';



export const SideBarData = [
    {
        title: 'Painel',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Relatórios',
        path: '/relatorios',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Livros',
        path: '/livros',
        icon: <ImIcons.ImBooks />,
        cName: 'nav-text'
    },
    {
        title: 'Equipe',
        path: '/equipe',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Mensagens',
        path: '/mensagens',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: 'Suporte',
        path: '/suporte',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
]
