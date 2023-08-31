import { Button, Card, CardContent, Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <Container maxWidth="md">
            <Card
                sx={{
                    mt: "4rem",
                    p: "2rem",
                    bgcolor: "#1976d208",
                }}
            >
                <CardContent
                    sx={{ color: "text.secondary", textAlign: "center" }}
                >
                    <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        fontWeight="bold"
                        mb="1rem"
                    >
                        Autenticação MERN
                    </Typography>

                    <Typography variant="body2" sx={{ mb: "1.5rem" }}>
                        Este é um modelo inicial para autenticação MERN que
                        armazena um JWT em um cookie com o atributo HTTP-Only.
                        Ele também utiliza o Redux Toolkit e as bibliotecas do
                        Material UI.
                    </Typography>

                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        sx={{ mr: "1rem" }}
                    >
                        Login
                    </Button>

                    <Button
                        component={Link}
                        to="/signup"
                        variant="contained"
                        sx={{
                            bgcolor: "gray",
                            "&:hover": { bgcolor: "dimgray" },
                        }}
                    >
                        Signup
                    </Button>
                </CardContent>
            </Card>
        </Container>
    )
}
