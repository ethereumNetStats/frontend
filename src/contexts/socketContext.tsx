// サイトの使用中にバックグラウンドでソケット通信を行ってデータの送受信をするためのコンテキストオブジェクト
import { useContext, createContext, useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

// ログ表示用の現在時刻を生成するモジュールのインポート
import { currentTimeReadable } from '@ethereum_net_stats/readable_time'

import type {
  arrayOfBlockData,
  responseLatestData,
  latestBlockData,
  transactionDetail,
  resultOfBlockSearchWithoutFrontendId,
  blockListTypeWithoutFrontendId,
  transactionSearchResult,
  basicNetStatsArray,
  attribute,
  netStatsArray,
} from '../types/chartDataType'

// コンテキストオブジェクトの生成
const SocketContext = createContext<any>({})

// netStatsRecorderを格納する配列
const attributes: Array<attribute> = ['Minutely', 'Hourly', 'Daily', 'Weekly']

// SocketProviderの宣言
const SocketProvider = (props: any) => {
  // socket.io-clientオブジェクトをステートとして格納
  const [socket, _] = useState<Socket>(() => io('https://ethsocketserver.net'))

  // 'Latest block'セクションで使用するデータをステート変数として格納
  const [arrayOfBlockData, setArrayOfBlockData] = useState<arrayOfBlockData>([])
  const [latestBlockData, setLatestBlockData] = useState<latestBlockData>([])
  const [latestTransactionData, setLatestTransactionData] = useState<
    Array<transactionDetail>
  >([])

  // Blocksセクションで使用するステート変数を初期化
  const [blockList, setBlockList] = useState<blockListTypeWithoutFrontendId>()
  // 'Block'セクションで表示中のページをステート変数として格納
  const [blockListCurrentPage, setBlockListCurrentPage] = useState<number>(0)
  // 'Block'セクションのトータルページ数をステート変数として格納
  const [blockListTotalPage, setBlockListTotalPage] = useState<number>(0)

  // Block Searchセクションで使用するデータをステート変数として格納
  const [blockSearchResult, setBlockSearchResult] =
    useState<resultOfBlockSearchWithoutFrontendId>()

  // Transaction Searchセクションで使用するステート変数宣言
  const [transactionSearchResult, setTransactionSearchResult] =
    useState<transactionSearchResult>()

  // ネットワークステータスを格納するステート変数を宣言
  const [minutelyNetStats, setMinutelyNetStats] = useState<netStatsArray>()
  const [hourlyNetStats, setHourlyNetStats] = useState<netStatsArray>()
  const [dailyNetStats, setDailyNetStats] = useState<netStatsArray>()
  const [weeklyNetStats, setWeeklyNetStats] = useState<netStatsArray>()

  // 各時間レンジのネットワークステータスのステートのset関数のオブジェクト
  const attributeMap = {
    Minutely: setMinutelyNetStats,
    Hourly: setHourlyNetStats,
    Daily: setDailyNetStats,
    Weekly: setWeeklyNetStats,
  }

  // このコンポーネントのマウント時に常時データを受信するイベントのリスナーを登録
  // 各コンポーネントでの表示に必要な初期データの要求イベントの発行もここで行う
  useEffect(() => {
    // latestBlockDataが空の場合はリクエスト
    if (latestBlockData.length === 0) {
      socket.emit('requestLatest10BlockData')
      // console.log(
      //   `${currentTimeReadable()} | Emit : 'requestLatest10BlockData' | To : dataPublisher`,
      // )
    }

    // requestLatest10Dataのレスポンスを受け取った時の処理
    // トップページ表示用の初期データ
    socket.on(
      'sendLatest10BlockData',
      (latest10BlockData: responseLatestData) => {
        setLatestBlockData(latest10BlockData.latestBlockData)
        setLatestTransactionData(latest10BlockData.latestTransactionData)
      },
    )

    // dataPublisherにデータがなかった場合には時間をおいて再要求
    socket.on('noLatest10BlockData', () => {
      setTimeout(() => {
        socket.emit('requestLatest10Data')
      }, 1000)
    })

    // dataPublisherから最新のデータ(latestOneBlockData)を受け取った時の処理
    socket.on(
      'sendLatestOneBlockData',
      (latestOneBlockData: responseLatestData) => {
        setLatestBlockData((prev) => {
          prev.shift()
          return [...prev, latestOneBlockData.latestBlockData[0]]
        })
        setLatestTransactionData((prev) => {
          prev.shift()
          return [...prev, latestOneBlockData.latestTransactionData[0]]
        })
      },
    )

    // dataPublisherからブロック検索の結果を受け取った時の処理
    socket.on('resultOfBlockSearch', (resultOfBlockSearch) => {
      setBlockSearchResult(resultOfBlockSearch)
    })

    // dataPublisherからsendBlockListを受け取った時の処理
    socket.on('sendBlockList', (blockList: blockListTypeWithoutFrontendId) => {
      setBlockList(blockList)
      setBlockListCurrentPage(blockList.currentPage)
      setBlockListTotalPage(blockList.totalPage)
      // console.log(blockList)
    })

    // トランザクション検索の結果を受け取った時の処理
    socket.on(
      'sendTransactionSearchResult',
      (transactionSearchResult: transactionSearchResult) => {
        setTransactionSearchResult(transactionSearchResult)
        // console.log(transactionSearchResult)
      },
    )

    // ネットワークステータスの初期データをリクエスト
    attributes.map((attribute): void => {
      socket.emit(`requestInitial${attribute}NetStats`)
      // console.log(
      //   `${currentTimeReadable()} | Emit : 'requestInitial${attribute}NetStats' | To : dataPublisher`,
      // )
    })

    // ネットワークステータスの初期データを受け取った時の処理
    attributes.map((attribute) => {
      socket.on(`sendInitial${attribute}NetStats`, (initialNetStats) => {
        attributeMap[attribute](initialNetStats)
        // console.log(
        //   `${currentTimeReadable()} | On : 'sendInitial${attribute}NetStats'`,
        //   initialNetStats,
        // )
      })
    })

    // ネットワークステータスの新規データを受け取った時の処理
    attributes.map((attribute) => {
      socket.on(`new${attribute}NetStatsToFrontend`, (newNetStats) => {
        attributeMap[attribute]((prev) => {
          prev.shift()
          return [...prev, newNetStats]
        })
      })
    })

    // １分ごとのネットワークステータスの新規データを受信した時の処理
    // socket.on('newMinutelyNetStatsToFrontend', (newMinutelyNetStats) => {
    //   //   １分ごとの新規ネットワークステータスを受け取った時にminutelyNetStatsのステートを更新
    //   //   minutelyNetStatsの最初の要素を削除して最後に新しいデータを追加
    //   setMinutelyNetStats((prev) => {
    //     prev.shift()
    //     return [...prev, newMinutelyNetStats]
    //   })
    // })

    // ユーザーがサイトを離れた時にソケット通信を切断
    return function cleanup() {
      socket.disconnect()
    }
  }, [])

  // このHooksから提供するステート、セットステート関数の定義
  return (
    <>
      <SocketContext.Provider
        value={{
          socket,
          arrayOfBlockData: arrayOfBlockData,
          setBlockData: setArrayOfBlockData,
          latestBlockData: latestBlockData,
          latestTransactionData: latestTransactionData,
          blockSearchResult: blockSearchResult,
          setBlockSearchResult: setBlockSearchResult,
          blockList: blockList,
          setBlockList: setBlockList,
          blockListCurrentPage: blockListCurrentPage,
          blockListTotalPage: blockListTotalPage,
          transactionSearchResult: transactionSearchResult,
          setTransactionSearchResult: setTransactionSearchResult,
          minutelyNetStats: minutelyNetStats,
          hourlyNetStats: hourlyNetStats,
          dailyNetStats: dailyNetStats,
          weeklyNetStats: weeklyNetStats,
        }}
        {...props}
      />
    </>
  )
}

// Hooksの宣言
const useSocket = () => useContext(SocketContext)

export { SocketProvider, useSocket }
