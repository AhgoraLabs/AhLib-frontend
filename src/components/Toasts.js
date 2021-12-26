import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ type, msg, open, setToastData }) {
    setTimeout(() => {
        setToastData({})
    }, 6000);

    const msgType = (type) => ({
        [type === 'error']: <Alert severity="error">{msg}</Alert>,
        [type === 'warning']: <Alert severity="warning">{msg}</Alert>,
        [type === 'info']: <Alert severity="info">{msg}</Alert>,
        [type === 'success']: <Alert severity="success">{msg}</Alert>,
    })[true]


    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000}>
                {msgType(type)}
            </Snackbar>
        </Stack>
    );
}
