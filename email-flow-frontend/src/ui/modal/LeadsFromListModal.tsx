import   { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Divider,
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { Close, Search, Add } from '@mui/icons-material';
import type { ListItems } from '../../types';
import { useDispatch } from 'react-redux';
import { addNode } from '../../redux/action/nodes';



const LeadsFromListModal = ({ open, onClose,onSubmit }: { open: boolean; onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [selectedListsDetails, setSelectedListsDetails] = useState<ListItems[]>([]);
  const [newListName, setNewListName] = useState('');
  const [showNewListField, setShowNewListField] = useState(false);
  const dispatch = useDispatch()
  // Mock data - replace with your actual lists data
  const lists: ListItems[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', company: 'ABC Corp', status: 'Premium Customer' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', company: 'XYZ Ltd', status: 'Trial User' },
    { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', company: 'Tech Innovations', status: 'Enterprise Lead' },
    { id: '4', name: 'Bob Williams', email: 'bob.williams@example.com', company: 'Marketing Solutions', status: 'Cold Prospect' },
    { id: '5', name: 'Charlie Brown', email: 'charlie.brown@example.com', company: 'E-commerce Experts', status: 'Premium Customer' },
    { id: '6', name: 'Emily Davis', email: 'emily.davis@example.com', company: 'SaaS Hub', status: 'Trial User' },
    { id: '7', name: 'Michael Scott', email: 'michael.scott@example.com', company: 'Paper Co.', status: 'Enterprise Lead' },
    { id: '8', name: 'Sarah Lee', email: 'sarah.lee@example.com', company: 'AI Startups Inc.', status: 'Cold Prospect' },
    { id: '9', name: 'David Kim', email: 'david.kim@example.com', company: 'Finance Edge', status: 'Premium Customer' },
    { id: '10', name: 'Olivia Martinez', email: 'olivia.martinez@example.com', company: 'EdTech Solutions', status: 'Trial User' },
  ];


  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleList = (listId: string) => {
    setSelectedLists(prev => {
        const newSelectedIds = prev.includes(listId)
          ? prev.filter(id => id !== listId)
          : [...prev, listId];
                const newSelectedDetails = lists.filter(list => 
          newSelectedIds.includes(list.id)
        );
        setSelectedListsDetails(newSelectedDetails);
        console.log("SelectedListDetials:",selectedListsDetails)
        return newSelectedIds;
      });
  
    const listDetails = lists.find(list => list.id === listId);
    console.log('List details:', listDetails);
    return listDetails;
  };
  console.log(selectedLists)

  const handleCreateNewList = () => {
    // Implement your new list creation logic here
    setShowNewListField(true);
  };
  const handleAddNewList = () => {
    if (newListName.trim()) {
      const newList = {
        id: `new-${Date.now()}`,
        name: newListName,
        email: '',
        company: '',
        status: 'New List'
      };
      
      // In a real app, you would probably make an API call here to save the new list
      lists.push(newList);
      
      // Select the newly created list
      handleToggleList(newList.id);
      
      // Reset the new list form
      setNewListName('');
      setShowNewListField(false);
    }
  };

  console.log(selectedListsDetails)

  const handleSubmit = () => {
    if (selectedListsDetails.length > 0) {
      console.log(selectedListsDetails)
      // onSubmit(selectedListsDetails);
      dispatch(addNode(selectedListsDetails,'leadNode'))
    }
    onClose();
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        py: 2,
        px: 3
      }}>
        <Typography variant="h6" fontWeight="bold">
          Leads from List(s)
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Connect multiple lists as source for this sequence
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search for lists"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, backgroundColor: '#fafafa' }
            }}
            sx={{ mb: 2 }}
          />

{showNewListField ? (
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter new list name"
                variant="outlined"
                size="small"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddNewList}
                disabled={!newListName.trim()}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowNewListField(false)}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              variant="text"
              startIcon={<Add />}
              onClick={handleCreateNewList}
              sx={{ color: 'primary.main', mb: 2 }}
            >
              New List
            </Button>
          )}
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={handleCreateNewList}
            sx={{ color: 'primary.main', mb: 2 }}
          >
            New List
          </Button>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Select your List(s)
          </Typography>
        </Box>

        <Divider />

        <List sx={{ maxHeight: 300, overflow: 'auto' }}>
          {filteredLists.map((list) => (
            <ListItem
              key={list.id}
              disablePadding
              secondaryAction={
                <Chip label={`${list?.company} leads`} size="small" />
              }
            >
              <ListItemButton
                onClick={() => handleToggleList(list.id)}
                sx={{ px: 3 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Checkbox
                    edge="start"
                    name={list.name}
                    value={list.name}
                    onChange={(e)=>e.target.value}
                    checked={selectedLists.includes(list.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={list.name}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid #eee' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ borderRadius: 2, px: 3 }}
          disabled={selectedLists.length === 0}
        >
          Connect Lists ({selectedLists.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadsFromListModal;