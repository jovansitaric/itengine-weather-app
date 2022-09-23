import React from 'react'
import logo from '../logo.svg'

const Loader = () => {
  return (
    <div className="m-loader">
        <h2>Loading...</h2>
        <img src={logo} className="m-loader__logo" alt="logo" />
    </div>
  )
}

export default Loader