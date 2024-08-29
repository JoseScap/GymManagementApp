import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useMemo } from "react";
import { useClassListHooks } from "../hooks/useClassListHooks";
import { GymClass } from "../../common/types/gymClass";

const ClassDeleteModal: React.FC = () => {
  const {
    idToDelete,
    currentPage: { data: gymClasses },
    changeIdToDelete,
    deleteClassById,
    findAllClass
  } = useClassListHooks()

  const open = useMemo<boolean>(() => !!idToDelete, [idToDelete])
  const gymClass = useMemo<GymClass>(() => {
    if (idToDelete === null) return "";

    return gymClasses.find(gymClass => gymClass.id === idToDelete)
  }, [idToDelete, gymClasses])

  const handleDelete = () => {
    idToDelete !== null && deleteClassById(idToDelete, gymClass.isCanceled).finally(() => {
      changeIdToDelete("")
      findAllClass()
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