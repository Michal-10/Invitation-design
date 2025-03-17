import { useEffect, useState } from 'react';
import axios from 'axios';
import { Template } from '../models/Template';
import { UserToken } from '../models/UserId';



export default ({ category }: { category: number }) => {

    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {

        const fetchTemplates = async () => {
            try {
                // const res = await axios.get(`http://localhost:5077/api/templates/category/${category}`,
                const res = await axios.get(`http://localhost:5077/api/TextUpload/user/13`,
                    {
                        headers: { Authorization: `Bearer ${UserToken}` }
                    }
                );
                console.log("res.data");
                console.log(res.data);

                setTemplates(res.data); // שמירת התבניות בסטייט
                console.log("templates")
                console.log(templates);

            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };
        if (category) {
            fetchTemplates();
        }
    }, [category]); // תלות בקטגוריה כדי להפעיל את הקריאה מחדש

    useEffect(() => { }
        , [templates])

    return (
        // <div>
            <>
                {templates.length > 0 ?
                    templates.map((template, index) => (
                        <img key={index} src={template.fileUrl} alt='תמונה'/*alt={template.Name} */ style={{ width: '800px', borderRadius: '2px', border: '2px solid black' }} />
                    ))
                    :
                    <p>אין תבניות להצגה</p>
                }
            </>
        // {/* </div> */}
    );
};


