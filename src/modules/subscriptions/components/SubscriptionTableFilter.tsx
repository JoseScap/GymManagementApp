import { Button, FormControl, Grid, IconButton, Input } from "@mui/joy";
import { useState } from "react";
import { useListSubscription } from "../hooks/useListSubscriptionHooks";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SubscriptionDateFilterModal from "./SubscriptionDateFilterModal";

const SubscriptionTableFilter: React.FC = () => {
    const [dni, setDni] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const { filterByFullname, filterByDni } = useListSubscription();

    return (
        <Grid container justifyContent="flex-end" gap="10px">
            <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
                <Input
                    size="md"
                    placeholder="Filtrar por Nombre Completo"
                    style={{ fontWeight: 'bold' }}
                    onChange={(e) => { 
                        setDni("");
                        setFullname(e.target.value);
                        filterByFullname(e.target.value);
                     }}
                    value={fullname}
                />
            </FormControl>
            <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
                <Input
                    size="md"
                    placeholder="Filtrar por DNI"
                    style={{ fontWeight: 'bold' }}
                    onChange={(e) => { 
                        setFullname("");
                        setDni(e.target.value);
                        filterByDni(e.target.value);
                     }}
                    value={dni}
                />
            </FormControl>
            <SubscriptionDateFilterModal open={open} setOpen={setOpen}/>
            <Button
                variant="solid"
                color="success"
                onClick={() => setOpen(!open)}
            >
                Filtrar por Fecha
            </Button>
            <IconButton
                variant="solid"
                color="success"
                onClick={() => {
                    setDni("");
                    setFullname("");
                    filterByFullname("");
                }}
            >
                <CleaningServicesOutlinedIcon/>
            </IconButton>
        </Grid>
    );
}

export default SubscriptionTableFilter;