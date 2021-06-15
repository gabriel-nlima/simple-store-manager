import React from 'react'
import styled from 'styled-components'
import Card from 'antd/es/card'
import { Establishment } from '../../types'

const HorizontalScrollContainer = styled.div`
  overflow: auto;
  white-space: nowrap;
  padding: 5px 0;
  margin-bottom: 7px;
`

const HorizontalScrollItem = styled.div`
  display: inline-block;
  margin-right: 5px;
`

interface FavsProps {
  favorites: Establishment[]
  onEdit: (id: string) => () => Promise<void>
}
const FavsList = ({ favorites, onEdit }: FavsProps) => {
  return (
    <HorizontalScrollContainer>
      {favorites.map(fav => (
        <HorizontalScrollItem key={fav._id}>
          <Card size="small" onClick={onEdit(fav._id!)} hoverable>
            <Card.Meta title={fav.name} description={fav.address} />
          </Card>
        </HorizontalScrollItem>
      ))}
    </HorizontalScrollContainer>
  )
}
export default FavsList
