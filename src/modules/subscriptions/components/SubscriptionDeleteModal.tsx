import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useSubscriptionHooks } from "../hooks/useSubscriptionHooks";

const SubscriptionDeleteModal: React.FC = () => {
  const { subscription, open, alternateModal, deleteSubscriptionById, getMemberBySubscriptionId } = useSubscriptionHooks();

  const handleDelete = () => {
    deleteSubscriptionById().finally(() => {
      alternateModal();
      getMemberBySubscriptionId(subscription.id);
    })
  }

  return (
    <>
      {
        open && (
          <Modal open={open} onClose={alternateModal}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <WarningRoundedIcon />
                Atención
              </DialogTitle>
              <Divider />
              <DialogContent>
                Estás por anular la subscripción de {subscription.fullName}, ¿Estás seguro?
              </DialogContent>
              <DialogActions>
                <Button variant="solid" color="danger" onClick={handleDelete}>
                  Anula Subscripción
                </Button>
                <Button variant="plain" color="neutral" onClick={alternateModal}>
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

export default SubscriptionDeleteModal