import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, Button, Checkbox, Chip, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { addLeadNode } from '../../redux/action/nodes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    maxHeight: '90vh',
};

type Props = {
    isLeadsModalOpen: boolean;
    setLeadsModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (selectedItems: LeadItem[]) => void; 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type LeadItem = {
    id: string;
    referrer: string;
    lead: string;
};



const LeadsFromListModal: React.FC<Props> = ({ isLeadsModalOpen, setLeadsModal,setOpen,onSubmit }) => {
    type NewLeadInput = {
        referrer: string;
        lead: string;
    };

    const [newLists, setNewLists] = React.useState<NewLeadInput[]>([]);
    const [listData, setListData] = React.useState<LeadItem[]>([
        {
            id: '1',
            referrer: 'John Doe',
            lead: 'ABC CORP LIMITED',
        },
    ]);
    const [selectedItems, setSelectedItems] = React.useState<LeadItem[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const handleClose = () => {
        setLeadsModal(false)
        setOpen(false)
    }

    const handleCreateNewList = () => {
        setNewLists((prev) => [...prev, { referrer: '', lead: '' }]);
    };

    const handleInputChange = (index: number, field: keyof NewLeadInput, value: string) => {
        const updated = [...newLists];
        updated[index][field] = value;
        setNewLists(updated);
    };

    const updateList = (index: number) => {
        const newEntry = newLists[index];
        if (newEntry.referrer.trim() && newEntry.lead.trim()) {
            const newItem = { id: Date.now().toString(), ...newEntry };
            setListData((prev) => [...prev, newItem]);
            setNewLists((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const handleToggle = (item: LeadItem) => {
        setSelectedItems(prev =>
            prev.some(selected => selected.id === item.id)
                ? prev.filter(selected => selected.id !== item.id)
                : [...prev, item]
        );
    };

    const isItemSelected = (id: string) => {
        return selectedItems.some(item => item.id === id);
    };

    const handleSubmit = () => {
        console.log("Selected items with full info:", selectedItems);
        if(selectedItems.length>0){
            dispatch(addLeadNode(selectedItems))
           }
           onSubmit(selectedItems)
        handleClose();
    };

    

    return (
        <div>
            <Modal
                open={isLeadsModalOpen}
                onClose={handleClose}
                style={{ zIndex: 1300 }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5',
                            py: 2,
                            px: 3,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            Leads from List(s)
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ color: 'text.secondary' }}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Connect multiple lists as source for this sequence
                        </Typography>

                        {/* New List Button */}
                        <Button
                            variant="text"
                            onClick={handleCreateNewList}
                            startIcon={<Add />}
                            sx={{ color: 'primary.main', mb: 2 }}
                        >
                            New List
                        </Button>

                        {newLists.map((listInput, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                                <TextField
                                    label="Referrer Name"
                                    placeholder="Enter name of person who gave lead"
                                    variant="outlined"
                                    name="referrer"
                                    value={listInput.referrer}
                                    onChange={(e) => handleInputChange(index, 'referrer', e.target.value)}
                                    size="small"
                                    fullWidth
                                />
                                <TextField
                                    label="Lead Name"
                                    placeholder="Enter name of person who is the lead"
                                    variant="outlined"
                                    name="lead"
                                    value={listInput.lead}
                                    onChange={(e) => handleInputChange(index, 'lead', e.target.value)}
                                    size="small"
                                    fullWidth
                                />
                                <Button variant="contained" onClick={() => updateList(index)}>
                                    Add
                                </Button>
                            </Box>
                        ))}
                    </Box>

                    <Divider />

                    {/* List Section */}
                    <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                        {listData.map((list) => (
                            <ListItem key={list.id} disablePadding secondaryAction={<Chip label={list.lead} size="small" />}>
                                <ListItemButton sx={{ px: 3 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <Checkbox
                                            checked={isItemSelected(list.id)}
                                            onChange={() => handleToggle(list)}
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={list.referrer}
                                        primaryTypographyProps={{ fontWeight: 500 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Footer */}
                    <Box sx={{ p: 3, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={handleClose} sx={{ borderRadius: 2, px: 3 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2, px: 3 }}>
                            Connect Lists
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default LeadsFromListModal;