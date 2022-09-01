import React, { useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as ImIcons from "react-icons/im";

import AuthContext from "../../context/auth/AuthContext";


const NavOptions = () => {

    const {
        user: { email, profile },
    } = useContext(AuthContext);

    let SideBarData = [
        {
            title: "Dashboard",
            path: "/Home",
            icon: <AiIcons.AiFillHome />,
            cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
        },
        {
            title: "Solicitação",
            path: "/requests",
            icon: <IoIcons.IoMdPeople />,
            cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
            admin: true,
        },
        {
            title: "Gerenciar empréstimos",
            path: "/emprestimos",
            icon: <IoIcons.IoMdPeople />,
            cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
            admin: true,
        },
        // {
        //     title: "Relatórios",
        //     path: "/relatorios",
        //     icon: <IoIcons.IoIosPaper />,
        //     cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
        // },
        {
            title: "Livros",
            path: "/livros",
            icon: <ImIcons.ImBooks />,
            cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
        },
        {
            title: "Recomendações",
            path: "/recomendacao",
            icon: <IoIcons.IoMdPeople />,
            cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
        },
        {
            title: "Sugestões",
            path: "/sugestoes",
            icon: <FaIcons.FaEnvelopeOpenText />,
            cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
        },
        {
            title: "Sair",
            onClick: () => {
                window.localStorage.clear();
            },
            path: "/",
            icon: <IoIcons.IoMdLogOut />,
            cName: `flex justify-start items-center py-2 pl-4 list-none h-14 hover:bg-blue`,
        }
    ];

    const isAdmin = profile === 'admin' || profile === 'super';

    return isAdmin ? SideBarData : SideBarData.filter(option => option.admin === false || !option.admin );
}



export default NavOptions;