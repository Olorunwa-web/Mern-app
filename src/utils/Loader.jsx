import React from 'react'
import { PulseLoader } from 'react-spinners'
const Loader = () => {
  return (
    <>
       <PulseLoader color = '#ffffff'loading = {true} size = {6}  />
    </>
  );
};

export default Loader;