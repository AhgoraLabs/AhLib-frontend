import React, { useState, useEffect } from 'react';
import ReportOptions from '../components/Reports';
import axios from 'axios';

const Report = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser ] = useState([])
    // const [reportData, setReportData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data: { data } } = await axios.get('http://localhost:5000/users');
            setUsers(data);
            console.log(user);
        })()
    }, [user])

    return (
        <>
            { <ReportOptions users={users} setUser={setUser}/>}

        </>
    )

}

export default Report;