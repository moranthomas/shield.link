export const SHOW_INSURANCE = 'SHOW_INSURANCE'
export const HIDE_INSURANCE = 'HIDE_INSURANCE'

export const showInsurance = (insuranceId: string) => (dispatch: any) => {
  dispatch({
    type: SHOW_INSURANCE,
    payload: { insuranceId },
  })
}

export const hideSellers = () => (dispatch: any) => {
  dispatch({
    type: HIDE_INSURANCE,
  })
}
