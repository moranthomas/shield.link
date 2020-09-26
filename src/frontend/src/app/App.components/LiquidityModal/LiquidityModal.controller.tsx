import { ShieldContract, shieldContracts } from 'helpers/shieldContracts'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import web3 from 'web3'

import { hideLiquidity } from './LiquidityModal.actions'
import { LiquidityModalView } from './LiquidityModal.view'

type LiquidityModalProps = {
  drizzle: any
  drizzleState: any
}

export const LiquidityModal = ({ drizzle, drizzleState }: LiquidityModalProps) => {
  const dispatch = useDispatch()
  const { insuranceId, showing } = useSelector((state: State) => state.liquidityModal)

  const hideCallback = () => {
    dispatch(hideLiquidity())
  }

  const insurance: ShieldContract = shieldContracts.filter((shieldContract) => shieldContract._id === insuranceId)?.[0]

  const buyCallback = (insuranceId: number, premium: number) => {
    console.log(insuranceId, premium)
    console.log(drizzle.contracts)
    if (insuranceId === 0)
      drizzle.contracts.ShieldShipping.methods
        .provideLiquidity()
        .send({ value: web3.utils.toWei(premium as any, 'ether') })
  }

  return (
    <LiquidityModalView showing={showing} insurance={insurance} hideCallback={hideCallback} buyCallback={buyCallback} />
  )
}
