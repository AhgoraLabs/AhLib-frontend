import React from 'react';
import { styled, Box } from '@mui/system';
import { Modal } from '@mui/material';


import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Rating } from '@mui/material';
import { createComment } from '../api/apiService';

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    height: 300,
    border: '2px solid #000',
    backgroundColor: '#fff',
    p: 2,
    px: 4,
    pb: 3,
};


export default function ModalAdd({ open, setOpen, bookId, getComments }) {

    const { register, handleSubmit, control, setValue } = useForm();

    const closeModal = () => {
        setOpen(false)
    }

    const onSubmit = async (data) => {
        await createComment({
            id: bookId,
            comment: data.comment,
            stars: data.rating,
            user: {
                email: localStorage.getItem('@App:email')
            }
        });
        setOpen(false)
        getComments(bookId)
    };

    const setRating = data => {
        setValue('rating', data.target.value);
    };
    return (
        <div id='modal'>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={closeModal}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <h1 className='text-lg bold'>Adicione um comentário</h1>
                    <form className="flex flex-col h-full justify-evenly" onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            className='w-full border-blue-500'
                            name='comment'
                            placeholder='Comentário'
                            type='text'
                            {...register('comment')}
                        />
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={3}
                            rules={{ required: true }}
                            render={() => <Rating name="rating" onChange={setRating} />}
                        />

                        <div className='flex justify-center'>
                            <Button sx={{ width: '100px' }} variant='contained' type='submit'>Salvar</Button>
                        </div>
                    </form>

                </Box>
            </StyledModal>
        </div>
    );
}
