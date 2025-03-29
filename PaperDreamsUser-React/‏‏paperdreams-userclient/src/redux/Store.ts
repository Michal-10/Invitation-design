import { combineSlices, configureStore } from "@reduxjs/toolkit";
import CompletedInvitationsSlice from "./CompletedInvitationsSlice";
import invitationSlice from "./InvitationSlice";
import userSlice from "./UserSlice";

const Store = configureStore({
  reducer: combineSlices(CompletedInvitationsSlice,invitationSlice,userSlice)
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
export default Store;