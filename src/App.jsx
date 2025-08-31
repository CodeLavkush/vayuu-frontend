import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import client from "./supabase/supabaseClient"
import { login, logout } from "./store/authSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // restore session on app start
    const initSession = async () => {
      const { data: { session } } = await client.auth.getSession()
      if (session?.user) {
        dispatch(login(session))
      }
    }
    initSession()

    // keep Redux in sync with auth state changes
    const { data: { subscription } } = client.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          dispatch(login(session))
        } else {
          dispatch(logout())
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch])

  return (
    <>
      <Toaster richColors position="top-right" duration={4000}/>
      <Outlet/>
    </>
  )
}

export default App