import React, { useState } from 'react'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import { User } from '../../types'

interface RegisterFormProps {
  onRegister: (user: User) => void
}

const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  } as User)
  const [confirmPassword, setConfirmPassword] = useState('')

  const onChangeUser =
    (key: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser(prevUser => ({ ...prevUser, [key]: e.target.value }))
    }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const isDisabled = () => {
    return (
      user.name === '' ||
      user.email === '' ||
      user.password === '' ||
      (user.password !== '' && user.password !== confirmPassword)
    )
  }
  const save = () => {
    if (!isDisabled()) {
      onRegister(user)
    }
  }

  return (
    <Form layout={'vertical'} style={{ minWidth: '200px' }}>
      <Form.Item label="Nome">
        <Input
          onChange={onChangeUser('name')}
          value={user.name}
          placeholder="Digite seu nome"
        />
      </Form.Item>
      <Form.Item label="E-mail">
        <Input
          onChange={onChangeUser('email')}
          value={user.email}
          placeholder="Digite seu email"
        />
      </Form.Item>
      <Form.Item label="Senha">
        <Input.Password
          onChange={onChangeUser('password')}
          value={user.password}
          placeholder="Digite sua senha"
        />
      </Form.Item>
      <Form.Item label="Confirme a senha">
        <Input.Password onChange={onChangePassword} value={confirmPassword} />
      </Form.Item>
      <Form.Item>
        <Button block disabled={isDisabled()} onClick={save} type="primary">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
