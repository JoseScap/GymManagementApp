import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useMemo } from "react";
import { useListSubscription } from "../hooks/useListSubscriptionHooks";
import { Subscription } from "../../common/types/subscription";
import { toast } from "react-toastify";

const SubscriptionDeleteModal: React.FC = () => {
  const { idToDelete, changeIdToDelete, subscriptions, deleteSubscriptionById } = useListSubscription()

  const open = useMemo<boolean>(() => {
    return !!idToDelete
  }, [idToDelete])

  const subscription = useMemo<Subscription | null>(() => {
    if (idToDelete === null) return null;

    return subscriptions.find(subscription => subscription.id === idToDelete) ?? null
  }, [idToDelete, subscriptions])

  const handleDelete = () => {
    idToDelete !== null && subscription !== null && deleteSubscriptionById(idToDelete, subscription.isCanceled)
    changeIdToDelete("")
    if (subscription?.isCanceled) toast.success('Se ha reactivado la suscripción')
    else toast.success('Se ha cancelado la suscripción')
  }

  return (
    <>
      <Modal open={open} onClose={() => changeIdToDelete("")}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Atención
          </DialogTitle>
          <Divider />
          <DialogContent>
            {
              subscription?.isCanceled ?
                "¿Estás seguro que quieres reactivar la suscripción?"
                : "¿Estás seguro que quieres cancelar la suscripción?"
            }
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              {
                subscription?.isCanceled
                  ? "Reactivar"
                  : "Cancelar"
              }
            </Button>
            <Button variant="plain" color="neutral" onClick={() => changeIdToDelete("")}>
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default SubscriptionDeleteModal