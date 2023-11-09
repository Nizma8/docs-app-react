import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Add() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius:'12px',
        p: 4,
      };
  return (
  
    <>
      
    <div className='w-screen h-screen flex-col '>
        <h1 className="text-3xl font-bold  text-center mt-5">
         DOCS APP
        </h1>
    <div className='flex justify-center items-center'>
        <button className=" px-3 py-1 shadow-lg rounded-lg mt-5 hover:bg-yellow-500" onClick={handleOpen}> <i className='fa-solid fa-plus'></i>Add Button</button>
    </div>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
                    <input
                        placeholder='Add the Title'
                        className='add-input'
                    />

                    <button className=' bg-cyan-600 block mt-5 px-3 py-1 ml-64 text-white rounded-sm'>
                        Add
                    </button>
                
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default Add