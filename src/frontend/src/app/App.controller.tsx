import { DrizzleContext } from '@drizzle/react-plugin'
import { Drizzle, generateStore } from '@drizzle/store'
import { ConnectedRouter } from 'connected-react-router'
import { Error404 } from 'pages/Error404/Error404.controller'
import { Home } from 'pages/Home/Home.controller'
import { Liquidity } from 'pages/Liquidity/Liquidity.controller'
import * as React from 'react'
import { Route, Switch } from 'react-router'

import Shields from '../contracts/Shields.json'
import ShieldShipping from '../contracts/ShieldShipping.json'
import ShieldLife from '../contracts/ShieldLife.json'
import ShieldFlight from '../contracts/ShieldFlight.json'
import drizzleOptions from '../drizzleOptions'
import { AddModal } from './App.components/AddModal/AddModal.controller'
import { Drawer } from './App.components/Drawer/Drawer.controller'
import { Hamburger } from './App.components/Hamburger/Hamburger.controller'
import { Header } from './App.components/Header/Header.controller'
import { InsuranceModal } from './App.components/InsuranceModal/InsuranceModal.controller'
import { LiquidityModal } from './App.components/LiquidityModal/LiquidityModal.controller'
import { ProgressBar } from './App.components/ProgressBar/ProgressBar.controller'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import { history } from './App.store'

const options = { contracts: [Shields, ShieldShipping, ShieldLife, ShieldFlight] }
// @ts-ignore
const drizzleStore = generateStore(options)
// @ts-ignore
const drizzle = new Drizzle(options, drizzleStore)

export const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext: any) => {
          const { drizzle, drizzleState, initialized } = drizzleContext

          if (!initialized) {
            return 'Please connect to RINKEBY and refresh!'
          }

          return (
            <ConnectedRouter history={history}>
              <Header />
              <Drawer />
              <Hamburger />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/liquidity">
                  <Liquidity />
                </Route>
                <Route exact path="/documentation">
                  <div />
                </Route>
                <Route>
                  <Error404 />
                </Route>
              </Switch>
              <Toaster />
              <ProgressBar />
              <InsuranceModal drizzle={drizzle} drizzleState={drizzleState} />
              <LiquidityModal drizzle={drizzle} drizzleState={drizzleState} />
              <AddModal />
            </ConnectedRouter>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  )
}
