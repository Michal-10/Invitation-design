
import { Backdrop, Box, Paper, Typography } from "@mui/material"

export default () => {
    const open = true;
    return (
        <Backdrop open={open} sx={{ zIndex: 1300, color: "#fff" }}>
            <Paper
                elevation={3}
                sx={{
                    p: 6,
                    borderRadius: 3,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "50vh",
                    width: "50%",
                    bgcolor: "background.paper",
                    boxShadow: 3,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                        direction: "rtl",
                        color: "black",
                    }}
                >
                    מעבד את ההזמנה שלך
                </Typography>

                <Box
                    sx={{
                        width: "80%",
                        marginBottom:'10px',
                        height: 10,
                        overflow: "hidden",
                        borderRadius: 4,
                        position: "relative",
                        "&::after": {
                            content: '""',
                            width: "50%",
                            height: "100%",
                            bgcolor: "var(--primary-color)",
                            position: "absolute",
                            left: 0,
                            animation: "progress 2s infinite ease-in-out",
                        },
                        "@keyframes progress": {
                            "0%": { left: "-50%" },
                            "50%": { left: "50%" },
                            "100%": { left: "100%" },
                        },
                    }}
                />

                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, color: "black" }}>
                    אנו מעבדים את הקובץ שלך ומכינים את ההזמנה המעוצבת.
                    תהליך זה עשוי להימשך מספר רגעים, אנא המתן
                </Typography>
            </Paper>
        </Backdrop>
    )
}
