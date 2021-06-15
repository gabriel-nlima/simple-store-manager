import React, { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import Card, { CardTabListType } from 'antd/es/card'
import { useAuth } from '../contexts/authContext'
import {
  HeaderContainer,
  MainContainer,
  PageContainer,
} from '../components/containers'
import Logo from '../components/Logo'
import { Redirect } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const tablist: CardTabListType[] = [
  { key: LOGIN, tab: 'Entre' },
  { key: REGISTER, tab: 'Registre-se' },
]

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(LOGIN)
  const { login, register, authenticaded } = useAuth()

  if (authenticaded) {
    return <Redirect to="/home" />
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
          {activeTab === LOGIN ? (
            <LoginForm onEnter={login} />
          ) : (
            <RegisterForm onRegister={register} />
          )}
        </Card>
      </MainContainer>
    </PageContainer>
  )
}
export default AuthPage
