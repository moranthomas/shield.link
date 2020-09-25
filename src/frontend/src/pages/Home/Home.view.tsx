import { shieldContracts } from 'helpers/shieldContracts'
import * as React from 'react'
import { useEffect } from 'react'

// prettier-ignore
import { HomeAddInsurance, HomeInsurance, HomeInsuranceBuy, HomeInsuranceHeader, HomeInsuranceHeaderFunded, HomeInsuranceHeaderTitle, HomeInsuranceOfPremium, HomeInsuranceReward, HomeInsurances, HomeStyled } from './Home.style'

type HomeViewProps = {
  showInsuranceCallback: (insuranceId: string) => void
  newInsuranceCallback: () => void
  drizzle: any
  drizzleState: any
}

export const HomeView = ({ showInsuranceCallback, drizzle, newInsuranceCallback }: HomeViewProps) => {
  useEffect(() => {
    const contract = drizzle.contracts.Shields
    const dataKey = contract.methods['getShields'].cacheCall()
    console.log(dataKey)
  }, [])

  return (
    <HomeStyled>
      <h1>Insurance Pools</h1>

      <HomeInsurances>
        {shieldContracts.map((shieldContract: any) => (
          <HomeInsurance onClick={() => showInsuranceCallback(shieldContract._id)}>
            <HomeInsuranceHeader>
              <img alt={shieldContract.icon} src={`/images/${shieldContract.icon}.png`} />
              <div>
                <HomeInsuranceHeaderTitle>{shieldContract.name}</HomeInsuranceHeaderTitle>
                <HomeInsuranceHeaderFunded>
                  {shieldContract.funds > 0 ? (
                    <>
                      Funded with Ξ{shieldContract.funds}
                      <img alt="dot" src="/icons/green-dot.svg" />
                    </>
                  ) : (
                    <>
                      No more funds
                      <img alt="dot" src="/icons/red-dot.svg" />
                    </>
                  )}
                </HomeInsuranceHeaderFunded>
              </div>
            </HomeInsuranceHeader>
            <HomeInsuranceReward>1,000%</HomeInsuranceReward>
            <HomeInsuranceOfPremium>of premium</HomeInsuranceOfPremium>
            <HomeInsuranceBuy>Purchase Insurance</HomeInsuranceBuy>
          </HomeInsurance>
        ))}

        <HomeAddInsurance onClick={() => newInsuranceCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#add" />
          </svg>
          <div>Create new insurance</div>
        </HomeAddInsurance>
      </HomeInsurances>
    </HomeStyled>
  )
}
