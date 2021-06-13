import React from 'react'
import { Establishment } from '../types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Button from 'antd/es/button'
import List from 'antd/es/list'
import Popconfirm from 'antd/es/popconfirm'

interface ListEstablishmentsProps {
  establishmentList: Establishment[]
  onEdit: (id: string) => () => Promise<void>
  onDelete: (id: string) => () => Promise<void>
}

const ListEstablishments = ({
  establishmentList,
  onDelete,
  onEdit,
}: ListEstablishmentsProps) => {
  return (
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
  )
}
export default ListEstablishments
