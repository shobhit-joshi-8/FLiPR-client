import { useState } from 'react'

const useDialogState = () => {
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        data: null,
    });

    const handleOpen = (data = null) => setDialogState((pre) => ({ ...pre, isOpen: true, data }));

    const handleClose = () => setDialogState({
        isOpen: false,
        data: null,
    });

    return { dialogState, handleOpen, handleClose };
}

export default useDialogState;