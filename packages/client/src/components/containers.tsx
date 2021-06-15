import styled from 'styled-components'

export const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`

export const MainContainer = styled.section`
  height: 100%;
  min-width: 275px;
  width: 100%;
  padding: 5px 20px;
  flex: 2;
  overflow: hidden auto;

  @media (max-width: 320px) {
    max-width: 275px;
    padding: 5px;
  }

  @media (max-width: 420px) {
    max-width: 390px;
  }

  @media (max-width: 576px) {
    max-width: 550px;
  }

  @media (max-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 890px;
  }

  @media (min-width: 1200px) {
    max-width: 1100px;
  }

  @media (min-width: 1600px) {
    max-width: 1480px;
  } ;
`
