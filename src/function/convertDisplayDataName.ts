const convertDisplayDataName = (name: string): string => {
  const displayDataNames: { [key: string]: string } = {
    numberOfAddress: 'New Address',
    blocks: 'Blocks',
    totalBlockSize: 'Total Block Size',
    averageBlockSize: 'Average Block Size',
    totalNumberOfUncleBlocks: 'Total Number Of Uncle Blocks',
    totalTransactions: 'Total Transactions',
    totalBaseFeePerGas: 'Total Base Fee Per Gas',
    totalGasUsed: 'Total Gas Used',
  }

  return displayDataNames[name] || name
}

export default convertDisplayDataName
