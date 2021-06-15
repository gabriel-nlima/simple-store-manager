import React from 'react'
import { HeaderContainer } from '../components/containers'
import Logo from '../components/MainLogo'
import { useAuth } from '../contexts/authContext'
import Dropdown from 'antd/es/dropdown'
import Menu from 'antd/es/menu'
import Button from 'antd/es/button'
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const menu = (onClick: (e: string) => void) => (
  <Menu onClick={e => onClick(e.key)}>
    <Menu.Item key="0" icon={<EditOutlined />}>
      Meus dados
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" icon={<LogoutOutlined />}>
      Sair
    </Menu.Item>
  </Menu>
)

const HeaderContent = () => {
  const { user, logout } = useAuth()
  const history = useHistory()

  const handleMenuClick = (key: string) => {
    switch (key) {
      case '0':
        history.push('/my_profile')
        break
      case '1':
        logout()
        history.push('/')
        break
      default:
        break
    }
  }

  return !!user ? (
    <HeaderContainer
      style={{
        justifyContent: 'space-between',
        width: '100%',
        padding: '10px 35px',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Logo size="xs" />
      <Dropdown overlay={menu(handleMenuClick)} trigger={['hover', 'click']}>
        <Button>
          {user.name}
          <UserOutlined />
        </Button>
      </Dropdown>
    </HeaderContainer>
  ) : (
    <></>
  )
}
export default HeaderContent
