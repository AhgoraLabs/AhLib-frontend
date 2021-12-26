import React, { useState, useEffect } from 'react';
import ReportOptions from '../components/Reports';
import axios from 'axios';

const Report = () => {
    const [users, setUsers] = useState([]);
    // const [reportData, setReportData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data: { data } } = await axios.get('http://localhost:5000/users');
            setUsers(data);
        })()
    }, [])

    return (
        <>
            { <ReportOptions users={users} />}

        </>
    )

}

export default Report;