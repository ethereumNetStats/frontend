import { arrayOfBlockData, blockData, latestBlockData } from '../../../../types/chartDataType'
import LatestBlocksTable from '../../../../components/tables/LatestBlocksTable'
import { unixTimeToHMS } from '../../../../function/unixTimeFormatter'
import * as getNormalizedUnit from '../../../../function/getNormalizedUnit'
import { useEffect, useState } from 'react'
import NewLatestBlocksTable from '../../../../components/tables/NewLatestBlocksTable'

type RowObj = {
  number: number
  timestamp: string
  transactions: number
  gasUsed: string
}

export default function NewLatestBlocks(props: {
  latestData: latestBlockData
}) {
  const [tableBlockData, setTableBlockData] = useState<Array<RowObj>>([])

  useEffect(() => {
    const updatedTableBlockData: Array<RowObj> = props.latestData.map(
      (blockData) => ({
        number: blockData.number,
        timestamp: unixTimeToHMS(blockData.timestamp),
        transactions: blockData.transactions.split(',').length,
        gasUsed: `${getNormalizedUnit.ofWei(blockData.gasUsed).data} ${
          getNormalizedUnit.ofWei(blockData.gasUsed).unit
        }`,
      }),
    ).reverse() // テーブル表示では降順にする
    setTableBlockData(updatedTableBlockData)
  }, [props.latestData[0]])

  return <NewLatestBlocksTable tableData={tableBlockData} />
}
