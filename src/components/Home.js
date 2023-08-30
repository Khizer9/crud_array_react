import React from 'react'
import ArrayTable from './ArrayTable'

const Home = (handleClick) => {


  return (
    <div>
        <h1 style={{margin: '20px 5px'}}>Employees Sheet</h1>
        <ArrayTable handleClick={handleClick}/>
    </div>
  )
}

export default Home
