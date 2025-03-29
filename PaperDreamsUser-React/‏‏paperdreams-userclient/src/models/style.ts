const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: `2px solid ${primaryColor}`,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    color: primaryColor
};

export const styleTop = {
    position: 'absolute',
    top: '4%',
    right: '3%',
    color: primaryColor,
}
