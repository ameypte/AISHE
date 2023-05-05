import React from 'react'
import BasicInfo from "../components/basic/Form"
import Departments from "./Departments"

export default function aishereport() {
  return (
    <div className='p-3'>
      <BasicInfo/>
      <Departments/>
    </div>
  )
}
