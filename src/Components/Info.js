import React from 'react'
import { useParams } from "react-router-dom";
function Info() {
    let hello = useParams()
    console.log(hello)
  return (
    <div>Under Construction</div>
  )
}

export default Info