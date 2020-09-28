import { ShieldContract, shieldContracts } from 'helpers/shieldContracts'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import web3 from 'web3'

import { hideInsurance } from './InsuranceModal.actions'
import { InsuranceModalView } from './InsuranceModal.view'

type InsuranceModalProps = {
  drizzle: any
  drizzleState: any
}

export const InsuranceModal = ({ drizzle, drizzleState }: InsuranceModalProps) => {
  const dispatch = useDispatch()
  const { insuranceId, showing } = useSelector((state: State) => state.insuranceModal)

  const hideCallback = () => {
    dispatch(hideInsurance())
  }

  const insurance: ShieldContract = shieldContracts.filter((shieldContract) => shieldContract._id === insuranceId)?.[0]

  const buyCallback = (insuranceId: number, target: string, premium: number) => {
    console.log(insuranceId, target, premium)
    console.log(drizzle.contracts)
    if (insuranceId === 0)
      drizzle.contracts.ShieldShipping.methods
        .buyInsurance(target)
        .send({ value: web3.utils.toWei(premium as any, 'ether') })
    if (insuranceId === 1)
      drizzle.contracts.ShieldLife.methods
        .buyInsurance(target)
        .send({ value: web3.utils.toWei(premium as any, 'ether') })
    if (insuranceId === 2)
      drizzle.contracts.ShieldFlight.methods
        .buyInsurance(target)
        .send({ value: web3.utils.toWei(premium as any, 'ether') })
  }

  return (
    <InsuranceModalView showing={showing} insurance={insurance} hideCallback={hideCallback} buyCallback={buyCallback} />
  )
}
