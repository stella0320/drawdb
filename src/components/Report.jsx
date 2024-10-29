import { useState, useCallback, useEffect} from "react";
import {
    useDiagram,
    useTypes
  } from "../hooks";
import { DB } from "../data/constants";
import { db } from "../data/db";
import { databases } from "../data/databases";
import {SidePanel} from "./ReportSidePanel/SidePanel"
import {TableDetail} from "./ReportSidePanel/TableDetail"
import drawdb_icon from "../assets/icon_dark_64.png";
import postgres_icon from "../assets/postgres-icon.png";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
export default function Report() {
    const [id, setId] = useState(0);
    const [selectedDb, setSelectedDb] = useState("");
    const [title, setTitle] = useState("Untitled Diagram");
    const {types, setTypes} = useTypes();
    const [showSelectDbModal, setShowSelectDbModal] = useState(false);
    const [selectedTableId, setselectedTableId] = useState(0);
    const {
        tables,
        setTables,
        database,
        setDatabase,
    } = useDiagram();
    const seletedTable = tables.filter(item => item.id === selectedTableId);
    const load = useCallback(async () => {
        const loadLatestDiagram = async () => {
          await db.diagrams
            .orderBy("lastModified")
            .last()
            .then((d) => {
              if (d) {
                if (d.database) {
                  setDatabase(d.database);
                } else {
                  setDatabase(DB.GENERIC);
                }
                setId(d.id);
                
                setTitle(d.name);
                setTables(d.tables);
                
                if (databases[database].hasTypes) {
                  setTypes(d.types ?? []);
                }
                window.name = `d ${d.id}`;
              } else {
                window.name = "";
                if (selectedDb === "") setShowSelectDbModal(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        };
    
        const loadDiagram = async (id) => {
            await db.diagrams
            .get(id)
            .then((diagram) => {
              if (diagram) {
                if (diagram.database) {
                  setDatabase(diagram.database);
                } else {
                  setDatabase(DB.GENERIC);
                }
                setId(diagram.id);
                setTitle(diagram.name);
                setTables(diagram.tables);
                if (databases[database].hasTypes) {
                  setTypes(diagram.types ?? []);
                }
                window.name = `d ${diagram.id}`;
              } else {
                window.name = "";
              }
            })
            .catch((error) => {
              console.log(error);
            });
        };
        if (window.name === "") {
          loadLatestDiagram();
        } else {
          const name = window.name.split(" ");
          const op = name[0];
          const id = parseInt(name[1]);
          switch (op) {
            case "d": {
              loadDiagram(id);
              break;
            }
            default:
              break;
          }
        }
      }, [
        setTables,
        setDatabase,
        database,
        selectedDb,
        setTypes
    ]);
    
    useEffect(() => {
        document.title = "Table Summary | drawDB";
    
        load();
    }, [load]);
    
    return (
      <Box sx={{ flexGrow: 1,height:'80vh' }}>
        <AppBar position="static" sx={{backgroundColor:"#fcfcfc",color:'black'}}>
          <Grid container sx={{height: '15vh'}} alignItems="center">
            <Grid size={1}>
              <Link to="/editor" target="_blank" rel="noopener noreferrer">
                <img
                  width={54}
                  src={drawdb_icon}
                  alt="logo"
                  className="ms-7 min-w-[54px]"
                />
              </Link>
            </Grid>
            <Grid size={5}>
              <div><span style={{fontSize:"20px"}}>Table Summary</span></div>
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <img width={25} src={postgres_icon} alt="logo" className="min-w-[25px]"/>
                <span style={{marginLeft:"5px"}}>{title}</span>
              </div>
            </Grid>
          </Grid>
        </AppBar>
        <Grid container spacing={2}>
          <Grid size={4} sx={{ height: '85vh', overflowY: 'auto' }}>
            <SidePanel tables={tables} setselectedTableId={setselectedTableId}></SidePanel>
          </Grid>
          <Grid size={8} sx={{ height: '85vh', overflowY: 'auto' }}>
            <TableDetail table={seletedTable}></TableDetail>
          </Grid>
        </Grid>
      </Box>
    );
}