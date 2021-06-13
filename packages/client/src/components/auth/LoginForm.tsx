import React, { useState } from 'react'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'

interface LoginFormProps {
  onEnter: (username: string, password: string) => void
}

const LoginForm = ({ onEnter }: LoginFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const disabled = username.length === 0 || password.length === 0

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const save = () => onEnter(username, password)

  return (
    <Form layout={'vertical'} style={{ minWidth: '200px' }}>
      <Form.Item label="Nome de usuário">
        <Input
          onChange={onChangeUsername}
          value={username}
          placeholder="Digite seu nome de usuário"
        />
      </Form.Item>
      <Form.Item label="Nome de usuário">
        <Input.Password
          onChange={onChangePassword}
          value={password}
          placeholder="Digite sua senha"
        />
      </Form.Item>
      <Form.Item>
        <Button block disabled={disabled} onClick={save} type="primary">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
