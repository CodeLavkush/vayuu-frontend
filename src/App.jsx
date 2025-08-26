import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { SuccessToast } from "./helper/SuccessToast"
import { ErrorToast } from "./helper/ErrorToast"

function App() {
  const authMessage = useSelector((state)=> state.auth.message)

  useEffect(() => {
    if (authMessage !== null) {
      authMessage.error ? ErrorToast(authMessage.text) : SuccessToast(authMessage.text)
    }
  }, [authMessage]);

  return (
    <>
      {authMessage ? <Toaster richColors position="top-right" duration={4000}/> : '' }
      <Outlet/>
    </>
  )
}

export default App