import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { MemberListContext } from "../contexts/MemberListContext";
import { useContext, useMemo } from "react";
import { useMemberList } from "../hooks/useMemberListHooks";

const MemberDeleteModal: React.FC = () => {
    const { idDelete } = useContext(MemberListContext)
    const { changeDeleteId } = useMemberList()

    const open = useMemo(() => idDelete !== 0, [idDelete])

    const handletest = () => {
        console.log("Delete", idDelete)
    }

    return (
        <>
            {
                open && (
                    <Modal open={open} onClose={() => changeDeleteId(0)}>
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
                                <Button variant="solid" color="danger" onClick={() => { handletest()}}>
                                    Eliminar Miembro
                                </Button>
                                <Button variant="plain" color="neutral" onClick={() => changeDeleteId(0)}>
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