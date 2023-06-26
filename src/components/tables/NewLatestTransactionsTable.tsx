import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
// Custom components
import Card from 'components/card/Card'
import * as React from 'react'
// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileWaveform,
  faFileImport,
  faFileExport,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

type RowObj = {
  transactionHash: string
  from: string
  to: string
  gas: number
  value: bigint
}

const columnHelper = createColumnHelper<RowObj>()

export default function NewLatestTransactionsTable(props: { tableData: any }) {
  const { tableData } = props
  const [sorting, setSorting] = React.useState<SortingState>([])
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  let defaultData = tableData
  const columns = [
    columnHelper.accessor('transactionHash', {
      id: 'transactionHash',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          TransactionHash
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <FontAwesomeIcon icon={faFileWaveform} />
          <Text
            ml={3}
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            isTruncated
          >
            <Link
              to={{
                pathname: '/admin/transactionsearch',
                state: { transactionHash: info.getValue() },
              }}
            >
              {info.getValue()}
            </Link>
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('from', {
      id: 'from',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          From
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <FontAwesomeIcon icon={faFileExport} />
          <Text
            ml={3}
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            isTruncated
          >
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('to', {
      id: 'to',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          To
        </Text>
      ),
      cell: (info) => (
        <Flex align={'center'}>
          <FontAwesomeIcon icon={faFileImport} />
          <Text
            ml={'auto'}
            mr={'auto'}
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            isTruncated
          >
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('value', {
      id: 'value',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Ether
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <FontAwesomeIcon icon={faMoneyBillWave} />
          <Text
            ml={3}
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            isTruncated
          >
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
  ]
  const [data, setData] = React.useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  useEffect(() => {
    setData((prev) => [...defaultData])
  }, [props.tableData[0]])

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Latest Transactions
        </Text>
        {/*<Menu />*/}
      </Flex>
      <Box>
        <TableContainer>
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        pe="10px"
                        borderColor={borderColor}
                        cursor="pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Flex
                          justifyContent="space-between"
                          align="center"
                          fontSize={{ sm: '10px', lg: '12px' }}
                          color="gray.400"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: '',
                            desc: '',
                          }[header.column.getIsSorted() as string] ?? null}
                        </Flex>
                      </Th>
                    )
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table
                .getRowModel()
                .rows.slice(0, 10)
                .map((row) => {
                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Td
                            key={cell.id}
                            fontSize={{ sm: '14px' }}
                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                            borderColor="transparent"
                            maxW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Td>
                        )
                      })}
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  )
}
