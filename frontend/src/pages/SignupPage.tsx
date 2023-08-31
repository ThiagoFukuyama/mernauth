import { useState, useEffect, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"

import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Button, TextField, Typography, Link } from "@mui/material"
import { toast } from "react-toastify"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"

export default function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (password !== confirmpassword) {
            toast.error("Senhas não combinam")
            return
        }

        try {
            const res = await register({ name, email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate("/")
        } catch (err: any) {
            toast.error(err.data.message)
        }
    }

    return (
        <FormContainer>
            <Typography
                variant="h4"
                component="h1"
                textAlign="center"
                mb={4}
                mt={0}
            >
                Signup
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    required
                    variant="outlined"
                    label="Nome"
                    fullWidth
                    sx={{ mb: "1.5rem" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    type="email"
                    required
                    variant="outlined"
                    label="E-mail"
                    fullWidth
                    sx={{ mb: "1.5rem" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    type="password"
                    required
                    variant="outlined"
                    label="Senha"
                    fullWidth
                    sx={{ mb: "1.5rem" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                    type="password"
                    required
                    variant="outlined"
                    label="Confirmar Senha"
                    fullWidth
                    sx={{ mb: "1.5rem" }}
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button type="submit" variant="contained" sx={{ mb: "1.5rem" }}>
                    {isLoading ? <Loader /> : "Registrar-se"}
                </Button>

                <Typography variant="body2" color="text.secondary">
                    Já tem uma conta?{" "}
                    <Link component={RouterLink} to="/login">
                        Entrar
                    </Link>
                </Typography>
            </form>
        </FormContainer>
    )
}
