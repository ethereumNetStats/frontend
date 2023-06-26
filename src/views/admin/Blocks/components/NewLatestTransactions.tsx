import {
  arrayOfBlockData,
  blockData,
  latestBlockData,
  transactionDetail,
} from '../../../../types/chartDataType'
import LatestBlocksTable from '../../../../components/tables/LatestBlocksTable'
import { unixTimeToHMS } from '../../../../function/unixTimeFormatter'
import * as getNormalizedUnit from '../../../../function/getNormalizedUnit'
import { useEffect, useState } from 'react'
import NewLatestTransactionsTable from '../../../../components/tables/NewLatestTransactionsTable'

type RowObj = {
  transactionHash: string
  from: string
  to: string
  gas: number
}

export default function NewLatestTransactions(props: {
  latestData: Array<transactionDetail>
}) {
  const [tableTransactionData, setTableTransactionData] = useState<Array<RowObj>>([])

  useEffect(() => {
    const updatedTableTransactionData: Array<RowObj> = props.latestData.map(
      (transactionData) => ({
        transactionHash: transactionData.hash,
        from: transactionData.from,
        to: transactionData.to,
        gas: transactionData.gas,
        value: Number(transactionData.value) / 1e18,
      }),
    ).reverse() // テーブル表示では降順にする
    setTableTransactionData(updatedTableTransactionData)
  }, [props.latestData[0]])

  return <NewLatestTransactionsTable tableData={tableTransactionData} />
}
