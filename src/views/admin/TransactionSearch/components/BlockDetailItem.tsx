import React from 'react';
// Chakra imports
import { Flex, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { FaEthereum } from 'react-icons/fa';

export default function BlockDetailItem(props: {
	field: string;
	data: string;
}) {
	const { field, data } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('brands.900', 'white');
	const bgItem = useColorModeValue(
		{ bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
		{ bg: 'navy.700', boxShadow: 'unset' }
	);
	const textColorDate = useColorModeValue('secondaryGray.600', 'white');
	return (
		<Card _hover={bgItem} bg='transparent' boxShadow='unset' px='24px' py='21px' transition='0.2s linear'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Flex position='relative' align='center'>
					<Flex me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }} align='center'>
						<Text fontWeight='700' fontSize='md' color={textColor}>
							{field}
						</Text>
					</Flex>
					<Text ms='auto' fontWeight='700' fontSize='sm' color={textColorDate}>
						{data}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
