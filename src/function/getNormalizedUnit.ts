// チャートに表示する全ての数値の単位を統一するための関数

type convertedArrayObject = {
  data: Array<number>
  unit: string
  baseNumber: number
}

type singleNumberObject = {
  data: number
  unit: string
  baseNumber: number
}

const ofByteArray = (
  bytes: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxBytes = Math.max(...bytes)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let bytesArray: Array<number> = []

  const k = 1024
  const i = Math.floor(Math.log(maxBytes) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  bytes.forEach((byte) => {
    bytesArray.push(
      byte !== 0 ? parseFloat((byte / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: bytesArray,
    unit: units[i],
    baseNumber: base_number,
  }
}

const ofByte = (byte: number, decimals: number = 2): singleNumberObject => {
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals

  const k = 1024
  const i = Math.floor(Math.log(byte) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  return {
    data: byte !== 0 ? parseFloat((byte / Math.pow(k, i)).toFixed(dm)) : 0,
    unit: units[i],
    baseNumber: base_number,
  }
}

const ofWei = (wei: number, decimals: number = 2): singleNumberObject => {
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化

  const k = 1000
  const i = Math.floor(Math.log(wei) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = [
    'wei',
    'Kwei',
    'Mwei',
    'Gwei',
    'Twei',
    'Pwei',
    'Ewei',
    'Zwei',
    'Ywei',
  ]

  return {
    data: wei !== 0 ? parseFloat((wei / Math.pow(k, i)).toFixed(dm)) : 0,
    unit: units[i],
    baseNumber: base_number,
  }
}

const ofWeiArray = (
  wei: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxWei = Math.max(...wei)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let weiArray: Array<number> = []

  const k = 1000
  const i = Math.floor(Math.log(maxWei) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = [
    'wei',
    'Kwei',
    'Mwei',
    'Gwei',
    'Twei',
    'Pwei',
    'Ewei',
    'Zwei',
    'Ywei',
  ]

  wei.forEach((byte) => {
    weiArray.push(
      byte !== 0 ? parseFloat((byte / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: weiArray,
    unit: units[i],
    baseNumber: base_number,
  }
}

const ofCountArray = (
  counts: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...counts)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let countArray: Array<number> = []

  const k = 1000
  const i = Math.floor(Math.log(maxCounts) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  counts.forEach((count) => {
    countArray.push(
      count !== 0 ? parseFloat((count / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  // console.log(countArray)

  return {
    data: countArray,
    unit: units[i],
    baseNumber: base_number,
  }
}

const ofTpsArray = (
  tps: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxTps = Math.max(...tps)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let tpsArray: Array<number> = []

  const k = 1000
  const i = Math.floor(Math.log(maxTps) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  tps.forEach((tps) => {
    tpsArray.push(
      tps !== 0 ? parseFloat((tps / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: tpsArray,
    unit: units[i],
    baseNumber: base_number,
  }
}

const ofTimeDiffArray = (
  timeDiff: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxTps = Math.max(...timeDiff)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let timeDiffArray: Array<number> = []

  const k = 1000
  const i = Math.floor(Math.log(maxTps) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = [
    'sec',
    'Ksec',
    'Msec',
    'Gsec',
    'Tsec',
    'Psec',
    'Esec',
    'Zsec',
    'Ysec',
  ]

  timeDiff.forEach((tps) => {
    timeDiffArray.push(
      tps !== 0 ? parseFloat((tps / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: timeDiffArray,
    unit: units[i],
    baseNumber: base_number,
  }
}

export {
  ofByteArray,
  ofByte,
  ofWei,
  ofWeiArray,
  ofCountArray,
  ofTpsArray,
  ofTimeDiffArray,
}
