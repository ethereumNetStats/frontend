// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'

// Custom components
import Card from 'components/card/Card'
import NewAddressCountBarChart from '../../../../components/charts/NewAddressCountBarChart'

// types
import type { latestBlockData } from '../../../../types/chartDataType'
import * as React from 'react'

export default function NewAddressCount(props: {
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
              New Addresses
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h="240px" w={'100%'} mt="auto">
        <NewAddressCountBarChart latestData={props.latestData} />
      </Box>
    </Card>
  )
}
