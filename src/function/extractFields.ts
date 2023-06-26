import { netStatsArray, netStats } from '../types/chartDataType'

// 引数netStatsArrayからendTimeUnixとfieldsに指定されたフィールドのみを抽出した
// オブジェクトの配列を返す関数
const extractFields = (netStatsArray: netStatsArray, fields: string) => {
  let newNetStatsArray: Array<Partial<netStats>> = []

  for (let i = 0; i < netStatsArray.length; i++) {
    let newNetStats: Partial<netStats> = {
      endTimeUnix: netStatsArray[i].endTimeUnix,
    }
    newNetStats[fields] = netStatsArray[i][fields]

    newNetStatsArray.push(newNetStats)
  }

  // console.log(newNetStatsArray)

  return newNetStatsArray
}

export default extractFields
