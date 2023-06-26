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
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'

// Custom components
import MiniStatistics from 'components/card/MiniStatistics'
import IconBox from 'components/icons/IconBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCubes,
  faClock,
  faFileWaveform,
  faStopwatch,
  faFolderPlus,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons'
import { ofByte } from 'function/getNormalizedUnit'
import CheckTable from 'views/admin/rtl/components/CheckTable'
import ComplexTable from 'views/admin/default/components/ComplexTable'
import DailyTraffic from 'views/admin/default/components/DailyTraffic'
import PieCard from 'views/admin/default/components/PieCard'
import Tasks from 'views/admin/default/components/Tasks'
import TotalSpent from 'views/admin/default/components/TotalSpent'
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue'

import tableDataCheck from 'views/admin/default/variables/tableDataCheck'
import tableDataComplex from 'views/admin/default/variables/tableDataComplex'

import { useSocket } from '../../../contexts/socketContext'
import Tps from './components/Tps'
import NewTransactionCount from './components/NewTransactionCount'
import NewAddressCount from './components/NewAddressCount'
import NewBlockSize from './components/NewBlockSize'
import NewGasUsed from './components/NewGasUsed'
import NewLatestBlocks from './components/NewLatestBlocks'
import BlockTime from './components/BlockTime'
import NewLatestTransactions from './components/NewLatestTransactions'
import { unixTimeToHMS } from '../../../function/unixTimeFormatter'

export default function UserReports() {
  // 受信データをcontextから取得
  const { latestBlockData, latestTransactionData } = useSocket()

  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {latestBlockData.length && latestTransactionData.length ? (
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <FontAwesomeIcon
                      width="32px"
                      height="32px"
                      icon={faClock}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Latest block datetime"
              value={unixTimeToHMS(
                latestBlockData[latestBlockData.length - 1].timestamp,
              )}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <FontAwesomeIcon
                      width="32px"
                      height="32px"
                      icon={faCubes}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Latest block number"
              value={latestBlockData[latestBlockData.length - 1].number}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <FontAwesomeIcon
                      width="32px"
                      height="32px"
                      icon={faFolderPlus}
                      color={brandColor}
                    />
                  }
                />
              }
              name="New address in latest block"
              value={
                latestBlockData[latestBlockData.length - 1].newAddressCount
              }
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <FontAwesomeIcon
                      width="32px"
                      height="32px"
                      icon={faFileWaveform}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Txns in latest block"
              value={
                latestBlockData[latestBlockData.length - 1].transactions.split(
                  ',',
                ).length
              }
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <FontAwesomeIcon
                      width="32px"
                      height="32px"
                      icon={faStopwatch}
                      color={brandColor}
                    />
                  }
                />
              }
              name="TPS"
              value={latestBlockData[latestBlockData.length - 1].tps.toFixed(2)}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <FontAwesomeIcon
                      width="32px"
                      height="32px"
                      icon={faDatabase}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Size of latest block"
              value={
                ofByte(latestBlockData[latestBlockData.length - 1].size, 0)
                  .data +
                ' ' +
                ofByte(latestBlockData[latestBlockData.length - 1].size).unit
              }
            />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap="20px" mb="20px">
            <>
              <NewAddressCount latestData={latestBlockData} />
              <NewBlockSize latestData={latestBlockData} />
              <NewGasUsed latestData={latestBlockData} />
              <NewTransactionCount latestData={latestBlockData} />
              <BlockTime latestData={latestBlockData}></BlockTime>
              <Tps latestData={latestBlockData} />
            </>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            <NewLatestBlocks latestData={latestBlockData} />
            <NewLatestTransactions latestData={latestTransactionData} />
          </SimpleGrid>
        </>
      ) : null}
    </Box>
  )
}
