import styled from 'styled-components'

type Sizes = 'lg' | 'xs'
interface LogoProps {
  size: Sizes
}

const LogoText = styled.span<LogoProps>`
  font-size: ${props => (props.size === 'lg' ? '86px' : '24px')};
  font-style: italic;
  font-weight: 700;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  user-select: none;
  background: linear-gradient(to right, #30cfd0 0%, #1890ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const LogoSubTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  user-select: none;
  text-align: center;
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Logo = ({ size }: LogoProps) => {
  return (
    <LogoContainer>
      <LogoText size={size}>_SGES</LogoText>
      {size === 'lg' && (
        <LogoSubTitle>
          Sistema de Gerenciamento de Estabelecimentos
        </LogoSubTitle>
      )}
    </LogoContainer>
  )
}
export default Logo
