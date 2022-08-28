import React from 'react'

import { Route, Routes } from 'react-router-dom'
import App from '../App'
import FactorFriccionPage from '../content/sifonInvertido/pages/FactorFriccionPage'
import SifonInvertido from '../content/sifonInvertido/pages/SifonInvertido'
// import Home from '../Home'
import ResponsiveAppBar from '../shared/components/Navigation/ResponsiveAppBar'


const AppRouter = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<SifonInvertido />}>
                    {/* <Route index element={<Home />} /> */}
                    {/* <Route path="teams" element={<Teams />}>
                            <Route path=":teamId" element={<Team />} />
                            <Route path="new" element={<NewTeamForm />} />
                            <Route index element={<LeagueStandings />} />
                        </Route> */}
                </Route>
                <Route path="/friccion" element={<FactorFriccionPage />}>
                </Route>
                <Route path="/sifon" element={<SifonInvertido />}>
                </Route>
            </Routes>
        </div>
    )
}

export default AppRouter