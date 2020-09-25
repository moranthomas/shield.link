import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { hideSellers } from './InsuranceModal.actions'
import { InsuranceModalView } from './InsuranceModal.view'

export const InsuranceModal = () => {
  const dispatch = useDispatch()
  const { insuranceId, showing } = useSelector((state: State) => state.insuranceModal)

  const hideCallback = () => {
    dispatch(hideSellers())
  }

  return <InsuranceModalView showing={showing} insuranceId={insuranceId} hideCallback={hideCallback} />
}
