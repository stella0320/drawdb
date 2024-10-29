import Box from '@mui/material/Box';
import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';




export function TableDetail({table}) {
    if (table.length == 0) return;
    const seletedTable = table[0];
    const fields = seletedTable.fields;
    const comment = seletedTable.comment;
    const tableName = seletedTable.name;
    const color = seletedTable.color;
    const columns = [
        { id: 'name', label: '欄位名稱', minWidth: 170, align:'left' },
        { id: 'type', label: '資料型別', minWidth: 20 },
        { id: 'unique', label: '唯一值', minWidth: 15, format: (value) => (value ? '是' : '否')},
        { id: 'primary', label: '主鍵', minWidth: 15, format: (value) => (value ? '是' : '否')},
        { id: 'notNull', label: '允許NULL', minWidth: 10, format: (value) => (value ? '否' : '是')},
        { id: 'default', label: '預設值', minWidth: 20, format: (value) => (value ? '是' : '否')},
        // { id: 'id', label: '主鍵/外鍵', minWidth: 20 },
        { id: 'comment', label: '備註', minWidth: 50 }
    ]
    return (
        
        
        <TableContainer  sx={{ maxHeight: '85vh', width:'calc(100% - 40px)', margin:'50px 20px 20px 20px'}}>
            <Box sx={{borderBottom:`2px solid ${color}`}}>
                <Typography variant="h6" className='text-sm font-semibold'><TableViewTwoToneIcon /> {tableName}</Typography>
                <Typography variant="caption">表格說明 : {comment}</Typography>
            </Box>
            <Table stickyHeader aria-label="sticky table" sx={{marginTop:'10px', boxShadow: 3, border: '1px solid #ebebeb'}}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{minWidth:column.minWidth, fontSize:'14px'}}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {   fields &&
                    fields.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                {
                                    columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} size='small' style={{fontSize:'12px'}} >
                                                {column.format? column.format(value) : value}
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        )
                        })
                    }
                </TableBody>
                
            </Table>
        </TableContainer>
        
    );
} 