import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { MainContainer, PageContainer } from '../components/containers'
import HeaderContent from './HeaderContent'
import Card from 'antd/es/card'
import { Establishment } from '../types'
import establishmentApi from '../api/establishment'
import Row from 'antd/es/row'
import Input from 'antd/es/input'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import Button from 'antd/es/button'
import Modal from 'antd/es/modal'
import EstablishmentForm from '../components/establishment/EstablishmentForm'
import message from 'antd/es/message'
import useDebounce from '../hooks/useDebounce'
import ListEstablishments from '../components/establishment/ListEstablishments'
import { useAuth } from '../contexts/authContext'
import usersApi from '../api/usersApi'
import FavsList from '../components/establishment/FavsList'
import { HeadingBordered } from '../components/Heading'

const EstablishmentPage = () => {
  const [editing, setEditing] = useState<Establishment | undefined>(undefined)
  const [searchString, setSearchString] = useState('')
  const [establishmentList, setEstablishmentList] = useState<Establishment[]>(
    []
  )

  const { user, setUser } = useAuth()
  const favorites = useMemo(() => user?.favorites || [], [user?.favorites])

  const setFavorites = (favoriteId: string) => async () => {
    try {
      let favs = [...favorites]
      if (favs.includes(favoriteId)) {
        favs = favs.filter(fav => fav !== favoriteId)
      } else {
        favs.push(favoriteId)
      }
      setUser(await usersApi.updateMe({ favorites: favs }))
      message.info('Favorito salvo.')
    } catch (error) {
      message.error('Não foi possível salvar este favorito.')
      console.error(error)
    }
  }

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
          <Row
            justify="space-between"
            gutter={16}
            align="middle"
            style={{ marginBottom: 5, padding: '0px 8px' }}
            wrap={false}
          >
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
          {debouncedSearch === '' && favorites.length > 0 && (
            <>
              <HeadingBordered>Favoritos</HeadingBordered>
              <FavsList
                favorites={establishmentList.filter(item =>
                  favorites.includes(item._id!)
                )}
                onEdit={onEdit}
              />
            </>
          )}
          <HeadingBordered>Todos os estabelecimentos</HeadingBordered>
          <ListEstablishments
            establishmentList={establishmentList}
            onDelete={onDelete}
            onEdit={onEdit}
            setFavorites={setFavorites}
            favorites={favorites}
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
