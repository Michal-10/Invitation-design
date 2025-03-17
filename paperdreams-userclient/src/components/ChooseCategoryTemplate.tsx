import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { useState } from 'react';
import { styleModal } from '../models/style';
import ShowTemplates from './ShowTemplates';


export default () => {
    const [selectedCategory, setSelectedCategory] = useState<number>(-1); // ברירת מחדל = יומולדת
    const [openModal, setOpenModal] = useState<boolean>(true);

    // שליחת הקטגוריה שנבחרה לקומפוננטה הראשית
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(selectedCategory);

        if (selectedCategory == -1) {
            alert("choose a category");
        }
        else {
            setOpenModal(false); // סוגר את המודל אחרי הבחירה
        }
    };

    return (
        <>
            <Modal open={openModal} >
                <Box sx={styleModal} style={{ direction: 'rtl' }}>
                    <form onSubmit={handleSubmit} >
                        <FormControl fullWidth margin="normal" sx={{ direction: 'rtl', textAlign: 'right' }}>
                            <InputLabel >בחר קטגוריה</InputLabel>
                            <Select style={{ textAlign: 'right' }} value={selectedCategory} onChange={(e) => (setSelectedCategory(+e.target.value))}>
                                <MenuItem disabled>בחר קטגוריה</MenuItem>
                                <MenuItem value={1}>יומולדת</MenuItem>
                                <MenuItem value={2}>חתונה</MenuItem>
                                <MenuItem value={3}>בר מצווה</MenuItem>
                                <MenuItem value={4}>בת מצווה</MenuItem>
                                <MenuItem value={5}>ברית</MenuItem>
                            </Select>
                        </FormControl>

                        <Button sx={{ backgroundColor: 'rosybrown' }} variant="contained" fullWidth type="submit">להמשך</Button>
                    </form>
                </Box>
            </Modal>

            {!openModal && <ShowTemplates category={selectedCategory} />}
        </>
    );
};

