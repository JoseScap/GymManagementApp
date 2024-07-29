import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useMemberList } from "../hooks/useMemberListHooks";
import { useMemo} from "react";

const MemberDeleteModal: React.FC = () => {
    const {
        idToDelete,
        currentPage: { data: members },
        changeIdToDelete,
        deleteMemberById,
        findAllMembers
    } = useMemberList()

    const open = useMemo<boolean>(() => !!idToDelete, [idToDelete])
    const fullName = useMemo<string>(() => {
        if (idToDelete === null) return "";

        return members.find(member => member.id === idToDelete)?.fullName ?? ""
    }, [idToDelete, members])

    const handleDelete = () => {
        idToDelete !== null && deleteMemberById(idToDelete).finally(() => {
            changeIdToDelete(null)
            findAllMembers()
        })
    }

    return (
        <>
            {
                open && (
                    <Modal open={open} onClose={() => changeIdToDelete(0)}>
                        <ModalDialog variant="outlined" role="alertdialog">
                            <DialogTitle>
                                <WarningRoundedIcon />
                                Atención
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                ¿Estás seguro que quieres eliminar al miembro {fullName}?
                            </DialogContent>
                            <DialogActions>
                                <Button variant="solid" color="danger" onClick={handleDelete}>
                                    Eliminar Miembro
                                </Button>
                                <Button variant="plain" color="neutral" onClick={() => changeIdToDelete(0)}>
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