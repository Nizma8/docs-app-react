import React, { useEffect, useState,useRef } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';


function Add({database}) {
    const [open, setOpen] = React.useState(false);
    const[title,setTitle]=useState("")
    const [displayTitle,setDisplayTitle]=useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
  const params = useParams()
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
      const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      const collectionref = collection(database,"titleDoc")
      const isMounted = useRef()
const addId =(id)=>{
    navigate(`/edit/${id}`)

}
      const addData=()=>{
        addDoc(collectionref,{
          title:title
         
        }).then(()=>{alert("Data Added"); handleClose()}).catch((err)=>console.log(err))
      }

      const deleteData = (id)=>{
        const documentref = doc(collectionref,id)
        deleteDoc(documentref).then(()=>{alert("document succesfully deleted")}).catch((err)=>{console.log(err);})
      }

      // to get data in realtime 
      const getData = () => {
        onSnapshot(collectionref,(data)=>{
          setDisplayTitle(data.docs.map((doc)=>{
            return {...doc.data(),id:doc.id}
          }));
        })
    }
console.log(displayTitle);
   useEffect(() => {
    if(isMounted.current){
        return 
    }
    isMounted.current = true;
    getData()
}, [])
  return (
   
    <>
    <div className='w-screen h-screen flex-col '>
        
    <div className='flex justify-center items-center'>
        <button className=" px-5 py-4 shadow rounded-lg mt-5 hover:bg-blue-200" onClick={handleOpen}> <i className='fa-solid fa-plus'></i>Add Button</button>
    </div>

    <div className="grid gap-5  lg:grid-cols-4  lg:gap-3  md:grid-cols-3 md:gap-4 md:ms-5 md:mt-5 lg:mt-5 lg:ms-5 mx-5 my-3">
{    

displayTitle?.map(title=>{
  return(
<Card sx={{ minWidth: 275,maxHeight:275 }} key={title.id}  >
      <CardContent>
        <Typography sx={{ fontSize: 18,textAlign:"center",fontWeight:"800",textTransform:"uppercase"
         }} color="text.primary" gutterBottom>
         {title.title}
        </Typography>
        <div className=' text-sm' dangerouslySetInnerHTML={{ __html: title.docsData?title.docsData.split(' ').slice(0, 50).join(' '):""}} />
       
     
      </CardContent>
      <CardActions sx={{justifyContent:"space-between"}}>
        <Button size='small'>Edit <i className="fa-solid fa-pen-to-square ml-3" onClick={()=>{addId(title.id)}}></i></Button>
        <Button size='small' >Delete<i className="fa-solid fa-trash ml-3" onClick={()=>{deleteData(title.id)}}></i></Button>
      </CardActions>
    </Card>
  )
})}


    
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
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    />

                    <button className=' bg-cyan-600 block mt-5 px-3 py-1 ml-64 text-white rounded-sm' onClick={addData}>
                        Add
                    </button>
                
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default Add