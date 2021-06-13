import React, { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import Card, { CardTabListType } from 'antd/es/card'
import { useAuth } from '../contexts/authContext'
import {
  HeaderContainer,
  MainContainer,
  PageContainer,
} from '../components/containers'
import Logo from '../components/logo'
import { RouteComponentProps } from 'react-router-dom'

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const tablist: CardTabListType[] = [
  { key: LOGIN, tab: 'Entre' },
  { key: REGISTER, tab: 'Registre-se' },
]

const AuthPage = ({ history }: RouteComponentProps) => {
  const [activeTab, setActiveTab] = useState(LOGIN)
  const { login } = useAuth()

  const onEnter = async (username: string, password: string) => {
    try {
      await login(username, password)
      history.push('/home')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Logo size="lg" />
      </HeaderContainer>
      <MainContainer>
        <Card
          title="Bem vindo"
          tabList={tablist}
          headStyle={{ textAlign: 'center' }}
          activeTabKey={activeTab}
          tabProps={{ centered: true }}
          onTabChange={setActiveTab}
        >
          {activeTab === LOGIN ? <LoginForm onEnter={onEnter} /> : <p>TODO</p>}
        </Card>
      </MainContainer>
    </PageContainer>
  )
}
export default AuthPage
