import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useSubscriptionHooks } from "../hooks/useSubscriptionHooks";
import { useNavigate } from "../../../../src/routers/useRouterHooks";

const SubscriptionDeleteModal: React.FC = () => {
  const navigate = useNavigate();
  const { subscription, open, alternateModal, deleteSubscriptionById } = useSubscriptionHooks();

  const handleDelete = () => {
    deleteSubscriptionById().finally(() => {
      navigate("Subscription:List");
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
                Estás por eliminar la subscripción de {subscription.fullName}, ¿Estás seguro?
              </DialogContent>
              <DialogActions>
                <Button variant="solid" color="danger" onClick={handleDelete}>
                  Eliminar Subscripción
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