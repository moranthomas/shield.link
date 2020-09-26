import * as React from 'react'
import { useDispatch } from 'react-redux'
import { DrizzleContext } from '@drizzle/react-plugin'

import { LiquidityView } from './Liquidity.view'
import { showAddModal } from 'app/App.components/AddModal/AddModal.actions'
import { showLiquidity } from 'app/App.components/LiquidityModal/LiquidityModal.actions'

export const Liquidity = () => {
  const dispatch = useDispatch()

  const showInsuranceCallback = (insuranceId: number) => {
    dispatch(showLiquidity(insuranceId))
  }

  const newInsuranceCallback = () => {
    dispatch(showAddModal())
  }

  return (
    <DrizzleContext.Consumer>
      {(drizzleContext: any) => {
        const { drizzle, drizzleState, initialized } = drizzleContext

        if (!initialized) {
          return 'Loading...'
        }

        return (
          <LiquidityView
            showInsuranceCallback={showInsuranceCallback}
            newInsuranceCallback={newInsuranceCallback}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        )
      }}
    </DrizzleContext.Consumer>
  )
}
