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
  faCubes,
  faClock,
  faFileWaveform,
  faGasPump,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// type RowObj = {
//   name: string
//   status: string
//   date: string
//   progress: number
// }

type RowObj = {
  number: number
  timestamp: string
  transactions: number
  gasUsed: number
}

const columnHelper = createColumnHelper<RowObj>()

// const columns = columnsDataCheck;
export default function NewLatestBlocksTable(props: { tableData: any }) {
  const { tableData } = props
  const [sorting, setSorting] = React.useState<SortingState>([])
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  let defaultData = tableData
  const columns = [
    columnHelper.accessor('number', {
      id: 'number',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          NUMBER
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <FontAwesomeIcon icon={faCubes} />
          <Text ml={3} color={textColor} fontSize="sm" fontWeight="700">
            <Link
              to={{
                pathname: '/admin/search',
                state: { blockNumber: info.getValue() },
              }}
            >
              {info.getValue()}
            </Link>
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('timestamp', {
      id: 'timestamp',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          DATETIME
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          {/*<Icon*/}
          {/*  w="24px"*/}
          {/*  h="24px"*/}
          {/*  me="5px"*/}
          {/*  color={*/}
          {/*    info.getValue() === 'Approved'*/}
          {/*      ? 'green.500'*/}
          {/*      : info.getValue() === 'Disable'*/}
          {/*      ? 'red.500'*/}
          {/*      : info.getValue() === 'Error'*/}
          {/*      ? 'orange.500'*/}
          {/*      : null*/}
          {/*  }*/}
          {/*  as={*/}
          {/*    info.getValue() === 'Approved'*/}
          {/*      ? MdCheckCircle*/}
          {/*      : info.getValue() === 'Disable'*/}
          {/*      ? MdCancel*/}
          {/*      : info.getValue() === 'Error'*/}
          {/*      ? MdOutlineError*/}
          {/*      : null*/}
          {/*  }*/}
          {/*/>*/}
          <FontAwesomeIcon icon={faClock} />
          <Text ml={3} color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('transactions', {
      id: 'transactions',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          TRANSACTIONS
        </Text>
      ),
      cell: (info) => (
        <Flex align={'center'}>
          <FontAwesomeIcon icon={faFileWaveform} />
          <Text
            ml={'auto'}
            mr={'auto'}
            color={textColor}
            fontSize="sm"
            fontWeight="700"
          >
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('gasUsed', {
      id: 'gasUsed',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          GASUSED
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <FontAwesomeIcon icon={faGasPump} />
          <Text ml={3} color={textColor} fontSize="sm" fontWeight="700">
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
          Latest Blocks
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
