import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Input } from "reactstrap"
import { toast } from "react-toastify"
import { useEffect } from 'react'
function LoginComponent({ loginGoogle, setUserName, setPassword, login, userName, password }) {
    const onClickLoginGoogle = () => {
        loginGoogle()
    }
    const onChangeUsername = (event) => {
        setUserName(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const onClickLogin = () => {
        if (!userName) {
            toast.error('Bạn chưa nhập Username')
        }
        if (!password) {
            toast.error('Bạn chưa nhập mật khẩu')
        }
        if (userName && password) {
            login()
        }
    }
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Form className="form-login">
                    <FormGroup>
                        <Button onClick={onClickLoginGoogle} className="btn-danger button-login">
                            <i className="fa-brands fa-google"></i>  Sign in with <b>Google</b>
                        </Button>
                    </FormGroup>
                    <hr style={{ width: 300 }} />
                    <FormGroup>
                        <Input type="text" className="input-login" onChange={onChangeUsername} placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" className="input-login" onChange={onChangePassword} placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn-success button-login" onClick={onClickLogin}>Sign in</Button>
                    </FormGroup>
                    <FormGroup>
                        <hr />
                    </FormGroup>
                    <FormGroup>
                        <Link to={'/login/signup'} className='btn btn-info button-login' style={{ textDecoration: 'none', color: 'black' }}>Sign up</Link>
                    </FormGroup>
                </Form>

            </div>
        </>
    )
}
export default LoginComponent