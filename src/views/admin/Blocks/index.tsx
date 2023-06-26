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
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
// Assets
import Usa from 'assets/img/dashboards/usa.png'
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar'
import MiniStatistics from 'components/card/MiniStatistics'
import IconBox from 'components/icons/IconBox'
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md'
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
import Card from '../../../components/card/Card'
import ReactPaginate from 'react-paginate'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import './pagination.css'
import { blockData } from '../../../types/chartDataType'
import { SafeParseReturnType, z } from 'zod'

// ブロックナンバーのバリデーションルール
const schema = z
  .string()
  .regex(/^([1-9]\d*|0)$/)
  .transform((val) => Number(val))
type Schema = z.infer<typeof schema>

export default function UserReports() {
  // 受信データをcontextから取得
  const {
    latestBlockData,
    socket,
    blockList,
    blockListCurrentPage,
    blockListTotalPage,
  } = useSocket()

  // historyオブジェクトを取得
  const history = useHistory()

  // 'react-paginate'用のページ数のステート変数
  const [pageOffset, setPageOffset] = useState<number>(0)

  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const textColor = useColorModeValue('navy.700', 'white')
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900')

  // 入力フォームでIME入力中か否かを判定するためのステート変数
  const [typing, setTyping] = useState<boolean>(false)

  // バリデーション結果を格納するRef変数
  const validationResult: React.MutableRefObject<
    undefined | SafeParseReturnType<unknown, Schema>
  > = useRef<undefined | SafeParseReturnType<unknown, Schema>>()

  // 入力値のバリデーション結果を格納するステート変数
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    // コンポーネントのマウント時にページの初期値と共にデータを要求
    socket.emit('requestBlockList', pageOffset)
  }, [])

  // ページ番号をクリックした時の処理
  const handleClickPageChange = useCallback((event: { selected: number }) => {
    // クリックされたページ数を格納
    const newOffset = event.selected

    // クリックされたページ数をステート変数として格納
    setPageOffset(newOffset)

    // 表示中のデータを初期化してスピナーを表示
    // setResponseBlockList();

    // クリックされたページのデータを要求
    socket.emit('requestBlockList', event.selected)
  }, [])

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
          socket.emit(
            'requestBlockListPageByBlockNumber',
            validationResult.current.data,
          )
          // 表示中のデータを初期化してスピナーを表示
          // setResultOfBlockSearch()
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
          <Card borderRadius={'60px'}>
            <Tooltip hasArrow label={'Get a page including the input number'}>
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
            </Tooltip>
          </Card>
        </Box>
      </Center>
      <Box p={'20px'}>
        <Card>
          {blockList && (
            <>
              <Center>
                <ReactPaginate
                  pageCount={blockListTotalPage}
                  forcePage={blockListCurrentPage}
                  breakLabel={'...'}
                  onPageChange={handleClickPageChange}
                  pageRangeDisplayed={5}
                  previousLabel={'< previous'}
                  nextLabel={'next >'}
                  containerClassName={'containerClassName'}
                  pageClassName={'pageClassName'}
                  pageLinkClassName={'pageLinkClassName'}
                  previousClassName={'previousClassName'}
                  previousLinkClassName={'previousLinkClassName'}
                  nextClassName={'nextClassName'}
                  nextLinkClassName={'nextLinkClassName'}
                  activeClassName={'activeClassName'}
                />
              </Center>
              <TableContainer>
                <Table variant={'simple'}>
                  <Thead>
                    <Tr>
                      <Th>Number</Th>
                      <Th>Age</Th>
                      <Th>Transactions</Th>
                      <Th>GasUsed</Th>
                      <Th>GasLimit</Th>
                      <Th>BaseFeePerGas</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {blockList.list.map((block: blockData, key: number) => (
                      <Tr key={key}>
                        <Td borderColor={boxBg}>
                          <Link
                            to={{
                              pathname: '/admin/search',
                              state: { blockNumber: block.number },
                            }}
                          >
                            {block.number}
                          </Link>
                        </Td>
                        <Td borderColor={boxBg}>
                          {Math.floor(
                            new Date().getTime() / 1000 - block.timestamp,
                          )}{' '}
                          sec
                        </Td>
                        <Td borderColor={boxBg}>
                          {block.transactions.length
                            ? block.transactions.split(',').length
                            : block.transactions.length}
                        </Td>
                        <Td borderColor={boxBg}>
                          {block.gasUsed ? block.gasUsed.toLocaleString() : 0}{' '}
                          wei
                        </Td>
                        <Td borderColor={boxBg}>
                          {block.gasLimit ? block.gasLimit.toLocaleString() : 0}{' '}
                          wei
                        </Td>
                        <Td borderColor={boxBg}>
                          {block.baseFeePerGas
                            ? block.baseFeePerGas.toLocaleString()
                            : 0}{' '}
                          wei
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          )}
        </Card>
      </Box>
    </>
  )
}
