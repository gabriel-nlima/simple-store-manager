import React, { useEffect, useState, useCallback } from 'react'
import { MainContainer, PageContainer } from '../components/containers'
import HeaderContent from './HeaderContent'
import Card from 'antd/es/card'
import { Establishment } from '../types'
import establishmentApi from '../api/establishment'
import Row from 'antd/es/row'
import Input from 'antd/es/input'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Button from 'antd/es/button'
import Modal from 'antd/es/modal'
import EstablishmentForm from '../components/EstablishmentForm'
import List from 'antd/es/list'
import Popconfirm from 'antd/es/popconfirm'
import message from 'antd/es/message'
import useDebounce from '../hooks/useDebounce'

const EstablishmentPage = () => {
  const [editing, setEditing] = useState<Establishment | undefined>(undefined)
  const [searchString, setSearchString] = useState('')
  const [establishmentList, setEstablishmentList] = useState<Establishment[]>(
    []
  )

  // aguarda 0.75 segundo depois que o usuário digita para pesquisar estabelecimentos
  const debouncedSearch = useDebounce(searchString, 750)

  const searchEstablishments = useCallback(async search => {
    try {
      setEstablishmentList(await establishmentApi.search(search))
    } catch (error) {
      console.error(error)
    }
  }, [])

  // pesquisa estabelecimentos ao entrar na página e depois do usuário pesquisar algo (com delay)
  useEffect(() => {
    searchEstablishments(debouncedSearch)
  }, [debouncedSearch, searchEstablishments])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const onSave = async (data: Establishment) => {
    try {
      if (data._id) {
        await establishmentApi.update(data)
      } else {
        await establishmentApi.create(data)
      }
      await searchEstablishments('')
      setEditing(undefined)
      setSearchString('')
      message.info('Estabelecimento salvo.')
    } catch (error) {
      console.error(error)
      message.error('Erro ao salvar estabelecimento.')
    }
  }

  const onEdit = (id: string) => async () => {
    try {
      setEditing(await establishmentApi.load(id))
    } catch (error) {
      console.error(error)
    }
  }

  const onDelete = (id: string) => async () => {
    try {
      await establishmentApi.delete(id)
      await searchEstablishments('')
      setEditing(undefined)
      setSearchString('')
      message.info('Estabelecimento removido.')
    } catch (error) {
      console.error(error)
      message.error('Erro ao remover estabelecimento.')
    }
  }

  return (
    <PageContainer>
      <HeaderContent />
      <MainContainer>
        <Card title="Estabelecimentos">
          <Row justify="space-between" gutter={16} align="middle" wrap={false}>
            <Input
              placeholder="Buscar estabelecimentos"
              value={searchString}
              onChange={onChangeSearch}
              suffix={<SearchOutlined />}
            />
            <Button
              style={{ marginLeft: 5 }}
              type="primary"
              icon={<PlusOutlined />}
              title="Novo"
              onClick={() => setEditing({} as Establishment)}
            />
          </Row>
          <List
            style={{ marginTop: 10 }}
            dataSource={establishmentList}
            renderItem={item => (
              <List.Item key={item._id}>
                <List.Item.Meta title={item.name} description={item.address} />
                <Button
                  onClick={onEdit(item._id!)}
                  type="text"
                  icon={<EditOutlined />}
                />
                <Popconfirm
                  title="Você tem certeza?"
                  onConfirm={onDelete(item._id!)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button danger type="text" icon={<DeleteOutlined />} />
                </Popconfirm>
              </List.Item>
            )}
          />
        </Card>
      </MainContainer>
      <Modal
        title={
          editing && editing._id
            ? 'Editar estabelecimento'
            : 'Novo estabelecimento'
        }
        visible={!!editing}
        onCancel={() => setEditing(undefined)}
        footer={null}
      >
        {editing && (
          <EstablishmentForm onSave={onSave} establishment={editing} />
        )}
      </Modal>
    </PageContainer>
  )
}

export default EstablishmentPage
