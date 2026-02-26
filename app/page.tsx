"use client"
import React, { useEffect } from 'react'
import { hellowFunction, RazorPayIntance, apiTest} from "razor-pay-clone-adi"

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
  return (
    <div>Hellow </div>
  )
}

export default HomePage