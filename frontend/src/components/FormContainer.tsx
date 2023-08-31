import { ReactNode } from "react"
import { Container, Grid, Paper } from "@mui/material"

type FormContainerProps = {
    children: ReactNode
}

export default function FormContainer({ children }: FormContainerProps) {
    return (
        <Container>
            <Grid container justifyContent="center" mt="3rem">
                <Grid item xs={12} md={5}>
                    <Paper elevation={2} sx={{ p: "2.5rem" }}>
                        {children}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
