import { Box, Button, Card, CardActions, CardOverflow, FormControl, FormLabel, Grid, Input } from "@mui/joy"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { useState } from "react"
import { useClassListHooks } from "../hooks/useClassListHooks"
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { toast } from "react-toastify"

const ClassCreate: React.FC = () => {

    const { createClass, setCreate } = useClassListHooks()


    const [data, setData] = useState({
        className: '',
        professor: '',
        total: 0,
        countAssistant: 0,
        date: new Date()
    })

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        createClass(data).finally(() => {
            setCreate(false)
            toast.success('Se cargo una nueva clase')
        })
    }

    return <>
        <Card>
            <form onSubmit={handleEdit}>
                <Grid container spacing={2} sx={{ paddingBottom: '15px' }}>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                        <Box display="flex" gap="5px">
                            <AbcOutlinedIcon />
                            <FormLabel>Nombre de la clase</FormLabel>
                        </Box>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <Input
                                size="md"
                                style={{ fontWeight: 'bold' }}
                                placeholder="Ingrese el nombre de la clase, Ej: Zumba"
                                onChange={(e) => setData({ ...data, className: e.target.value })}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                        <Box display="flex" gap="5px">
                            <AccountBoxOutlinedIcon />
                            <FormLabel>Profesor</FormLabel>
                        </Box>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <Input
                                size="md"
                                style={{ fontWeight: 'bold' }}
                                placeholder="Ingrese el Profesor. Ej: Cristian Orellana"
                                onChange={(e) => setData({ ...data, professor: e.target.value })}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                        <Box display="flex" gap="5px">
                            <AttachMoneyOutlinedIcon />
                            <FormLabel>Total recaudado por clase</FormLabel>
                        </Box>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <Input
                                size="md"
                                style={{ fontWeight: 'bold' }}
                                placeholder="Ingrese un número total recaudado por la clase"
                                onChange={(e) => setData({ ...data, total: Number(e.target.value) })}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                        <Box display="flex" gap="5px">
                            <PeopleOutlineOutlinedIcon />
                            <FormLabel>Cantidad de personas que asistieron</FormLabel>
                        </Box>
                        <FormControl
                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                        >
                            <Input
                                size="md"
                                style={{ fontWeight: 'bold' }}
                                placeholder="Ingrese un total de personas que asistieron. Ej: 25"
                                onChange={(e) => setData({ ...data, countAssistant: Number(e.target.value) })}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={4} display="flex" gap="8px" flexDirection="column">
                        <Box display="flex" gap="5px">
                            <DateRangeOutlinedIcon />
                            <FormLabel>Fecha de la clase</FormLabel>
                        </Box>
                        <DatePicker
                            value={dayjs(data.date)}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => setData({ ...data, date: newValue?.toDate() || new Date() })}
                        />
                    </Grid>
                </Grid>
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="solid" color="success" type="submit">
                            Guardar
                        </Button>
                    </CardActions>
                </CardOverflow>
            </form>
        </Card>
    </>
}

export default ClassCreate

