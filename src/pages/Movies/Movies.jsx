import React from 'react'
import Banner from '../../components/Banner/Banner'
import RowList from '../../components/Rows/RowList/RowList'

const Movies = () => {
  return (
    <div className="moviesPage">
      <Banner />
      <div style={{paddingTop: "20px"}}>
         <h1 style={{color: "white", paddingLeft: "40px"}}>Movies</h1>
         <RowList />
      </div>
    </div>
  )
}

export default Movies
