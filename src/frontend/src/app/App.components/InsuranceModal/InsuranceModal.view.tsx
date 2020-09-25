import { HomeInsuranceHeader, HomeInsuranceHeaderFunded, HomeInsuranceHeaderTitle } from 'pages/Home/Home.style'
import * as React from 'react'
import { ModalCard, ModalMask, ModalStyled } from 'styles'

import { Input } from '../Input/Input.controller'
// prettier-ignore
import { InsuranceModalBuy, InsuranceModalCard, InsuranceModalInputs, InsuranceModalReward, InsuranceModalRewardEther, InsuranceModalRewardTitle } from './InsuranceModal.style'

type InsuranceModalViewProps = {
  showing: boolean
  insuranceId?: string
  hideCallback: () => void
}

export const InsuranceModalView = ({ showing, insuranceId, hideCallback }: InsuranceModalViewProps) => {
  const [target, setTarget] = React.useState()
  const [premium, setPremium] = React.useState()
  const [error, setError] = React.useState()

  return (
    <ModalStyled showing={showing}>
      {showing && (
        <>
          <ModalMask showing={showing} onClick={() => hideCallback()} />
          <ModalCard>
            <h1>Purchase Insurance</h1>
            <InsuranceModalCard>
              <HomeInsuranceHeader>
                <img alt="shipping" src="/images/life.png" />
                <div>
                  <HomeInsuranceHeaderTitle>{insuranceId} Insurance</HomeInsuranceHeaderTitle>
                  <HomeInsuranceHeaderFunded>
                    Funded with Ξ4.23
                    <img alt="shipping" src="/icons/green-dot.svg" />
                  </HomeInsuranceHeaderFunded>
                </div>
              </HomeInsuranceHeader>
              <InsuranceModalInputs>
                <Input
                  icon="target"
                  name="target"
                  placeholder="Tracking number"
                  type="text"
                  onChange={(e) => setTarget(e.target.value)}
                  value={target}
                  onBlur={() => {}}
                  inputStatus={undefined}
                  errorMessage={undefined}
                />
                <Input
                  icon="ether"
                  name="ether"
                  placeholder="Premium"
                  type="text"
                  onChange={(e) => setPremium(e.target.value)}
                  value={premium}
                  onBlur={() => {}}
                  inputStatus={undefined}
                  errorMessage={undefined}
                />
              </InsuranceModalInputs>
              <InsuranceModalReward>
                <InsuranceModalRewardTitle>In case of lost package, I will receive </InsuranceModalRewardTitle>
                <InsuranceModalRewardEther>Ξ{((premium || 0) * 10).toFixed(2)}</InsuranceModalRewardEther>
              </InsuranceModalReward>
              <InsuranceModalBuy>Buy insurance for Ξ{(premium || 0).toFixed(2)}</InsuranceModalBuy>
            </InsuranceModalCard>
          </ModalCard>
        </>
      )}
    </ModalStyled>
  )
}
