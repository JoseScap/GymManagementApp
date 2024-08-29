import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useMemo } from "react";
import { useClassListHooks } from "../hooks/useClassListHooks";
import { GymClass } from "../../common/types/gymClass";

const ClassDeleteModal: React.FC = () => {
  const {
    idToDelete,
    classes,
    changeIdToDelete,
    deleteClassById
  } = useClassListHooks()

  const open = useMemo<boolean>(() => !!idToDelete, [idToDelete])
  const gymClass = useMemo<GymClass | null>(() => {
    if (idToDelete === null) return null;

    return classes.find(gymClass => gymClass.id === idToDelete) ?? null
  }, [idToDelete, classes])

  const handleDelete = () => {
    idToDelete !== null && gymClass !== null && deleteClassById(idToDelete, gymClass.isCanceled).finally(() => {
      changeIdToDelete("")
    })
  }

  return (
    <>
      {
        open && (
          <Modal open={open} onClose={() => changeIdToDelete("")}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <WarningRoundedIcon />
                Atención
              </DialogTitle>
              <Divider />
              <DialogContent>
                ¿Estás seguro que quieres cancelar la clase de {gymClass?.className}?
              </DialogContent>
              <DialogActions>
                <Button variant="solid" color="danger" onClick={handleDelete}>
                  Cancelar clase
                </Button>
                <Button variant="plain" color="neutral" onClick={() => changeIdToDelete("")}>
                  Cancelar
                </Button>
              </DialogActions>
            </ModalDialog>
          </Modal>
        )
      }
    </>
  )
}

export default ClassDeleteModal