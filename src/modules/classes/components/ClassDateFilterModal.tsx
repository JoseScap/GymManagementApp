import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Modal, ModalDialog } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useClassListHooks } from "../hooks/useClassListHooks";

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ClassDateFilterModal = ({ open, setOpen }: Props) => {

    const { filterByDate } = useClassListHooks();

    const [date, setDate] = useState<Dayjs | null>(null);

    return (
        <Modal open={open} onClose={() => setOpen(!open)}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    Filtrar por fecha
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Box marginTop="10px" display="flex" gap="10px">
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <DatePicker
                                label="Fecha"
                                value={date}
                                onChange={(date) => setDate(date)}
                            />
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={() => {
                        filterByDate(dayjs(date).toString());
                        setOpen(!open);
                        setDate(null);
                    }}>
                        Filtrar
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(!open)}>
                        Cancelar
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    )
}

export default ClassDateFilterModal;