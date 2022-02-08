import React, { useEffect, useMemo, useState } from 'react'
import app from '../app/Ahlib.apk';

function Download() {

    useEffect(()=>{
        document.getElementById('downloadApp').click()
    },[])

    return (
        <div>
            <a id='downloadApp' href={app} download="Ahlib">
                <button type="button"></button> 
            </a> 
        </div>
    );
    
}
export default Download;