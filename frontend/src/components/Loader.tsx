import CircularProgress from "@mui/material/CircularProgress"

type LoaderProps = {
    size?: number
}

export default function Loader({ size = 25 }: LoaderProps) {
    return <CircularProgress color="inherit" size={size} />
}
