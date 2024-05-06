import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { logoutUser } from "../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const Logout = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
  
    dispatch(logoutUser(navigate))
  }, [dispatch])

  return <>""</>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default Logout
