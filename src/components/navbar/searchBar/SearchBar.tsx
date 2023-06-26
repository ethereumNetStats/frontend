import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { SafeParseReturnType, z } from 'zod'
import { useHistory } from 'react-router-dom'
import { useSocket } from '../../../contexts/socketContext'

// バリデーションルールの定義。バリデーション成功時はtransformで入力データの種類を入力データに追加
const schema = z.union([
  // トランザクションハッシュのバリデーションルール
  z
    .string()
    .regex(/^0x([A-Fa-f0-9]{64})$/)
    .transform((val) => 'transactionHash:' + val),
  // アドレスのバリデーションルール
  // z.string().regex(/^(0x)[0-9a-fA-F]{40}$/).transform((val) => "address:" + val),
  // ブロックナンバーのバリデーションルール
  z
    .string()
    .regex(/^([1-9]\d*|0)$/)
    .transform((val) => 'blockNumber:' + val),
])

type Schema = z.infer<typeof schema>

export function SearchBar(props: {
  variant?: string
  background?: string
  children?: JSX.Element
  placeholder?: string
  borderRadius?: string | number
  [x: string]: any
}) {
  // useNavigate Hooksの呼び出し
  const history = useHistory()

  // socket contextから最新のブロックデータを取得
  const { latestBlockData } = useSocket()

  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props
  // Chakra Color Mode
  const searchIconColor = useColorModeValue('gray.700', 'white')
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900')
  const inputText = useColorModeValue('gray.700', 'gray.100')

  // 入力値のバリデーション結果を格納するステート変数
  const [isError, setIsError] = useState<boolean>(false)

  // 入力フォームでIME入力中か否かを判定するためのステート変数
  const [typing, setTyping] = useState<boolean>(false)

  // バリデーション結果を格納するRef変数
  const validationResult: React.MutableRefObject<
    undefined | SafeParseReturnType<unknown, Schema>
  > = useRef<undefined | SafeParseReturnType<unknown, Schema>>()

  // 入力中の処理
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // ユーザーがエンターキーを押下、かつエンターキーの押下がIMEの確定操作ではない、かつ入力欄が空ではない場合にバリデーションを実行
    if (e.key === 'Enter' && !typing && e.currentTarget.value !== '') {
      // 入力された値のバリデーション
      validationResult.current = schema.safeParse(e.currentTarget.value)
      // validation.currentにdataが入っているのはvalidationResult.current.successがtrueの時だけなのでif文で判定
      if (validationResult.current.success) {
        // 入力欄の強調表示を消去
        e.currentTarget.blur()
        // 入力値をクリア
        e.currentTarget.value = ''
        // バリデーション結果に応じてイベントをemit
        if (
          String(validationResult.current.data).substring(0, 15) ===
          'transactionHash'
        ) {
          setIsError(false)
          history.push(
            `/admin/transactionsearch?transactionHash=${validationResult.current.data.slice(
              16,
            )}`,
          )
        }
        // else if (String(validationResult.current.data).substring(0, 7) === "address") {
        //     console.log("address!");
        // }
        else if (
          String(validationResult.current.data).substring(0, 11) ===
          'blockNumber'
        ) {
          // バリデーション結果のブロックナンバーが最新のブロックナンバーより大きい場合はエラーを表示
          if (
            Number(validationResult.current.data.slice(12)) <=
            latestBlockData[0].number
          ) {
            setIsError(false)
            history.push(
              `/admin/search?blockNumber=${validationResult.current.data.slice(
                12,
              )}`,
            )
          } else {
            setIsError(true)
          }
        }
      } else {
        setIsError(true)
      }
    }
  }

  return (
    <InputGroup w={{ base: '100%', md: '200px' }} {...rest}>
      <InputLeftElement
        children={
          <IconButton
            aria-label="search"
            bg="inherit"
            borderRadius="inherit"
            _active={{
              bg: 'inherit',
              transform: 'none',
              borderColor: 'transparent',
            }}
            _focus={{
              boxShadow: 'none',
            }}
            icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
          />
        }
      />
      <Input
        variant="search"
        fontSize="sm"
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius={borderRadius ? borderRadius : '30px'}
        placeholder={placeholder ? placeholder : 'blockNumber or txHash'}
        onCompositionStart={() => {
          // 入力中にIMEの使用を開始したらフラグを設定
          setTyping(true)
        }}
        onCompositionEnd={() => {
          // IMEの使用が終了したらフラグを解除
          setTyping(false)
        }}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  )
}
