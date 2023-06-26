// Chakra imports
import { Flex, useColorModeValue, Heading, Image } from '@chakra-ui/react'

// Custom components
import { HorizonLogo } from 'components/icons/Icons'
import { HSeparator } from 'components/separator/Separator'
import * as process from 'process'

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white')
  console.log(process.env.PUBLIC_URL)
  return (
    <Flex alignItems="center" flexDirection="column">
      {/*<HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />*/}
      <Image
        w={'50px'}
        src={`${process.env.PUBLIC_URL}/LogoTwitter_circle.png`}
      />
      <Heading size={'md'} mb="20px">
        ethereumNetStats
      </Heading>
      <HSeparator mb="20px" />
    </Flex>
  )
}

export default SidebarBrand
