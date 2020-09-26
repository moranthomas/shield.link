import { ShieldContract } from 'helpers/shieldContracts'
import { HomeInsuranceHeader, HomeInsuranceHeaderFunded, HomeInsuranceHeaderTitle } from 'pages/Home/Home.style'
import * as React from 'react'
import { ModalCard, ModalMask, ModalStyled } from 'styles'

import { Input } from '../Input/Input.controller'
// prettier-ignore
import { InsuranceModalBuy, InsuranceModalCard, InsuranceModalInputs, InsuranceModalReward, InsuranceModalRewardEther, InsuranceModalRewardTitle } from './InsuranceModal.style'

type InsuranceModalViewProps = {
  showing: boolean
  insurance?: ShieldContract
  hideCallback: () => void
  buyCallback: (insuranceId: number, target: string, premium: number) => void
}

export const InsuranceModalView = ({ showing, insurance, hideCallback, buyCallback }: InsuranceModalViewProps) => {
  const [target, setTarget] = React.useState<any>()
  const [premium, setPremium] = React.useState<any>()
  const [error, setError] = React.useState<any>()

  React.useEffect(() => {
    setPremium(1)
    setTarget('')
  }, [showing])

  return (
    <ModalStyled showing={showing}>
      {showing && (
        <>
          <ModalMask showing={showing} onClick={() => hideCallback()} />
          <ModalCard>
            <h1>Purchase Insurance</h1>
            <InsuranceModalCard>
              <HomeInsuranceHeader>
                <img alt="shipping" src={`/images/${insurance?.icon}.png`} />
                <div>
                  <HomeInsuranceHeaderTitle>{insurance?.name}</HomeInsuranceHeaderTitle>
                  <HomeInsuranceHeaderFunded>
                    Funded with Ξ{insurance?.funds}
                    <img alt="shipping" src="/icons/green-dot.svg" />
                  </HomeInsuranceHeaderFunded>
                </div>
              </HomeInsuranceHeader>
              <InsuranceModalInputs>
                <Input
                  icon="target"
                  name="target"
                  placeholder={insurance?.targetName}
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
                  type="number"
                  onChange={(e) => setPremium(e.target.value)}
                  value={premium}
                  onBlur={() => {}}
                  inputStatus={undefined}
                  errorMessage={undefined}
                />
              </InsuranceModalInputs>
              <InsuranceModalReward>
                <InsuranceModalRewardTitle>{insurance?.condition}</InsuranceModalRewardTitle>
                <InsuranceModalRewardEther>
                  Ξ{((parseFloat(premium) || 0) * ((insurance?.reward || 0) / 100)).toFixed(2)}
                </InsuranceModalRewardEther>
              </InsuranceModalReward>
              <InsuranceModalBuy onClick={() => buyCallback(insurance?._id as number, target as string, premium)}>
                Buy insurance for Ξ{(parseFloat(premium) || 0).toFixed(2)}
              </InsuranceModalBuy>
            </InsuranceModalCard>
          </ModalCard>
        </>
      )}
    </ModalStyled>
  )
}
