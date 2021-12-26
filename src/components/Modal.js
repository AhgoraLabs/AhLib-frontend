import React, { useEffect } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from './Button';

const StyledModal = styled(ModalUnstyled)`
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
  height: 200,
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};


export default function ModalUnstyledDemo({ open, setOpen, removeBook }) {
  const closeModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) blurEverythingElse();
    else unblurEverything();

  }, [open])

  const blurEverythingElse = () => {
    document.querySelectorAll(':not(#modal):not(.MuiBox-root css-li7oki):not(html):not(body)').forEach(element => element.style.filter = "blur(2px)");
  }

  const unblurEverything = () => {
    document.querySelectorAll('*').forEach(element => element.style.filter = '');
  }
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
          <h1 className='text-lg bold'>Exclusão de livro</h1>
          <p>Tem certeza que deseja excluir o registro? Essa ação não poderá ser desfeita</p>
          <div className='flex justify-evenly mt-5'>
            <Button onClick={removeBook} width="w-18" height="h-8" fontSize="text-base">Sim</Button>
            <Button onClick={closeModal} width="w-18" height="h-8" fontSize="text-base">Cancelar</Button>
          </div>

        </Box>
      </StyledModal>
    </div>
  );
}
