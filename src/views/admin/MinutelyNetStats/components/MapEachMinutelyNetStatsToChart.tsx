// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import NewBlockSizeBarChart from '../../../../components/charts/NewBlockSizeBarChart'

// Custom components
import Card from 'components/card/Card'

// types
import type {
  displayData,
  displayDataArray,
  latestBlockData,
  netStats,
  netStatsArray,
} from '../../../../types/chartDataType'
import * as React from 'react'
import NetStatsLineChart from '../../../../components/charts/NetStatsLineChart'
import { memo } from 'react'
import convertDisplayDataName from '../../../../function/convertDisplayDataName'

export default memo(
  function MapEachMinutelyNetStatsToChart(props: {
    [x: string]: any
    partialnetstatsarray: Array<Partial<netStats>>
    displaydata: string
  }) {
    const { ...rest } = props
    // console.log(props.partialnetstatsarray)

    // Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white')
    return (
      <Card alignItems="center" flexDirection="column" w="100%" {...rest}>
        <Flex justify="space-between" align="start" px="10px" pt="5px" w="100%">
          <Flex flexDirection="column" align="start" me="20px">
            <Flex align="end">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                {convertDisplayDataName(props.displaydata)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box h="240px" w={'100%'} mt="auto">
          <NetStatsLineChart
            partialnetstatsarray={props.partialnetstatsarray}
            displaydata={props.displaydata}
          />
        </Box>
      </Card>
    )
  },
  (prev, next) => {
    if (prev.partialnetstatsarray.length !== 0) {
      return (
        prev.partialnetstatsarray[prev.partialnetstatsarray.length - 1]
          .endTimeUnix ===
        next.partialnetstatsarray[next.partialnetstatsarray.length - 1]
          .endTimeUnix
      )
    } else {
      return false
    }
  },
)
