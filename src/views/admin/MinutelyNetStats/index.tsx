/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react'

import { useSocket } from '../../../contexts/socketContext'
import MapEachMinutelyNetStatsToChart from './components/MapEachMinutelyNetStatsToChart'
import extractFields from '../../../function/extractFields'
import dataToDisplay from '../../../variables/dataToDisplay'

export default function UserReports() {
  // 受信データをcontextから取得
  const { minutelyNetStats } = useSocket()
  // console.log(minutelyNetStats)

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        {minutelyNetStats &&
          dataToDisplay.map((data) => {
            return (
              <MapEachMinutelyNetStatsToChart
                key={data}
                partialnetstatsarray={extractFields(minutelyNetStats, data)}
                displaydata={data}
              />
            )
          })}
      </SimpleGrid>
    </Box>
  )
}
