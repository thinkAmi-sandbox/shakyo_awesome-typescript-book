import { Heading } from './libs/Heading'
import { Text } from './libs/Text'

function App() {
  return (
    <>
      <Text text={'ほげ'} />

      <Heading tag="h1">見出し</Heading>
      <Heading tag="h1" children="childrenの見出し"></Heading>
      <Heading tag="h1">
        <span>hello, world!</span>
      </Heading>
    </>
  )
}

export default App
