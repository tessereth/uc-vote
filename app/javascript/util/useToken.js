import { useLocation } from 'react-router-dom'

export default function useToken() {
  return new URLSearchParams(useLocation().search).get('token')
}
