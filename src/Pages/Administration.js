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
import { Button, unstable_composeClasses } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc} from "firebase/firestore"; 
import { auth, db } from '../firebase'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import EditIcon from '@mui/icons-material/Edit';
import { isAdmin } from '@firebase/util';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../components/logo.png'
import { Image } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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


function TablePaginationUserActions(props) {
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

TablePaginationUserActions.propTypes = {
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

  //Populate Projects table and Dev List
  const [projects, setProjects] = useState([]);
  const projectCollectionRef = collection(db,"Projects")

  const [developers, setDevelopers] = useState([]);
  const developerCollectionRef = collection(db,"Users")

  //Select User
  const [selectedUser, setSelectedUser] = useState("");

  const handleSelectUser = (row) => {
    setSelectedUser(row);
    console.log(selectedUser)
  };

  //Highlight row depending on if its selected
  const isUserSelected = (row) => row === selectedUser;

  
  //Add New User
  const [openNewUser, setOpenNewUser] = useState(false);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserAdmin, setNewUserAdmin] = useState(false);


  const [openEditUser, setOpenEditUser] = useState(false);  

  //Edit Project Dialog Open
  const handleEditUserOpen = () => {
    if(setSelectedUser != "") {
      setOpenEditUser(true)
      //setNewProjectTitle(selectedTicket.Title)
      //setNewProjectDescription(selectedTicket.Description)
    }
  }
      
  //Edit Project Dialog Close
  const handleEditUserClose = () => {
    setOpenEditUser(false)
  }


  //Add New User Dialog Open
  const handleAddNewUserOpen = () => {
    setOpenNewUser(true)
    setNewUserName("")
    setNewUserEmail("")
    setNewUserPassword("")
    setNewUserPhone("")
    setNewUserAdmin(false)
  }

  //Add New User Dialog Close
  const handleAddNewUserClose = () => {
    setOpenNewUser(false)
    setNewUserName("")
    setNewUserEmail("")
    setNewUserPassword("")
    setNewUserPhone("")
    setNewUserAdmin(false)
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPhone(phone) {
    return /[0-9]/.test(phone)
  }

  const handleAddNewUser = async() => {

    //Add to Database
    if(newUserName != "" && newUserPassword != "" && newUserEmail != "" && newUserPhone != "" && isValidPhone(newUserPhone) && isValidEmail(newUserEmail) && newUserPassword.length >= 6){
      await addDoc(collection(db, "Users"), {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        phone: newUserPhone,
        admin: newUserAdmin
      });
      //Add to Auth
      createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword)
      setSuccessPopup(true)
      handleAddNewUserClose()
      getCurrentUser()
      getUsers()
    } else {
      setErrorPopup(true)
      handleAddNewUserClose()
    }
  }

  /*
  const handleDeleteUser = async() => {

  }
  */

  const isUserAdmin = (row) => {
    if(row == true)
    {
      return <GppGoodIcon color="primary" ></GppGoodIcon>
    } else {
      return 
    }
  }

  const getUserName = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value)
  }

  const getUserEmail = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserEmail(value)
  }

  const getUserPassword = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserPassword(value)
  }

  const getUserCell = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserPhone(value)
  }

  const getUserAdmin = (event) => {
    const {
      target: { value },
    } = event;
    if(value == "Admin") {
      setNewUserAdmin(true)
    } else {
      setNewUserAdmin(false)
    }
  }

  /*
  //Add New User to the Firestore database
  async function handleAddNewProject() {
    if(newProjectDescription != "" && newProjectTitle != ""){
      const docRef = await addDoc(collection(db, "Projects"), {
        Title: newProjectTitle,
        Description: newProjectDescription,
        TicketIDs: []
      });
    }
    handleAddNewProjectClose()
    //getProjects()
  }

  */


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
    function handleAdmin() {
      navigate("/Administration", {
        state: {
          id: activeUserID
        }
      })
    }


  const [userPage, setUserPage] = React.useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.z

  const handleChangeUserPage = (event, newPage) => {
    setUserPage(newPage);
  };

  const handleChangeUserRowsPerPage = (event) => {
    setUserRowsPerPage(parseInt(event.target.value, 10));
    setUserPage(0);
  };


  const [users,setUsers] = useState([])
  const [activeUser, setActiveUser] = useState([])
  const [activeUserID, setActiveUserID] = useState("")

  const getUsers = async () => {
    if(activeUser != [] && activeUserID != "")
    {
      console.log("Step 1 complete")
      if(activeUser.admin == false){
        console.log("Step 2 complete")
        handleDashboard()
      }else {
        console.log("Step 2 fail")
        const userData = await getDocs(developerCollectionRef);
        setUsers(userData.docs.map((doc) => ({...doc.data(),id: doc.id})))
      }
    }
  }

  const getCurrentUser = async () => {
    const loggedUser = auth.currentUser
    const loggedUserData = await getDocs(query(developerCollectionRef, where("email", "==", loggedUser.email)))
    loggedUserData.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setActiveUserID(doc.id)
      setActiveUser(doc.data())
    });
  }

  const [errorPopup, setErrorPopup] = useState(false)
  const [successPopup, setSuccessPopup] = useState(false)

  const handleSuccessPopup = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessPopup(false)
  };

  const handleErrorPopup = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorPopup(false)
  };

  useEffect(() => {
    getCurrentUser()
  }, [])

  useEffect(() => {
    getUsers()
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
              Administration
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
          <Snackbar open={errorPopup} autoHideDuration={6000} onClose={handleErrorPopup}>
              <Alert onClose={handleErrorPopup} severity="error" sx={{ width: '100%' }}>
                Error, Please try again!
              </Alert>
          </Snackbar>
          <Snackbar open={successPopup} autoHideDuration={6000} onClose={handleSuccessPopup}>
              <Alert onClose={handleSuccessPopup} severity="success" sx={{ width: '100%' }}>
                Success!
              </Alert>
          </Snackbar>
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }} >
            <Grid container spacing={3}  >
              {/* Users */}
              <Grid item xs={12} >
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                  <Box m={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-end">
                    <Title>Users</Title>
                    <Box  m={1}
                        display="flex"
                        alignItems="flex-end">
                      <IconButton color="primary" aria-label="Create New User" onClick={handleAddNewUserOpen}><AddCircleRoundedIcon /></IconButton>

                      {/*Add New User*/}
                      <Dialog open={openNewUser} onClose={handleAddNewUserClose}>
                        <Box  m={1}
                        display="flex"
                        justifyContent="end"
                        alignItems="flex-end">
                          <IconButton aria-label="Close User Creation" sx={{ height: 30 }} color="error" onClick={handleAddNewUserClose}><CancelRoundedIcon /></IconButton>
                        </Box>
                        <DialogTitle color="primary">Create New User</DialogTitle>
                        <DialogContent>
                        <TextField
                          autoFocus
                          margin="normal"
                          id="name"
                          label="Name"
                          type="name"
                          onChange={getUserName}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          id="email"
                          label="Email"
                          type="name"
                          onChange={getUserEmail}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          id="password"
                          label="Password"
                          type="name"
                          onChange={getUserPassword}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          id="phone"
                          label="Phone"
                          type="name"
                          onChange={getUserCell}
                          fullWidth
                          variant="standard"
                        />
                        <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={getUserAdmin}
                              >
                                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                                <FormControlLabel value="Developer" control={<Radio />} label="Developer" />
                              </RadioGroup>
                          <Box textAlign='center'>
                            <Button sx={{ mt:2, width: "30%" }} color="success" variant="contained" onClick={handleAddNewUser}>Submit</Button>
                          </Box>
                        </DialogContent>
                      </Dialog>
                    </Box>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500}} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Cell</TableCell>
                        <TableCell>Administrator</TableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        {(userRowsPerPage > 0
                          ? users.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage)
                          : users
                        ).map((row) => (
                          <TableRow key={row.id} 
                          onClick={() => handleSelectUser(row)}
                          selected={isUserSelected(row)}
                          hover={true}
                          >
                            <TableCell component="th" scope="row" style={{ width: "22%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden"}}>
                              {row.name}
                            </TableCell>
                            <TableCell style={{ width: "22%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden" }} align="left">
                              {row.email}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: "22%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden"}}>
                              {row.password}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: "22%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden"}}>
                              {row.phone}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: "12%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden"}}>
                              {isUserAdmin(row.admin)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow> 
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={users.length}
                            rowsPerPage={userRowsPerPage}
                            page={userPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangeUserPage}
                            onRowsPerPageChange={handleChangeUserRowsPerPage}
                            ActionsComponent={TablePaginationUserActions}
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