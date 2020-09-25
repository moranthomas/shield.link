import { showInsurance } from 'app/App.components/InsuranceModal/InsuranceModal.actions'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { DrizzleContext } from '@drizzle/react-plugin'

import { HomeView } from './Home.view'
import { showAddModal } from 'app/App.components/AddModal/AddModal.actions'

export const Home = () => {
  const dispatch = useDispatch()

  const showInsuranceCallback = (insuranceId: string) => {
    dispatch(showInsurance(insuranceId))
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
          <HomeView
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
