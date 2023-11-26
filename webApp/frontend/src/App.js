import React from 'react'
import Test from './Test'
import Login from './components/Login'
import Upload from './components/Upload'
import Retrieve from './components/Retrieve'
import Particle from './components/Particle'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/utils/ProtectedRoute'
import AdminProtectedRoute from './components/utils/AdminProtectedRoute'
import WalletLogin from './components/WalletLogin'
import Mint from './components/Mint'
import Verify from './components/Verify'
import Transfer from './components/Transfer'
import GenerateRequest from './components/GenerateRequest'
import Register from './components/Register'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <React.Fragment>
        {/* <Retrieve></Retrieve> */}
        <BrowserRouter>
            <Routes>
            <Route exact path='/' element={<Login></Login>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="upload" element={<AdminProtectedRoute><Upload></Upload></AdminProtectedRoute>}></Route>
            <Route path="retrieve" element={<ProtectedRoute><Retrieve></Retrieve></ProtectedRoute>}></Route>
            <Route path="walletlogin" element={<ProtectedRoute><WalletLogin></WalletLogin></ProtectedRoute>}></Route>
            <Route path="mint" element={<AdminProtectedRoute><Mint></Mint></AdminProtectedRoute>}></Route>
            <Route path="verify" element={<ProtectedRoute><Verify></Verify></ProtectedRoute>}></Route>
            <Route path="transfer" element={<AdminProtectedRoute><Transfer></Transfer></AdminProtectedRoute>}></Route>
            <Route path='generate-request' element={<ProtectedRoute><GenerateRequest></GenerateRequest></ProtectedRoute>}></Route>
            </Routes>
        </BrowserRouter>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
