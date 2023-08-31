import { useState, useEffect, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"

import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Button, TextField, Typography, Link } from "@mui/material"
import { toast } from "react-toastify"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate("/")
        } catch (err: any) {
            toast.error(err?.data?.message || err.error)
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
                Login
            </Typography>

            <form onSubmit={handleSubmit}>
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

                <Button type="submit" variant="contained" sx={{ mb: "1.5rem" }}>
                    {isLoading ? <Loader /> : "Login"}
                </Button>

                <Typography variant="body2" color="text.secondary">
                    Novo por aqui?{" "}
                    <Link component={RouterLink} to="/signup">
                        Registre-se
                    </Link>
                </Typography>
            </form>
        </FormContainer>
    )
}
