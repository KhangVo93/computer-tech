
import FooterComponent from './components/footer/FooterComponent.js';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContentComponent from './components/content/ContentComponent.js';
import { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase'
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from './useWindowDimensions'
import axios from 'axios';
// import './styleNavbar.css'
import Header from './components/header/Header.js';
function App() {
  let navigate = useNavigate();

  const [objResult, setObj] = useState(null)
  const [arrEmail, setArrEmail] = useState([])
  const [idUser, setIdUser] = useState(null)

  // Mảng chứa giỏ hàng của idUser đang login
  const [aRRCart, setArrCart] = useState([])

  const [cartLength, setCartLength] = useState(0)

  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)

  const loginGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        setObj(result)
        createUser(result.user.email, result.user.displayName)
        window.location.assign('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logoutGoogle = () => {
    auth.signOut()
      .then(() => {
        setObj(null)
        setIdUser('')
        setArrCart([])
        setCartLength(0)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createUser = (email, name) => {
    let validata = arrEmail.includes(email);
    if (!validata) {
      restApiCreateUser(email, name)
    }
  }

  let d = new Date()
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  const restApiCreateUser = (email, name) => {
    const body = {
      body: {
        FullName: name,
        Email: email,
        Username: "",
        Password: "",
        TimeCreated: `${day}/${month}/${year}`,
        TimeUpdated: `${day}/${month}/${year}`
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    axios.post('https://computer-tech-be.herokuapp.com/customers', body.body, body.headers)
      .then(() => {
        toast.success('Đăng ký thành công');
        setTimeout(() => window.location.assign("/"), 3000)
      })
      .catch(error => {
        toast.error('Đăng ký thất bại!!!');
        console.log(error.response);
      })
  }

  const restApiCheckData = () => {
    axios.get(`https://computer-tech-be.herokuapp.com/customers/checkdata`)
      .then((data) => {
        for (let i in data.data.customer) {
          let email = data.data.customer[i].Email
          arrEmail.push(email)
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
  }

  const restApiGetId = (email) => {
    axios.get(`https://computer-tech-be.herokuapp.com/customers/getIdByEmail/${email}`)
      .then((data) => {
        setIdUser(data.data.customer[0]._id)
      })
      .catch((error) => {
        console.log(error.response);
      })
  }

  const restApiGetIdByUsername = (paramUserName) => {
    axios.get(`https://computer-tech-be.herokuapp.com/customers/getIdByUsername/${paramUserName}`)
      .then((data) => {
        setIdUser(data.data.customer[0]._id)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  const login = () => {
    axios.get(`https://computer-tech-be.herokuapp.com/customers/checkdata/${userName}`)
      .then((data) => {
        if (data.data.customer[0].Password == password) {
          toast.success('Đăng nhập thành công')
          setObj(data.data.customer[0])
          restApiGetIdByUsername(data.data.customer[0].Username)
          navigate('/');
        }
        else {
          toast.error('Sai mật khẩu')
        }
      })
      .catch((err) => {
        toast.error('Sai tài khoản')
      })
  }
  // Hàm rest api lấy data
  const getCartByIdUser = async () => {
    axios.get(`https://computer-tech-be.herokuapp.com/customers/${idUser}/cart`)
      .then((data) => {
        setArrCart(data.data.Carts)
        setCartLength(data.data.Carts.length)
      })
      .catch((error) => {
        //console.log(error.response);
      })
  }

  useEffect(() => {
    restApiCheckData()
    auth.onAuthStateChanged((objResult) => {
      setObj(objResult)
      restApiGetId(objResult.email)
    })
  }, [])

  useEffect(() => {
    getCartByIdUser()
  }, [idUser])

  const { height, width } = useWindowDimensions();

  return (
    <div style={{ width: width, height: height }}>
      <Header objResult={objResult} logoutGoogle={logoutGoogle} idUser={idUser} aRRCart={aRRCart} cartLength={cartLength} />
      {/* <HeaderComponent objResult={objResult} logoutGoogle={logoutGoogle} idUser={idUser} aRRCart={aRRCart} cartLength={cartLength} /> */}
      <Container>
        <ContentComponent login={login} setUserName={setUserName} userName={userName} setPassword={setPassword} password={password} loginGoogle={loginGoogle} objResult={objResult} setArrCart={setArrCart} idUser={idUser} aRRCart={aRRCart} setCartLength={setCartLength} cartLength={cartLength} />
      </Container>
      <FooterComponent />
      <ToastContainer />
    </div >
  );
}

export default App;
