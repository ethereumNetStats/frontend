// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import BlockTimeBarChart from '../../../../components/charts/BlockTimeBarChart'

// Custom components
import Card from 'components/card/Card'

// types
import type { latestBlockData } from '../../../../types/chartDataType'
import * as React from 'react'

export default function BlockTime(props: {
  [x: string]: any
  latestData: latestBlockData
}) {
  const { ...rest } = props

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
              Block Time
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h="240px" w={'100%'} mt="auto">
        <BlockTimeBarChart latestData={props.latestData} />
      </Box>
    </Card>
  )
}
