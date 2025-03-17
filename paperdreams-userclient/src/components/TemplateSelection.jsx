
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

export  default () => {

  const [templates, setTemplates] = useState([]);
  const [userInvitations, setUserInvitations] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const userId = jwtDecode<jwtType>(sessionStorage.getItem('userToken')).ID; // צריך להחליף בזיהוי המשתמש בפועל

  // שליפת כל התבניות מהשרת
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:5077/api/templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  // שליפת כל ההזמנות שהמשתמש עיצב
  useEffect(() => {
    const fetchUserInvitations = async () => {
      try {
        const response = await axios.get(`http://localhost:5077/api/CompletedInvitation/user/${userId}`);
        setUserInvitations(response.data);
      } catch (error) {
        console.error("Error fetching user invitations:", error);
      }
    };

    fetchUserInvitations();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">בחר תבנית</h2>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border p-2 cursor-pointer"
            onClick={() => setSelectedTemplate(template)}
          >
            <img src={template.imageUrl} alt={template.name} className="w-full h-40 object-cover" />
            <p className="text-center font-bold">{template.name}</p>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">תבנית נבחרה: {selectedTemplate.name}</h3>
          <img src={selectedTemplate.imageUrl} alt={selectedTemplate.name} className="w-full h-96 object-cover" />
        </div>
      )}

      <h2 className="text-lg font-bold mt-8">ההזמנות שלך</h2>
      <div className="grid grid-cols-3 gap-4">
        {userInvitations.map((invitation) => (
          <div key={invitation.id} className="border p-2">
            <img src={invitation.imageUrl} alt="Invitation" className="w-full h-40 object-cover" />
            <p className="text-center font-bold">{invitation.name}</p>
            <Button
              variant="contained"
              color="primary"
              href={invitation.downloadUrl}
              className="mt-2 w-full"
            >
              הורד הזמנה
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
