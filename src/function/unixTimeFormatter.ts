const unixTimeArrayToHMS = (unixSecTime: Array<number>): Array<string> => {
  let returnArray: Array<string> = []

  unixSecTime.forEach((time) => {
    let dateObj = new Date(time * 1000)
    returnArray.push(
      `${dateObj.getUTCHours()}:${('0' + dateObj.getUTCMinutes()).slice(-2)}:${(
        '0' + dateObj.getUTCSeconds()
      ).slice(-2)}`,
    )
  })

  return returnArray
}

const unixTimeArrayToYMDHMS = (
  unixSecTime: Array<number>,
): Array<Array<string>> => {
  let returnArray: Array<Array<string>> = []

  unixSecTime.forEach((time) => {
    let dateObj = new Date(time * 1000)
    returnArray.push([
      `${dateObj.getUTCFullYear()}-${('0' + (dateObj.getUTCMonth() + 1)).slice(
        -2,
      )}-${('0' + dateObj.getUTCDate()).slice(-2)}`,
      `${dateObj.getUTCHours()}:${('0' + dateObj.getUTCMinutes()).slice(-2)}:${(
        '0' + dateObj.getUTCSeconds()
      ).slice(-2)}`,
    ])
  })

  return returnArray
}

function unixTimeArrayToHMSWithInterval(
  unixTimeArray: number[],
  minutesInterval: number = 10,
): string[] {
  const returnArray: string[] = []
  const startDate = new Date(unixTimeArray[0] * 1000)
  const startHour = startDate.getHours()
  const startMinute = startDate.getMinutes()

  // minutesIntervalの倍数である時間のみを要素として挿入する
  for (let i = 0; i < unixTimeArray.length; i++) {
    const date = new Date(unixTimeArray[i] * 1000)
    const hour = date.getHours()
    const minute = date.getMinutes()
    if (minute % minutesInterval === 0) {
      returnArray.push(`${hour}:${minute < 10 ? '0' + minute : minute}`)
    } else {
      returnArray.push('')
    }
  }

  // 最初と最後の要素には時間を挿入する
  returnArray[0] = `${startHour}:${
    startMinute < 10 ? '0' + startMinute : startMinute
  }`
  const lastDate = new Date(unixTimeArray[unixTimeArray.length - 1] * 1000)
  const lastHour = lastDate.getHours()
  const lastMinute = lastDate.getMinutes()
  returnArray[returnArray.length - 1] = `${lastHour}:${
    lastMinute < 10 ? '0' + lastMinute : lastMinute
  }`

  return returnArray
}

const unixTimeToHMS = (unixSecTime: number): string => {
  let dateObj = new Date(unixSecTime * 1000)

  return `${dateObj.getUTCHours()}:${('0' + dateObj.getUTCMinutes()).slice(
    -2,
  )}:${('0' + dateObj.getUTCSeconds()).slice(-2)}`
}

export {
  unixTimeArrayToHMS,
  unixTimeArrayToHMSWithInterval,
  unixTimeToHMS,
  unixTimeArrayToYMDHMS,
}
