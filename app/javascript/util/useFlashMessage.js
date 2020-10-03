import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export default function useFlashMessage() {
  const location = useLocation()
  const history = useHistory()
  const [flashMessage, setFlashMessage] = useState(location.state && location.state.flashMessage)

  useEffect(() => {
    history.replace({ ...location, state: { ...location.state, flashMessage: null } })
  }, [])
  return flashMessage
}
