import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInvitations } from "./redux/CompletedInvitationsSlice";
import { fetchTemplates } from "./redux/TemplateSlice";
import { RootState, AppDispatch } from "./redux/store";
import { jwtDecode } from "jwt-decode";
import { jwtType } from "../models/JwtType"; // לוודא שהקובץ קיים

export default function TemplatesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const templates = useSelector((state: RootState) => state.templates.templates);
  const invitations = useSelector((state: RootState) => state.completedInvitations.invitations);
  const [userId, setUserId] = useState<number>(-1);

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      try {
        let decoded = jwtDecode<jwtType>(token).userId;
        setUserId(+decoded.toString());
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("User authentication error");
      }
    } else {
      alert("User is not logged in");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchTemplates());
    if (userId !== null) {
      dispatch(fetchUserInvitations(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      <h2>בחר תבנית</h2>
      {templates.map((template) => (
        <div key={template.id}>{template.name}</div>
      ))}
      <h2>ההזמנות שלך</h2>
      {invitations.map((invitation) => (
        <div key={invitation.id}>{invitation.name}</div>
      ))}
    </div>
  );
}
