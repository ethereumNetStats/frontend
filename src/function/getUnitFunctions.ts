type convertedArrayObject = {
  data: Array<number>
  unit: string
  baseNumber: number
}

// 関数名はsrc/variables/displayData.tsのdisplayData配列の要素名と一致させる

const numberOfAddress = (
  addresses: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...addresses)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedAddresses: Array<number> = []

  const k = 1000
  const i = maxCounts !== 0 ? Math.floor(Math.log(maxCounts) / Math.log(k)) : 0
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  addresses.forEach((block) => {
    convertedAddresses.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedAddresses,
    unit: units[i],
    baseNumber: base_number,
  }
}

const blocks = (
  blocks: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...blocks)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedBlocks: Array<number> = []

  const k = 1000
  const i = maxCounts !== 0 ? Math.floor(Math.log(maxCounts) / Math.log(k)) : 0
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  blocks.forEach((block) => {
    convertedBlocks.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedBlocks,
    unit: units[i],
    baseNumber: base_number,
  }
}

const totalBlockSize = (
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

const averageBlockSize = (
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

const blockSizePerBlock = (
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

const totalNumberOfUncleBlocks = (
  blocks: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...blocks)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedBlocks: Array<number> = []

  const k = 1000
  const i = maxCounts !== 0 ? Math.floor(Math.log(maxCounts) / Math.log(k)) : 0
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  blocks.forEach((block) => {
    convertedBlocks.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedBlocks,
    unit: units[i],
    baseNumber: base_number,
  }
}

const averageNumberOfUncleBlocks = (
  blocks: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...blocks)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedBlocks: Array<number> = []

  const k = 1000
  const i = maxCounts !== 0 ? Math.floor(Math.log(maxCounts) / Math.log(k)) : 0
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  blocks.forEach((block) => {
    convertedBlocks.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedBlocks,
    unit: units[i],
    baseNumber: base_number,
  }
}

const numberOfUncleBlocksPerBlock = (
  blocks: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...blocks)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedBlocks: Array<number> = []

  const k = 1000
  const i = maxCounts !== 0 ? Math.floor(Math.log(maxCounts) / Math.log(k)) : 0
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  blocks.forEach((block) => {
    convertedBlocks.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedBlocks,
    unit: units[i],
    baseNumber: base_number,
  }
}

const totalTransactions = (
  numberOfTransactions: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...numberOfTransactions)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedNumberOfTransactions: Array<number> = []

  const k = 1000
  const i = Math.floor(Math.log(maxCounts) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  numberOfTransactions.forEach((block) => {
    convertedNumberOfTransactions.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedNumberOfTransactions,
    unit: units[i],
    baseNumber: base_number,
  }
}

const averageTransactions = (
  numberOfTransactions: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...numberOfTransactions)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedNumberOfTransactions: Array<number> = []

  const k = 1000
  const i = Math.floor(Math.log(maxCounts) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  numberOfTransactions.forEach((block) => {
    convertedNumberOfTransactions.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedNumberOfTransactions,
    unit: units[i],
    baseNumber: base_number,
  }
}

const transactionsPerBlock = (
  numberOfTransactions: Array<number>,
  decimals: number = 2,
): convertedArrayObject => {
  // 受け取った数値配列の中から最大値を抽出
  const maxCounts = Math.max(...numberOfTransactions)
  // 小数点以下の桁数を設定
  const dm = decimals < 0 ? 0 : decimals
  // 単位を統一した後の数列を格納する配列の初期化
  let convertedNumberOfTransactions: Array<number> = []

  const k = 1000
  const i = Math.floor(Math.log(maxCounts) / Math.log(k))
  const base_number = Math.pow(k, i)
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

  numberOfTransactions.forEach((block) => {
    convertedNumberOfTransactions.push(
      block !== 0 ? parseFloat((block / Math.pow(k, i)).toFixed(dm)) : 0,
    )
  })

  return {
    data: convertedNumberOfTransactions,
    unit: units[i],
    baseNumber: base_number,
  }
}

const totalBaseFeePerGas = (
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

const averageBaseFeePerGas = (
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

const baseFeePerGasPerBlock = (
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

const totalGasUsed = (
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

const averageGasUsed = (
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

const gasUsedPerBlock = (
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

const unitFunctions: { [key: string]: (...args: any[]) => any } = {
  blocks: blocks,
  totalBlockSize: totalBlockSize,
  averageBlockSize: averageBlockSize,
  blockSizePerBlock: blockSizePerBlock,
  totalNumberOfUncleBlocks: totalNumberOfUncleBlocks,
  averageNumberOfUncleBlocks: averageNumberOfUncleBlocks,
  numberOfUncleBlocksPerBlock: numberOfUncleBlocksPerBlock,
  totalTransactions: totalTransactions,
  averageTransactions: averageTransactions,
  transactionsPerBlock: transactionsPerBlock,
  totalBaseFeePerGas: totalBaseFeePerGas,
  averageBaseFeePerGas: averageBaseFeePerGas,
  baseFeePerGasPerBlock: baseFeePerGasPerBlock,
  totalGasUsed: totalGasUsed,
  averageGasUsed: averageGasUsed,
  gasUsedPerBlock: gasUsedPerBlock,
  numberOfAddress: numberOfAddress,
}

export default unitFunctions
