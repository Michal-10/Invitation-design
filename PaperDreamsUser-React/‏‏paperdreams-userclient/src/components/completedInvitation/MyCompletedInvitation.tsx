
import { Grid, Typography, Box, CircularProgress, Container, Paper } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowCompletedInvitation from "./ShowCompletedInvitation";
import { fetchCompletedInvitation } from "../../redux/CompletedInvitationsSlice";
import { AppDispatch, RootState } from "../../redux/Store";

export default function MyCompletedInvitationPage() {
  const dispatch = useDispatch<AppDispatch>()
  const listCompletedInvitation = useSelector((state: RootState) => state.CompletedInvitation.listCompletedInvitation)
  const listLoading = useSelector((state: RootState) => state.CompletedInvitation.loading)

  useEffect(() => {
    dispatch(fetchCompletedInvitation())
  }, [dispatch])

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {listLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress size={60} sx={{ color: "var(--primary-color)" }} />
        </Box>
      ) : (
        <>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: "linear-gradient(to right, var(--primary-color), #e05e52)",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: "bold",
                direction: "rtl",
              }}
            >
              ההזמנות המושלמות שלי
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, direction: "rtl", fontWeight: "normal" }}>
              כל ההזמנות שיצרת מוצגות כאן
            </Typography>
          </Paper>

          <Grid container spacing={4} justifyContent="center">
            {listCompletedInvitation.length > 0 ? (
              listCompletedInvitation.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                  <ShowCompletedInvitation fileName={item.name} time={item.createdAt}/>
                </Grid>
              ))
            ) : (
              <Paper
                elevation={2}
                sx={{
                  p: 6,
                  mt: 4,
                  width: "90vw",
                  borderRadius: 3,
                  textAlign: "center",
                  bgcolor: "#f8f9fa",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "medium",
                    color: "#666",
                    direction: "rtl",
                  }}
                >
                  לא נמצאו הזמנות שהושלמו
                </Typography>
                <Typography sx={{ mt: 2, color: "#888", direction: "rtl" }}>צור הזמנה חדשה כדי שתופיע כאן</Typography>
              </Paper>
            )}
          </Grid>
        </>
      )}
    </Container>
  )
}

