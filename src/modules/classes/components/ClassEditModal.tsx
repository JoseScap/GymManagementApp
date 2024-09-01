import { Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useLayoutEffect, useMemo, useState } from "react";
import { useClassListHooks } from "../hooks/useClassListHooks";
import { GymClass } from "../../common/types/gymClass";
import { toast } from "react-toastify";

const ClassEditModal: React.FC = () => {
  const {
    idToUpdate,
    classes,
    changeIdToUpdate,
    updateClassById
  } = useClassListHooks()

  const open = useMemo<boolean>(() => !!idToUpdate, [idToUpdate])
  const gymClass = useMemo<GymClass | null>(() => {
    if (idToUpdate === null) return null;

    return classes.find(gymClass => gymClass.id === idToUpdate) ?? null
  }, [idToUpdate, classes])

  const [className, setClassName] = useState<string>("")
  const [professor, setProfessor] = useState<string>("")
  const [total, setTotal] = useState<number>(0)
  const [countAssistant, setCountAssistant] = useState<number>(0)

  
  useLayoutEffect(() => {
    if (gymClass !== null) {
      setClassName(gymClass.className)
      setProfessor(gymClass.professor)
      setTotal(gymClass.total)
      setCountAssistant(gymClass.countAssistant)
    }
  }, [gymClass])

  const handleUpdate = () => {
    idToUpdate !== null && gymClass !== null && updateClassById(className, professor, total, countAssistant).finally(() => {
      changeIdToUpdate("")
      toast.success('Se ha actualizado la información de la clase.')
    })
  }


  return (
    <>
      <Modal open={open} onClose={() => {
        changeIdToUpdate("")
      }}>
        <ModalDialog variant="outlined" role="alertdialog" size="lg">
          <DialogTitle>
            <WarningRoundedIcon />
            Menú de Edición
          </DialogTitle>
          <Divider />
          <DialogContent>
            <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Nombre de la clase</FormLabel>
                <Input 
                  value={className}
                  onChange={(event) => setClassName(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nombre del Profesor</FormLabel>
                <Input 
                  value={professor}
                  onChange={(event) => setProfessor(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Total</FormLabel>
                <Input 
                  value={total}
                  onChange={(event) => setTotal(Number(event.target.value))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Asistenes de la clase</FormLabel>
                <Input 
                  value={countAssistant}
                  onChange={(event) => setCountAssistant(Number(event.target.value))}
                />
              </FormControl>
            </Stack>
          </form>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleUpdate}>
              Confirmar Edición
            </Button>
            <Button variant="plain" color="neutral" onClick={() => {
              changeIdToUpdate("")
            }}>
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default ClassEditModal