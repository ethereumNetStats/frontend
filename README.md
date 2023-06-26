# pageServer2について

pageServer2は、ethereumNetStatsのReactサーバーです。
ethereumNetStatsでできることは以下の通りです。
- 直近１０ブロック分のデータをリアルタイムで表示
- 各集計期間（１分、１時間、１日、１週間）ごとの 集計データのチャート表示
- 全ブロックデータを２５個づつに分割してページングしたリストの表示
- 入力・選択したブロックデータの検索・詳細表示
- 入力したトランザクションハッシュのトランザクションを検索・表示

# ソースコード
ソースコードは[src](https://github.com/ethereumNetStats/pageServer2)内をご参照ください。

# ベースプロジェクト
このフロントエンドは、[Hotizon-UI](https://horizon-ui.com/)をベースにして制作しました。  
ベースのソースコードは[こちら](https://github.com/horizon-ui/horizon-ui-chakra-ts/tree/feature/react-table-v8/src)をご参照ください。