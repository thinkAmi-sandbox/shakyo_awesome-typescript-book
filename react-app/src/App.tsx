import { Button } from './libs/Button'
import { Heading } from './libs/Heading'
import { Input } from './libs/Input'
import { PasswordForm } from './libs/PasswordForm'
import { Text } from './libs/Text'
import { Textarea } from './libs/TextArea'

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

      <hr />
      <Textarea width={500} maxLength={5} />

      <hr />
      <Input type="text" />

      <hr />
      <PasswordForm onSubmit={(password) => console.log(password)} />
    </>
  )
}

export default App
