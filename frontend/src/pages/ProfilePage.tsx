import { useState, useEffect, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../slices/authSlice"
import { useUpdateProfileMutation } from "../slices/usersApiSlice"

import { Button, TextField, Typography } from "@mui/material"
import { toast } from "react-toastify"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"

export default function ProfilePage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state: any) => state.auth)
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.name, userInfo.email])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (password !== confirmpassword) {
            toast.error("Senhas não combinam")
            return
        }

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password,
            }).unwrap()
            dispatch(setCredentials({ ...res }))
            toast.success("Perfil atualizado com sucesso")
        } catch (err: any) {
            toast.error(err?.data?.message)
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
                Atualizar Perfil
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
                    variant="outlined"
                    label="Senha"
                    fullWidth
                    sx={{ mb: "1.5rem" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                    type="password"
                    variant="outlined"
                    label="Confirmar Senha"
                    fullWidth
                    sx={{ mb: "1.5rem" }}
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button type="submit" variant="contained" sx={{ mb: "1.5rem" }}>
                    {isLoading ? <Loader /> : "Atualizar"}
                </Button>
            </form>
        </FormContainer>
    )
}
