import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';
import { collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc, getDocsFromServer} from "firebase/firestore"; 
import { auth, db } from '../firebase'
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import logo from '../components/logo.png'
import { Image } from "react-bootstrap";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/thomassullivan97/" target="blank">
        Thomas Sullivan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const mdTheme = createTheme();

function TablePaginationTicketActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationTicketActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function DashboardContent() {

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [error, setError] = useState()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const theme = useTheme();

  //Tickets
  const [tickets, setTickets] = useState([]);

  //Select Ticket
  const [selectedTicket, setSelectedTicket] = useState("");

    /*
  TO ADD:
  On click go to dashboard with clicked ticket as selected Project/Ticket and display information
  */

  const handleSelectTicket = (row) => {
    setSelectedTicket(row);
    console.log(selectedTicket)
  };
  
  //Highlight row depending on if its selected
  const isTicketSelected = (row) => row === selectedTicket;

  const ticketResolution = (row) => {
    if(row == "Closed"){
      return <Chip label="Closed" color="error" />
    } else if(row == "Open") {
      return  <Chip label="Open" color="success" />
    } else {
      return 
    }
  }
    
  const ticketPriority = (row) => {
    if(row == "Low"){
      return <Chip label="Low" color = "primary" style={{backgroundColor:'#fdd835'}} />
    } else if(row == "Medium") {
      return  <Chip label="Medium" color="warning" />
    } else if(row == "High") {
      return  <Chip label="High" color="error" />
    }
  }
    
  const ticketType = (row) => {
    if(row == "Bug"){
      return <Chip label="Bug" color="primary" />
    } else if(row == "Feature") {
      return  <Chip label="Feature" color="primary" />
    } else if(row == "Vulnerability") {
      return  <Chip label="Vulnerability" color="primary" />
    } else if(row == "Cleanup") {
      return  <Chip label="Cleanup" color="primary" />
    } else if(row == "Issue") {
      return  <Chip label="Issue" color="primary" />
    } 
  }

  //Logout
  async function handleLogout() {
      setError("")
  
      try {
          await logout()
          navigate("/login")
      } catch (e) {
          console.error(e)
          setError("Failed to log out")
      }
  }

  //Dashboard
  function handleDashboard() {
    navigate("/", {
      state: {
        id: activeUserID
      }
    })
  }

  function handleTickets() {
    navigate("/Tickets", {
      state: {
        id: activeUserID
      }
    })
  }

  //Admin
  const [accessDenied, setAccessDenied] = useState(false)

  function handleAdmin() {
    if(activeUser.admin == true){
      navigate("/Administration", {
        state: {
          id: activeUserID
        }
      })
    } else {
      setAccessDenied(true)
    }
  }

  const handleCloseAccessDenied = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAccessDenied(false)
  };




  const [ticketPage, setTicketPage] = React.useState(0);
  const [ticketRowsPerPage, setTicketRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.z

  const handleChangeTicketPage = (event, newPage) => {
    setTicketPage(newPage);
  };

  const handleChangeTicketRowsPerPage = (event) => {
    setTicketRowsPerPage(parseInt(event.target.value, 10));
    setTicketPage(0);
  };


  const [activeUser, setActiveUser] = useState([])
  const [activeUserID, setActiveUserID] = useState("")

  const developerCollectionRef = collection(db,"Users")

  const getCurrentUser = async () => {
    const loggedUser = auth.currentUser
    const loggedUserData = await getDocs(query(developerCollectionRef, where("email", "==", loggedUser.email)))
    loggedUserData.forEach((doc) => {
      setActiveUserID(doc.id)
      setActiveUser(doc.data())
    });
  }
  
  const getTickets = async () => {
    const ticketData = await getDocs(query(collection(db,"Ticket"), where("Author", "==", activeUserID)))
    setTickets(ticketData.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  useEffect(() => {
    getTickets()
  }, [activeUserID])
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {activeUser.name}'s Tickets
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Image src={logo} width={50} height={50} className="rounded mx-auto d-block" ></Image>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={handleDashboard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={handleTickets}>
              <ListItemIcon>
                <BugReportIcon />
              </ListItemIcon>
              <ListItemText primary="Tickets" />
            </ListItemButton>
            <ListItemButton onClick={handleAdmin}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Administration" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Snackbar open={accessDenied} autoHideDuration={6000} onClose={handleCloseAccessDenied}>
              <Alert onClose={handleCloseAccessDenied} severity="error" sx={{ width: '100%' }}>
                Access Denied!
              </Alert>
            </Snackbar>
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }} >
            <Grid container spacing={3}  >
              {/*Tickets*/}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box m={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-end">
                    <Title>Tickets</Title>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500}} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Priority</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        {(ticketRowsPerPage > 0
                          ? tickets.slice(ticketPage * ticketRowsPerPage, ticketPage * ticketRowsPerPage + ticketRowsPerPage)
                          : tickets
                        ).map((row) => (
                          <TableRow key={row.id} 
                          onClick={() => handleSelectTicket(row)}
                          selected={isTicketSelected(row)}
                          hover={true}
                          >
                            <TableCell component="th" scope="row" style={{ width: "40%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden"}}>
                              {row.Title}
                            </TableCell>
                            <TableCell style={{ width: "20%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden" }} align="center">
                              {ticketPriority(row.Priority)}
                            </TableCell>
                            <TableCell style={{ width: "20%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden" }} align="center">
                              {ticketType(row.Type)}
                            </TableCell>
                            <TableCell style={{ width: "20%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden" }} align="center">
                              {ticketResolution(row.Resolved)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow> 
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={tickets.length}
                            rowsPerPage={ticketRowsPerPage}
                            page={ticketPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangeTicketPage}
                            onRowsPerPageChange={handleChangeTicketRowsPerPage}
                            ActionsComponent={TablePaginationTicketActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}