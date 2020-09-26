import { commatize } from 'helpers/commatize'
import { shieldContracts } from 'helpers/shieldContracts'
import * as React from 'react'
import { useEffect } from 'react'

// prettier-ignore
import { LiquidityAddInsurance, LiquidityInsurance, LiquidityInsuranceBuy, LiquidityInsuranceHeader, LiquidityInsuranceHeaderFunded, LiquidityInsuranceHeaderTitle, LiquidityInsuranceOfPremium, LiquidityInsuranceReward, LiquidityInsurances, LiquidityStyled } from './Liquidity.style'

type LiquidityViewProps = {
  showInsuranceCallback: (insuranceId: number) => void
  newInsuranceCallback: () => void
  drizzle: any
  drizzleState: any
}

export const LiquidityView = ({ showInsuranceCallback, drizzle, newInsuranceCallback }: LiquidityViewProps) => {
  useEffect(() => {
    const contract = drizzle.contracts.Shields
    const dataKey = contract.methods['getShields'].cacheCall()
    console.log(dataKey)
  }, [])

  return (
    <LiquidityStyled>
      <h1>Provide Liquidity</h1>

      <LiquidityInsurances>
        {shieldContracts.map((shieldContract: any) => (
          <LiquidityInsurance key={shieldContract._id} onClick={() => showInsuranceCallback(shieldContract._id)}>
            <LiquidityInsuranceHeader>
              <img alt={shieldContract.icon} src={`/images/${shieldContract.icon}.png`} />
              <div>
                <LiquidityInsuranceHeaderTitle>{shieldContract.name}</LiquidityInsuranceHeaderTitle>
                <LiquidityInsuranceHeaderFunded>
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
                </LiquidityInsuranceHeaderFunded>
              </div>
            </LiquidityInsuranceHeader>
            <LiquidityInsuranceReward>{`${commatize(shieldContract.APY)}%`}</LiquidityInsuranceReward>
            <LiquidityInsuranceOfPremium>Annualized Yield</LiquidityInsuranceOfPremium>
            <LiquidityInsuranceBuy>Provide Liquidity</LiquidityInsuranceBuy>
          </LiquidityInsurance>
        ))}

        <LiquidityAddInsurance onClick={() => newInsuranceCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#add" />
          </svg>
          <div>Create new insurance</div>
        </LiquidityAddInsurance>
      </LiquidityInsurances>
    </LiquidityStyled>
  )
}
