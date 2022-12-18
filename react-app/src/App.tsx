import { Button } from './libs/Button'
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

      <Button onClick={() => console.log('clicked!')} title="プライマリ" type="primary" width={96} />
      <Button onClick={() => console.log('clicked!')} title="セカンダリ" type="secondary" />
      <Button onClick={() => console.log('clicked!')} title="エラー" type="error" />
    </>
  )
}

export default App
