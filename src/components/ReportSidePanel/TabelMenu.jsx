import { useState} from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
export default function TableMenu({name, fields, id, color, setselectedTableId}) {
    const [open, setOpen] = useState(false);
    const handleOpenClick = () => {
        setselectedTableId(id);
        setOpen(!open);
    };

    return (
        <Box>
            <ListItemButton key={id} onClick={handleOpenClick} sx={{height:'40px', padding:'2px'}} >
                <ListItemIcon>
                    <TableViewTwoToneIcon sx={{color:`${color}`}}/>    
                </ListItemIcon>
                <ListItemText primary={name} className="text-sm font-semibold" disableTypography={true}  />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {
                fields && 
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {
                        fields.map(({name, id}) => (
                            <ListItemButton key={id} sx={{ pl: 4 , height:'25px'}}>
                            <ListItemIcon><ViewWeekOutlinedIcon /></ListItemIcon>
                            <ListItemText primary={name} className="text-xs" disableTypography={true}/>
                            </ListItemButton>
                        ))
                    }
                    </List>
                </Collapse>
            }
            
        </Box>
    )
}