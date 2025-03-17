import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "./TemplateSlice";
import completedInvitationsReducer from "./CompletedInvitationsSlice";

export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    completedInvitations: completedInvitationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
