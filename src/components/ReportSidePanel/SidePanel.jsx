import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import TableMenu from './TabelMenu'
export function SidePanel({tables, setselectedTableId}) {
    return (
        <Container maxWidth="sm">
            <Box sx={{minHeight: '85vh', paddingTop:'20px'}}>

                <List
                    sx={{ width: '100%',bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader">
                    
                    {
                        tables
                        .sort((a, b) => {
                            const colorComparison = a.color.localeCompare(b.color);
                            if (colorComparison != 0) {
                                return colorComparison;
                            }
                            return a.name.localeCompare(b.name);
                        })
                        .map(({name, fields, color, id}) => (
                            <TableMenu key={id} id={id} name={name} fields={fields} color={color} setselectedTableId={setselectedTableId} ></TableMenu>
                        ))
                    }
                </List>
            </Box>
        </Container>
    )
}