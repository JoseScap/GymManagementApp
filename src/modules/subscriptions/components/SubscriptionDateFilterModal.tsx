import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Modal, ModalDialog } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useListSubscription } from "../hooks/useListSubscriptionHooks";

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const SubscriptionDateFilterModal = ({ open, setOpen }: Props) => {

    const { filterByDate } = useListSubscription();

    const [dateTo, setDateTo] = useState<Dayjs | null>(null);
    const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);

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
                                label="Fecha Desde"
                                value={dateFrom}
                                onChange={(date) => setDateFrom(date)}
                            />
                        </FormControl>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <DatePicker
                                label="Fecha Hasta"
                                value={dateTo}
                                onChange={(date) => setDateTo(date)}
                            />
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={() => {
                        filterByDate(dayjs(dateFrom).toString(), dayjs(dateTo).toString());
                        setOpen(!open);
                        setDateTo(null);
                        setDateFrom(null);
                    }}>
                        Filtrar
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(!open)}>
                        Cancelar
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );

}

export default SubscriptionDateFilterModal;