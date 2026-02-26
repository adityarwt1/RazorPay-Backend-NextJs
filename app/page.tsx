"use client"
import React, { useEffect } from 'react'
import { hellowFunction, RazorPayIntance} from "razor-pay-clone-adi"
import { generateId } from '@/utils/generateIds/generateIds'

const HomePage = ()=>{
  hellowFunction()
  
  useEffect(()=>{
    const apiTestOuter = async ()=>{
      // await apiTest()

    }
    apiTestOuter()
  })
  const intanse = new RazorPayIntance("14920251", "helllwo world")
  intanse.consoleInformation()
  intanse.apiTest()
  console.log(generateId())
  return (
    <div>Hellow </div>
  )
}

export default HomePage