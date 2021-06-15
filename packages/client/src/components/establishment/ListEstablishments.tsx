import React from 'react'
import { Establishment } from '../../types'
import {
  DeleteOutlined,
  EditOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import Button from 'antd/es/button'
import List from 'antd/es/list'
import Popconfirm from 'antd/es/popconfirm'

interface ListEstablishmentsProps {
  establishmentList: Establishment[]
  favorites: string[]
  onEdit: (id: string) => () => Promise<void>
  onDelete: (id: string) => () => Promise<void>
  setFavorites: (favoriteId: string) => () => Promise<void>
}

const ListEstablishments = ({
  establishmentList,
  favorites,
  onDelete,
  onEdit,
  setFavorites,
}: ListEstablishmentsProps) => {
  return (
    <List
      style={{ marginTop: 10 }}
      dataSource={establishmentList}
      renderItem={item => (
        <List.Item key={item._id}>
          <List.Item.Meta
            title={
              <span>
                {item.name}{' '}
                {favorites.includes(item._id!) ? (
                  <StarFilled
                    style={{ color: '#FFD700' }}
                    onClick={setFavorites(item._id!)}
                  />
                ) : (
                  <StarOutlined onClick={setFavorites(item._id!)} />
                )}
              </span>
            }
            description={item.address}
          />
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
  )
}
export default ListEstablishments
