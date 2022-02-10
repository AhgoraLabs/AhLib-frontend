import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelectCheckmarks({ users, setUser, placeholder }) {

    const usersToShow = users.map(({ name, email }) => { return { email, name } });
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(

            typeof value === 'string' ? value.split(',') : value,
        );
    };

    setUser(personName.toString());

    return (
        <div>
            <FormControl sx={{ m: 1, width: 420 }}>
                <InputLabel id="demo-multiple-checkbox-label">{placeholder || 'Selecionar usuários'}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label={ placeholder || "Selecionar usuários"} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {usersToShow.map(({name, email }) => (
                        <MenuItem key={email} value={email}>
                            <Checkbox checked={personName.indexOf(email) > -1} />
                            <ListItemText primary={email} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
