import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { MemberListContext } from "../contexts/MemberListContext";
import { useContext, useMemo } from "react";
import { useMemberList } from "../hooks/useMemberListHooks";

const MemberDeleteModal: React.FC = () => {
    const { idDelete } = useContext(MemberListContext)
    const { setDeleteId } = useMemberList()


    const open = useMemo(() => idDelete !== 0, [idDelete])
    const setOpen = (open: boolean) => {
        if (!open) {
            setDeleteId(0)
        }
    }

    return (
        <>
            {
                open && (
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <ModalDialog variant="outlined" role="alertdialog">
                            <DialogTitle>
                                <WarningRoundedIcon />
                                Confirmación
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                ¿Estás seguro que quieres eliminar a este miembro?
                            </DialogContent>
                            <DialogActions>
                                <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                                    Eliminar Miembro
                                </Button>
                                <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
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

export default MemberDeleteModal