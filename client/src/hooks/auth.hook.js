import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  //new
  const [isAdmin, setIsAdmin] = useState(null)
  //
  const login = useCallback((jwtToken, id, admin) => {
    setToken(jwtToken)
    setUserId(id)
    setIsAdmin(admin)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, isAdmin: admin, token: jwtToken
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setIsAdmin(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.isAdmin)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, userId, isAdmin,  ready }
}
