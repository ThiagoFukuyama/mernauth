import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Person2Icon from "@mui/icons-material/Person2"
import LogoutIcon from "@mui/icons-material/Logout"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../slices/usersApiSlice"
import { clearCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

export default function Header() {
    const { userInfo } = useSelector((state: any) => state.auth)
    const [logoutApiCall] = useLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await logoutApiCall().unwrap()
            dispatch(clearCredentials())
            navigate("/")
        } catch (err: any) {
            toast.error(err?.data?.message)
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{ gap: 2 }}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ flexGrow: 1 }}
                    >
                        <RouterLink
                            to="/"
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            Mernauth
                        </RouterLink>
                    </Typography>

                    {userInfo ? (
                        <>
                            <Button
                                component={RouterLink}
                                to="/perfil"
                                color="inherit"
                                sx={{
                                    mr: "0.5rem",
                                }}
                            >
                                <Person2Icon sx={{ mr: "0.25rem" }} />
                                {userInfo.name.split(" ")[0]}
                            </Button>

                            <Button color="inherit" onClick={handleLogout}>
                                <LogoutIcon sx={{ mr: "0.25rem" }} />
                                Sair
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                component={RouterLink}
                                to="/login"
                                color="inherit"
                                sx={{ mr: "0.5rem" }}
                            >
                                <LoginIcon sx={{ mr: "0.25rem" }} />
                                Login
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/signup"
                                color="inherit"
                            >
                                <PersonAddIcon sx={{ mr: "0.25rem" }} />
                                Signup
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
