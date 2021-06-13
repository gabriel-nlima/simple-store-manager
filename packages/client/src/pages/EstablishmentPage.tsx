import React from 'react'
import {
  HeaderContainer,
  MainContainer,
  PageContainer,
} from '../components/containers'
import Logo from '../components/logo'

const EstablishmentPage = () => {
  return (
    <PageContainer>
      <HeaderContainer>
        <Logo size="xs" />
      </HeaderContainer>
      <MainContainer>Estabelecimentos</MainContainer>
    </PageContainer>
  )
}

export default EstablishmentPage
