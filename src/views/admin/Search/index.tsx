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
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'

import { useSocket } from '../../../contexts/socketContext'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { SafeParseReturnType, z } from 'zod'
import Card from '../../../components/card/Card'
import IconBox from '../../../components/icons/IconBox'
import { MdCheckBox, MdDragIndicator } from 'react-icons/md'
import Menu from '../../../components/menu/MainMenu'
import HistoryItem from '../marketplace/components/HistoryItem'
import Nft5 from '../../../assets/img/nfts/Nft5.png'
import BlockDetailItem from './components/BlockDetailItem'
import { resultOfBlockSearchWithoutFrontendId } from '../../../types/chartDataType'

// ブロックナンバーのバリデーションルール
const schema = z
  .string()
  .regex(/^([1-9]\d*|0)$/)
  .transform((val) => Number(val))
type Schema = z.infer<typeof schema>

// useLocation用の型定義
type LocationState = {
  blockNumber: number
}

export default function UserReports() {
  // 受信データをcontextから取得
  const { latestBlockData, socket, blockSearchResult, setBlockSearchResult } =
    useSocket()

  const location = useLocation()

  // location.stateがundefinedの時は{blockNumber: undefined}を代入
  // これをしないと、useEffectの依存配列にlocationState.blockNumberが入っているため、
  // このコンポーネントの初回レンダリング時にエラーになる
  // Blocksページのリンクをクリックしてこのコンポーネントに遷移したときはlocation.state.blockNumberは
  // undefinedではないのでエラーにならない
  const locationState = location.state
    ? (location.state as LocationState)
    : { blockNumber: undefined }

  const params = new URLSearchParams(useLocation().search)

  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.200')
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const brandStars = useColorModeValue('brand.500', 'brand.400')
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900')

  // 入力フォームでIME入力中か否かを判定するためのステート変数
  const [typing, setTyping] = useState<boolean>(false)

  // 入力値のバリデーション結果を格納するステート変数
  const [isError, setIsError] = useState<boolean>(false)

  // バリデーション結果を格納するRef変数
  const validationResult: React.MutableRefObject<
    undefined | SafeParseReturnType<unknown, Schema>
  > = useRef<undefined | SafeParseReturnType<unknown, Schema>>()

  useEffect(() => {
    if (locationState.blockNumber !== undefined) {
      socket.emit('requestBlockSearch', locationState.blockNumber)
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    } else if (
      params.get('blockNumber') !== undefined &&
      params.get('blockNumber') !== null
    ) {
      socket.emit('requestBlockSearch', Number(params.get('blockNumber')))
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [locationState.blockNumber, params.get('blockNumber'), socket])

  // ユーザーがフォームに入力中の処理
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    // ユーザーがエンターキーを押下、かつエンターキーの押下がIMEの確定操作ではない、かつ入力欄が空ではない場合にバリデーションを実行
    if (e.key === 'Enter' && !typing && e.currentTarget.value !== '') {
      // 入力された値のバリデーション
      validationResult.current = schema.safeParse(e.currentTarget.value)
      // validation.currentにdataが入っているのはvalidationResult.current.successがtrueの時だけなのでif文で判定
      if (validationResult.current.success) {
        // 入力されたブロックデータが最新値以上の時はエラーメッセージ。そうでない時はリクエストをエミット
        if (validationResult.current.data <= latestBlockData[0].number) {
          // 入力欄の強調表示を消去
          e.currentTarget.blur()
          // 入力値をクリア
          e.currentTarget.value = ''
          // エラーメッセージをクリア
          setIsError(false)
          // ユーザーが要求したブロックナンバーを含むページをデータパブリッシャーに要求
          socket.emit('requestBlockSearch', validationResult.current.data)
          // 表示中のデータを初期化
          // setBlockSearchResult()
        } else {
          setIsError(true)
        }
      } else {
        setIsError(true)
      }
    }
  }

  return (
    <>
      <Center>
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          <Card mb={'10px'} borderRadius={'60px'}>
            <FormControl isInvalid={isError}>
              <Input
                bgColor={inputBg}
                borderRadius={'30px'}
                w={{ base: '20vw', sm: '75vw', md: '50vw', xl: '30vw' }}
                isRequired={false}
                fontSize="md"
                placeholder="Input block number to search"
                // mb='24px'
                size="lg"
                type={'text'}
                color={textColor}
                // borderColor={textColor}
                onCompositionStart={() => {
                  // 入力中にIMEの使用を開始したらフラグを設定
                  setTyping(true)
                }}
                onCompositionEnd={() => {
                  // IMEの使用が終了したらフラグを解除
                  setTyping(false)
                }}
                onKeyDown={handleKeyDown}
              />
              {isError ? (
                // バリデーション処理でエラー判定になった時にメッセージを表示
                <FormErrorMessage>
                  Input an integer number greater than 0 and less than the
                  latest block number.
                </FormErrorMessage>
              ) : null}
            </FormControl>
          </Card>
        </Box>
      </Center>
      <Card p="20px" alignItems="center" flexDirection="column" w="100%">
        {blockSearchResult ? (
          <>
            <Text fontSize={'2xl'}>Search result for block number</Text>
            <Text fontSize={'md'}>{blockSearchResult.number}</Text>
          </>
        ) : (
          <Text fontSize={'2xl'}>Input block number to search</Text>
        )}
        <TableContainer w={'100%'}>
          <Table variant="simple">
            <Tbody>
              {blockSearchResult &&
                Object.entries(blockSearchResult).map(
                  (element: [string, any], index) => {
                    if (element[0] === 'transactions') {
                      return (
                        <Tr key={index}>
                          <Td borderColor={boxBg}>{element[0]}</Td>
                          <Td borderColor={boxBg}>{element[1].length}</Td>
                        </Tr>
                      )
                    } else {
                      return (
                        <Tr key={index}>
                          <Td borderColor={boxBg}>{element[0]}</Td>
                          <Td borderColor={boxBg}>{element[1]}</Td>
                        </Tr>
                      )
                    }
                  },
                )}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}
