import React from 'react'
import Banner from '../../components/Banner/Banner'
import RowList from '../../components/Rows/RowList/RowList'

const TVShows = () => {
  return (
    <div className="tvShows">
      <Banner />
      <div style={{paddingTop: "20px"}}>
         <h1 style={{color: "white", paddingLeft: "40px"}}>TV Shows</h1>
         <RowList />
      </div>
    </div>
  )
}

export default TVShows
