import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

function Edit({ database }) {
  const params = useParams();
  const [docsData, setDocsData] = useState("");
  const collectionRef = collection(database, "titleDoc");

  // Use useRef for debouncing
  const debounceTimeoutRef = useRef(null);
  useEffect(() => {
    // Cleanup function to clear the debounce timer when the component unmounts
    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  // Debounced update function
  const debouncedUpdate = (value) => {
    // Clear the previous timeout
    clearTimeout(debounceTimeoutRef.current);

    // Set a new timeout to perform the update after 1000 milliseconds (1 second)
    debounceTimeoutRef.current = setTimeout(() => {
      const documentRef = doc(collectionRef, params.id);

      // Update document
      updateDoc(documentRef, {
        docsData: value,
      })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

  // Update state and trigger debounced update when the user types
  const getQuillData = (value) => {
    setDocsData(value);
    debouncedUpdate(value);
  };

  // Fetch data initially without triggering updates
  const getData = () => {
    const documentRef = doc(collectionRef, params.id);
    onSnapshot(documentRef, (snapshot) => {
      setDocsData(snapshot.data()?.docsData || ''); // Use the optional chaining operator to avoid errors
    });
  };

  useEffect(() => {
    getData();
  }, []); // Fetch data only once when the component mounts

  return (
    <>
      <div className='container'>
        <ReactQuill theme="snow" value={docsData} onChange={getQuillData} />
      </div>
    </>
  );
}

export default Edit;
