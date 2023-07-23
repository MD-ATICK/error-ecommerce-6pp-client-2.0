
import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { FaShippingFast } from 'react-icons/fa'
import { MdOutlineDoneAll } from 'react-icons/md'
import { GiTakeMyMoney } from 'react-icons/gi'
import { borderRadius } from '@mui/system'

function CheckOutStep({ activeSteps }) {

    const Steps = [
        {
            label: <p className='text'>Order Shippping Details</p>,
            icon: <FaShippingFast className='iconvai' />
        },
        {
            label: <p className='text'>Comfirm Order</p>,
            icon: <MdOutlineDoneAll className='iconvai' />
        },
        {
            label: <p className='text'>Payment</p>,
            icon: <GiTakeMyMoney className='iconvai' />
        },
    ]

    const styleSteps = { boxSizing : 'border-box', color : 'white'}
    return (
        <div className='mt-6'>
            <Stepper alternativeLabel activeStep={activeSteps} style={styleSteps}>
                {
                    Steps.map((item , index) => {
                        // console.log(item)
                       return <Step key={index} active={activeSteps === index ? true : false} completed={activeSteps >= index ? true : false}>
                            <StepLabel style={{color : activeSteps >= index ? 'tomato' : 'black'}}  icon={item.icon}>{item.label}</StepLabel>
                        </Step>
                    }) 
                }
            </Stepper>
        </div>
    )
}

export default CheckOutStep