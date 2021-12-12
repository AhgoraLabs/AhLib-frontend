import React from 'react'
import Table from '../components/SimpleTable'
import reportOptions from '../utils/reportOptions'

const Reports = () => {

    return (
        <>
            <div className='container mx-auto'>
                <Table options={reportOptions} />
            </div>

        </>
    )
}

export default Reports
