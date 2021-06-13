import React, { useState } from 'react'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import { Establishment } from '../types'
import { useEffect } from 'react'

interface EstablishmentFormProps {
  onSave: (user: Establishment) => void
  establishment?: Establishment
}

const EstablishmentForm = ({
  onSave,
  establishment,
}: EstablishmentFormProps) => {
  const [data, setData] = useState(establishment || ({} as Establishment))

  useEffect(() => {
    setData(establishment || ({} as Establishment))
  }, [establishment])

  const onChange =
    (key: keyof Establishment) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData(prevUser => ({ ...prevUser, [key]: e.target.value }))
    }

  const isDisabled = () => {
    return !data.name || !data.address
  }
  const save = () => {
    if (!isDisabled()) {
      onSave(data)
    }
  }

  return (
    <Form layout={'vertical'} style={{ minWidth: '200px' }}>
      <Form.Item label="Nome">
        <Input
          onChange={onChange('name')}
          value={data.name}
          placeholder="Digite seu nome"
        />
      </Form.Item>
      <Form.Item label="Endereço">
        <Input
          onChange={onChange('address')}
          value={data.address}
          placeholder="Digite o endereço"
        />
      </Form.Item>
      <Form.Item>
        <Button block disabled={isDisabled()} onClick={save} type="primary">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EstablishmentForm
