import React, { useState, useEffect } from 'react';
import ReportOptions from '../components/Reports';
import axios from 'axios';

const urlBase = !window.location.host.includes('netlify') ? 'http://localhost:5000' : 'https://ahlibs.rj.r.appspot.com'

const Report = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([])
    // const [reportData, setReportData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data: { data } } = await axios.get(`${urlBase}/users`);
            setUsers(data);
        })()
    }, [user])

    return (
        <>
            {<ReportOptions users={users} setUser={setUser} />}

        </>
    )

}

export default Report;