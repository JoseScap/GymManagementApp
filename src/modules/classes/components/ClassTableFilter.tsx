import { Button, FormControl, Grid, IconButton, Input } from "@mui/joy";
import { useState } from "react";
import { useClassListHooks } from "../hooks/useClassListHooks";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import ClassDateFilterModal from "./ClassDateFilterModal";

const ClassTableFilter: React.FC = () => {
    const { filterByClassname, filterByProfessor } = useClassListHooks();

    const [className, setClassName] = useState<string>("");
    const [professor, setProfessor] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <Grid container justifyContent="flex-end" gap="10px">
            <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
                <Input
                    size="md"
                    placeholder="Filtrar por nombre"
                    style={{ fontWeight: 'bold' }}
                    onChange={(e) => { 
                        setClassName(e.target.value)
                        filterByClassname(e.target.value)
                     }}
                    value={className}
                />
            </FormControl>
            <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
                <Input
                    size="md"
                    placeholder="Filtrar por profesor"
                    style={{ fontWeight: 'bold' }}
                    onChange={(e) => { 
                        setProfessor(e.target.value) 
                        filterByProfessor(e.target.value)
                    }}
                    value={professor}
                />
            </FormControl>
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
                    setClassName("");
                    setProfessor("");
                    filterByClassname("");
                }}
            >
                <CleaningServicesOutlinedIcon/>
            </IconButton>
            <ClassDateFilterModal open={open} setOpen={setOpen}/>
        </Grid>
    );
}

export default ClassTableFilter;
