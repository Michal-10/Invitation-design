import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplates, setSelectedTemplate } from '../redux/invitationActions';

const TemplateSelection = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.invitation.templates);

  useEffect(() => {
    dispatch(fetchTemplates()); // טוענים את התבניות מה-API
  }, [dispatch]);

  const handleTemplateChange = (e) => {
    dispatch(setSelectedTemplate(e.target.value)); // בוחרים תבנית מתוך הרשימה
  };

  return (
    <div>
      <h3>Select Template</h3>
      <select onChange={handleTemplateChange}>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelection;
