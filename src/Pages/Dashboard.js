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
import { useNavigate, useLocation, } from 'react-router-dom'
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

function TablePaginationProjectActions(props) {
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

TablePaginationProjectActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

function getStyles(name, developers, theme) {
  return {
    fontWeight:
      developers.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


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

  //SelectProject
  const [selectedProject, setSelectedProject] = useState("");

  const handleSelectProject = (row) => {
    setSelectedProject(row);
    setSelectedTicket("")
    setSelectedTicketAuthor("")
    getTickets()
    console.log(selectedProject)
  };

  //Highlight row depending on if its selected
  const isProjectSelected = (row) => row === selectedProject;

  
  //Add New Project
  const [openNewProject, setOpenNewProject] = useState(false);

  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const [openEditProject, setOpenEditProject] = useState(false);  

  //Edit Project Dialog Open
  const handleEditProjectOpen = () => {
    if(selectedProject != "") {
      setOpenEditProject(true)
      setNewProjectTitle(selectedProject.Title)
      setNewProjectDescription(selectedProject.Description)
    } else {
      setErrorPopup(true)
    }
  }
      
  //Edit Project Dialog Close
  const handleEditProjectClose = () => {
    setOpenEditProject(false)
  }

  async function handleEditProject() {

    if(newProjectDescription != "" && newProjectTitle != ""){
      await setDoc(doc(db, "Projects",selectedProject.id), {
        Title: newProjectTitle,
        Description: newProjectDescription,
      });
      console.log("Addition successful")
      setSuccessPopup(true)
      getProjects()
      getTickets()
      handleEditProjectClose()
    } else {
      console.log("Failed to add")
      setErrorPopup(true)
      getProjects()
      getTickets()
      handleEditProjectClose()
    }
  }

  //Add New Project Dialog Open
  const handleAddNewProjectOpen = () => {
    setOpenNewProject(true)
    setNewProjectTitle("")
    setNewProjectDescription("")
  }

  //Add New Project Dialog Close
  const handleAddNewProjectClose = () => {
    setOpenNewProject(false)
    setNewProjectTitle("")
    setNewProjectDescription("")
  }

  //Add New Project to the Firestore database
  async function handleAddNewProject() {
    if(newProjectDescription != "" && newProjectTitle != ""){
      const docRef = await addDoc(collection(db, "Projects"), {
        Title: newProjectTitle,
        Description: newProjectDescription,
        TicketIDs: []
      });
    }
    handleAddNewProjectClose()
    getProjects()
  }

  //Remove Project from the Database
  async function handleDeleteProject () {
    if(selectedProject != ""){
      await deleteDoc(doc(db, "Projects", selectedProject.id))
      const resultTickets = await getDocs(query(collection(db,"Ticket"), where("ProjectID", "==", selectedProject.id)))
      resultTickets.forEach(async (u) => {
        await deleteDoc(doc(db, "Ticket", u.id))
      });
      setSuccessPopup(true)
      getProjects()
      setSelectedProject("")
      setSelectedTicket("")
    } else {
      setErrorPopup(true)
    }
    
  }

  const getProjectTitle = (event) => {
    const {
      target: { value },
    } = event;
    setNewProjectTitle(value)
  }

  const getProjectDescription = (event) => {
    const {
      target: { value },
    } = event;
    setNewProjectDescription(value)
  }

  //Tickets
  const [tickets, setTickets] = useState([]);
  const ticketCollectionRef = collection(db,"Ticket")
  //const [selectedDevelopers, setSelectedDevelopers] = useState([]);

  var selectedDeveloperArray = []

  const [openNewTicket, setOpenNewTicket] = useState(false);

  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescripton] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState("");
  const [newTicketResolved, setNewTicketResolved] = useState("");
  const [newTicketType, setNewTicketType] = useState("");
  const [newTicketAuthor, setNewTicketAuthor] = useState("");
  const [newTicketProjectID, setNewTicketProjectID] = useState("");

  const [openEditTicket, setOpenEditTicket] = useState(false);

  //Edit Ticket Dialog Open
  const handleEditTicketOpen = () => {
    if(selectedTicket != "") {
      setOpenEditTicket(true)
      setNewTicketTitle(selectedTicket.Title)
      setNewTicketDescripton(selectedTicket.Description)
      setNewTicketPriority(selectedTicket.Priority)
      setNewTicketResolved(selectedTicket.Resolved)
      setNewTicketType(selectedTicket.Type)
      setNewTicketAuthor(selectedTicket.Author)
      setNewTicketProjectID(selectedTicket.ProjectID)
    } else {
      setErrorPopup(true)
    }
  }
    
  //Edit Ticket Dialog Close
  const handleEditTicketClose = () => {
    setOpenEditTicket(false)
  }

  async function handleEditTicket() {
    if(newTicketTitle != "" && newTicketDescription != "" && newTicketType != "" && newTicketPriority != "" && newTicketResolved != "" && selectedProject.id != "" && activeUserID != ""){
      await setDoc(doc(db, "Ticket",selectedTicket.id), {
        Title: newTicketTitle,
        Description: newTicketDescription,
        Author: activeUserID,
        Priority: newTicketPriority,
        ProjectID: selectedProject.id,
        Resolved: newTicketResolved,
        Type: newTicketType
      });
      console.log("Addition successful")
      setSuccessPopup(true)
      getTickets()
      handleEditTicketClose()
    } else {
      console.log("Failed to add")
      setErrorPopup(true)
      getTickets()
      handleEditTicketClose()
    }
  }

  //Add New Ticket Dialog Open
  const handleAddNewTicketOpen = () => {
    setOpenNewTicket(true)
    setNewTicketTitle("")
    setNewTicketDescripton("")
    setNewTicketPriority("")
    setNewTicketResolved(false)
    setNewTicketType("")
    setNewTicketAuthor("")
    setNewTicketProjectID("")
  }
  
  //Add New Ticket Dialog Close
  const handleAddNewTicketClose = () => {
    setOpenNewTicket(false)
    setNewTicketTitle("")
    setNewTicketDescripton("")
    setNewTicketPriority("")
    setNewTicketResolved(false)
    setNewTicketType("")
    setNewTicketAuthor("")
    setNewTicketProjectID("")
    //setSelectedDevelopers([])
  }

  const getTicketTitle = (event) => {
    const {
      target: { value },
    } = event;
    setNewTicketTitle(value)
  }

  const getTicketDescription = (event) => {
    const {
      target: { value },
    } = event;
    setNewTicketDescripton(value)
  }

  const getTicketPriority = (event) => {
    const {
      target: { value },
    } = event;
    setNewTicketPriority(value)
  }

  const getTicketResolved = (event) => {
    const {
      target: { value },
    } = event;
    setNewTicketResolved(value)
  }

  const getTicketType = (event) => {
    const {
      target: { value },
    } = event;
    setNewTicketType(value)
  }

  async function handleAddNewTicket() {
    if(newTicketTitle != "" && newTicketDescription != "" && newTicketType != "" && newTicketPriority != "" && newTicketResolved != "" && selectedProject.id != "" && activeUserID != ""){
      const docRef = await addDoc(collection(db, "Ticket"), {
        Title: newTicketTitle,
        Description: newTicketDescription,
        Author: activeUserID,
        Priority: newTicketPriority,
        ProjectID: selectedProject.id,
        Resolved: newTicketResolved,
        Type: newTicketType
      });
      await updateDoc(doc(db, "Projects", selectedProject.id), {
        TicketIDs: arrayUnion(docRef.path.substring(7))
      });
      getTickets()
      handleAddNewTicketClose()
    } else {
      getTickets()
      handleAddNewTicketClose()
    }
  }

  async function handleDeleteTicket () {
    if(selectedTicket != ""){
      await deleteDoc(doc(db, "Ticket", selectedTicket.id))
      setSuccessPopup(true)
      getTickets()
    } else {
      setErrorPopup(true)
    }
  }

  /*
  ---------MAYBE ADD DEVELOPER SELECTION FOR TICKETS--------------
  const handleDeveloperSelection = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDevelopers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      console.log(value)
    );
    selectedDeveloperArray = value
    console.log(selectedDeveloperArray)
  };
  */

    //Select Ticket
    const [selectedTicket, setSelectedTicket] = useState("");

    const handleSelectTicket = (row) => {
      setSelectedTicket(row);
      ticketAuthor(row.Author)
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

    const [selectedTicketAuthor, setSelectedTicketAuthor] = React.useState("");

    const ticketAuthor = async (id) => {

      const authorData = await getDoc(doc(db,"Users", id))
      setSelectedTicketAuthor(authorData.get("name"))
    }

  const location = useLocation()

  const checkForTicket= async() => {
    const tempProject = await getDoc(doc(db,"Projects", location.state.project))
    console.log(tempProject)
    console.log(location.state.ticket)
    setSelectedProject(tempProject)
    setSelectedTicket(location.state.ticket)
    ticketAuthor(selectedTicket.Author)
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


      
  const [projectPage, setProjectPage] = React.useState(0);
  const [projectRowsPerPage, setProjectRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.z

  const handleChangeProjectPage = (event, newPage) => {
    setProjectPage(newPage);
  };

  const handleChangeProjectRowsPerPage = (event) => {
    setProjectRowsPerPage(parseInt(event.target.value, 10));
    setProjectPage(0);
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

  const getTickets = async () => {
    if(selectedProject != []){
      const ticketData = await getDocs(query(ticketCollectionRef, where("ProjectID", "==", selectedProject.id)))
      setTickets(ticketData.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
  }

  const getProjects = async () => {
    const projectData = await getDocs(projectCollectionRef);
    setProjects(projectData.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  const getDevelopers = async () => {
    const developerData = await getDocs(developerCollectionRef);
    setDevelopers(developerData.docs.map((doc) => ({name: doc.data().name,id: doc.id})))
  }

  const [users,setUsers] = useState([])
  const [activeUser, setActiveUser] = useState([])
  const [activeUserID, setActiveUserID] = useState("")

  const getUsers = async () => {
    const userData = await getDocs(developerCollectionRef);
    setUsers(userData.docs.map((doc) => ({info: doc.data(),id: doc.id})))
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

  const ticketSelectionLoading = () => {
    if(selectedProject == ""){
      return <Grid item xs={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Tickets</Title>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>   
            <Grid container spacing={1}>
              <Grid item xs={8} style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                  variant="body1"
                  color="inherit"
                  display="inline"
                  sx={{mr: 2}}
                  >
                  No project selected
                  </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Grid>
    } else {
      return <Grid item xs={6}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box m={1}
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end">
          <Title>Tickets</Title>
          <Box  m={1}
              display="flex"
              alignItems="flex-end">
            <IconButton color="primary" aria-label="Create New Ticket" onClick={handleAddNewTicketOpen}><AddCircleRoundedIcon /></IconButton>
            <IconButton aria-label="Edit Ticket" style={{color:'#fdd835'}} onClick={handleEditTicketOpen}><EditIcon /></IconButton>
            <IconButton color="error" aria-label="Delete Selected Ticket"  onClick={handleDeleteTicket}><DeleteForeverIcon /></IconButton>
            {/*Edit Ticket Dialog */}
            <Dialog open={openEditTicket} onClose={handleEditTicketClose}>
              <Box  m={1}
              display="flex"
              justifyContent="end"
              alignItems="flex-end">
                <IconButton aria-label="Close Ticket Edit" sx={{ height: 30 }} color="error" onClick={handleEditTicketClose}><CancelRoundedIcon /></IconButton>
              </Box>
              <DialogTitle color="primary">Edit Selected Ticket</DialogTitle>
              <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                id="Title"
                label="Ticket Title"
                type="name"
                defaultValue = {selectedTicket.Title}
                onChange={getTicketTitle}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="normal"
                id="Description"
                label="Description"
                defaultValue = {selectedTicket.Description}
                onChange={getTicketDescription}
                multiline
                rows={4}
                fullWidth
                variant="standard"
              />
                  <FormControl sx={{ width: "100%" , mt: 1, mb: 1 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label" >Type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue = {selectedTicket.Type}
                      onChange={getTicketType}
                    >
                      <FormControlLabel value="Bug" control={<Radio />} label="Bug" />
                      <FormControlLabel value="Issue" control={<Radio />} label="Issue" />
                      <FormControlLabel value="Feature" control={<Radio />} label="Feature" />
                      <FormControlLabel value="Vulnerability" control={<Radio />} label="Vulnerability" />
                      <FormControlLabel value="Cleanup" control={<Radio />} label="Cleanup" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl sx={{ width: "100%" , mt: 1, mb: 1  }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue = {selectedTicket.Priority}
                      onChange={getTicketPriority}
                    >
                      <FormControlLabel value="Low" control={<Radio />} label="Low" />
                      <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                      <FormControlLabel value="High" control={<Radio />} label="High" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl sx={{ width: "100%" , mt: 1, mb: 1 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue = {selectedTicket.Resolved}
                      onChange={getTicketResolved}
                    >
                      <FormControlLabel value="Open" control={<Radio />} label="Open" />
                      <FormControlLabel value="Closed" control={<Radio />} label="Closed" />
                    </RadioGroup>
                  </FormControl>
                  {/* 
                  <FormControl sx={{ width: "100%" , mt: 2 }}>
                  <InputLabel id="demo-multiple-name-label">Developers</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedDevelopers}
                    defaultValue = {selectedDeveloperArray}
                    onChange={handleDeveloperSelection}
                    input={<OutlinedInput label="Developers" />}
                    MenuProps={MenuProps}
                  >
                    {developers.map((info) => (
                      <MenuItem
                        key={info.id}
                        value={info}
                        style={getStyles(info, selectedDevelopers, theme)}
                      >
                        {info.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                  */}
                <Box textAlign='center'>
                  <Button sx={{ mt:2, width: "30%" }} color="success" variant="contained" onClick={handleEditTicket}>Submit</Button>
                </Box>
              </DialogContent>
            </Dialog>
            {/*Create New Ticket Dialog*/}
            <Dialog open={openNewTicket} onClose={handleAddNewTicketClose}>
              <Box  m={1}
              display="flex"
              justifyContent="end"
              alignItems="flex-end">
                <IconButton aria-label="Close Project Creation" sx={{ height: 30 }} color="error" onClick={handleAddNewTicketClose}><CancelRoundedIcon /></IconButton>
              </Box>
              <DialogTitle color="primary">Create New Ticket</DialogTitle>
              <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                id="Title"
                label="Project Title"
                type="name"
                onChange={getTicketTitle}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="normal"
                id="Description"
                label="Description"
                onChange={getTicketDescription}
                multiline
                rows={4}
                fullWidth
                variant="standard"
              />
                  <FormControl sx={{ width: "100%" , mt: 1, mb: 1 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label" >Type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={getTicketType}
                    >
                      <FormControlLabel value="Bug" control={<Radio />} label="Bug" />
                      <FormControlLabel value="Issue" control={<Radio />} label="Issue" />
                      <FormControlLabel value="Feature" control={<Radio />} label="Feature" />
                      <FormControlLabel value="Vulnerability" control={<Radio />} label="Vulnerability" />
                      <FormControlLabel value="Cleanup" control={<Radio />} label="Cleanup" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl sx={{ width: "100%" , mt: 1, mb: 1  }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={getTicketPriority}
                    >
                      <FormControlLabel value="Low" control={<Radio />} label="Low" />
                      <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                      <FormControlLabel value="High" control={<Radio />} label="High" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl sx={{ width: "100%" , mt: 1, mb: 1 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={getTicketResolved}
                    >
                      <FormControlLabel value="Open" control={<Radio />} label="Open" />
                      <FormControlLabel value="Closed" control={<Radio />} label="Closed" />
                    </RadioGroup>
                  </FormControl>
                {/*
                <FormControl sx={{ width: "100%" , mt: 2 }}>
                  <InputLabel id="demo-multiple-name-label">Developers</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedDevelopers}
                    onChange={handleDeveloperSelection}
                    input={<OutlinedInput label="Developers" />}
                    MenuProps={MenuProps}
                  >
                    {developers.map((info) => (
                      <MenuItem
                        key={info.id}
                        value={info}
                        style={getStyles(info, selectedDevelopers, theme)}
                      >
                        {info.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                */}
                <Box textAlign='center'>
                  <Button sx={{ mt:2, width: "30%" }} color="success" variant="contained" onClick={handleAddNewTicket}>Submit</Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
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
    }
  }

  const projectInfoLoading = () => {
    if(selectedProject == ""){
      return <Grid item xs={6}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Title>Project Information</Title>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>   
          <Grid container spacing={1}>
            <Grid item xs={8} style={{ display: "flex", alignItems: "baseline" }}>
            <Typography
                variant="body1"
                color="inherit"
                display="inline"
                sx={{mr: 2}}
                >
                No project selected
                </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Grid>
    }else{
      return               <Grid item xs={6}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Project Information</Title>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>   
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ display: "flex", alignItems: "baseline" }}>
            <Typography
              variant="h6"
              color="inherit"
              display="inline"
              sx={{mr: 2}}
              >
              Title:  
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                display="inline"
                >
                   {selectedProject.Title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
              variant="h6"
              color="inherit"
              display="inline"
              sx={{mr: 2}}
              >
              Description:  
              </Typography>
              <Typography
                variant="body1"
                color="inherit"
                display="inline"
                >
                  {selectedProject.Description}
                </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Grid>
    }
  }

  const ticketInfoLoading = () => {
    if(selectedTicket == "") {
      return <Grid item xs={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Ticket Information</Title>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>   
            <Grid container spacing={1}>
              <Grid item xs={8} style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                  variant="body1"
                  color="inherit"
                  display="inline"
                  sx={{mr: 2}}
                  >
                  No ticket selected
                  </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Grid>
    }else{
      console.log("False")
      return <Grid item xs={6}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Title>Ticket Information</Title>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>   
          <Grid container spacing={1}>
            <Grid item xs={8} style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="h6"
                color="inherit"
                display="inline"
                sx={{mr: 2}}
                >
                Title:  
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  display="inline"
                  >
                    {selectedTicket.Title}
                  </Typography>
              </Grid>
              <Grid item xs={4} style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="h6"
                color="inherit"
                display="inline"
                sx={{mr: 2}}
                >
                Status: {ticketResolution(selectedTicket.Resolved)}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="h6"
                color="inherit"
                display="inline"
                sx={{mr: 2}}
                >
                Priority: {ticketPriority(selectedTicket.Priority)}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="h6"
                color="inherit"
                display="inline"
                sx={{mr: 2}}
                >
                Type:  {ticketType(selectedTicket.Type)}
                </Typography>
              </Grid>
            <Grid item xs={4} style={{ display: "flex", alignItems: "baseline" }}>
            <Typography
              variant="h6"
              color="inherit"
              display="inline"
              sx={{mr: 2}}
              >
              Author: 
              </Typography>
              <Typography
              variant="body1"
              color="inherit"
              display="inline"
              >
              {selectedTicketAuthor}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
              variant="h6"
              color="inherit"
              display="inline"
              sx={{ flexGrow: 1}}
              >
              Description: <Typography
              variant="body1"
              color="inherit"
              display="inline"
              sx={{ flexGrow: 1 }}
              >
              {selectedTicket.Description}
              </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Grid>
    }
  }

  useEffect(() => {
    getCurrentUser()
    checkForTicket()
  }, [])

  useEffect(() => {
    getProjects()
    getTickets()
    getUsers()
    getDevelopers()
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
              Welcome, {activeUser.name}
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
              {/* Projects */}
              <Grid item xs={6} >
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                  <Box m={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-end">
                    <Title>Projects</Title>
                    <Box  m={1}
                        display="flex"
                        alignItems="flex-end">
                      <IconButton color="primary" aria-label="Create New Project" onClick={handleAddNewProjectOpen}><AddCircleRoundedIcon /></IconButton>
                      <IconButton aria-label="Edit Project" style={{color:'#fdd835'}} onClick={handleEditProjectOpen}><EditIcon /></IconButton>
                      <IconButton color="error" aria-label="Delete Selected Project"  onClick={handleDeleteProject}><DeleteForeverIcon /></IconButton>
                      {/*Edit Project*/}
                      <Dialog open={openEditProject} onClose={handleEditProjectClose}>
                        <Box  m={1}
                        display="flex"
                        justifyContent="end"
                        alignItems="flex-end">
                          <IconButton aria-label="Close Project Creation" sx={{ height: 30 }} color="error" onClick={handleEditProjectClose}><CancelRoundedIcon /></IconButton>
                        </Box>
                        <DialogTitle color="primary">Edit Selected Project</DialogTitle>
                        <DialogContent>
                        <TextField
                          autoFocus
                          margin="normal"
                          id="Title"
                          label="Project Title"
                          type="name"
                          defaultValue={selectedProject.Title}
                          onChange={getProjectTitle}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          id="Description"
                          label="Description"
                          defaultValue={selectedProject.Description}
                          onChange={getProjectDescription}
                          multiline
                          rows={4}
                          fullWidth
                          variant="standard"
                        />
                          <Box textAlign='center'>
                            <Button sx={{ mt:2, width: "30%" }} color="success" variant="contained" onClick={handleEditProject}>Submit</Button>
                          </Box>
                        </DialogContent>
                      </Dialog>
                      {/*Add New Project*/}
                      <Dialog open={openNewProject} onClose={handleAddNewProjectClose}>
                        <Box  m={1}
                        display="flex"
                        justifyContent="end"
                        alignItems="flex-end">
                          <IconButton aria-label="Close Project Creation" sx={{ height: 30 }} color="error" onClick={handleAddNewProjectClose}><CancelRoundedIcon /></IconButton>
                        </Box>
                        <DialogTitle color="primary">Create New Project</DialogTitle>
                        <DialogContent>
                        <TextField
                          autoFocus
                          margin="normal"
                          id="Title"
                          label="Project Title"
                          type="name"
                          onChange={getProjectTitle}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          id="Description"
                          label="Description"
                          onChange={getProjectDescription}
                          multiline
                          rows={4}
                          fullWidth
                          variant="standard"
                        />
                          <Box textAlign='center'>
                            <Button sx={{ mt:2, width: "30%" }} color="success" variant="contained" onClick={handleAddNewProject}>Submit</Button>
                          </Box>
                        </DialogContent>
                      </Dialog>
                    </Box>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500}} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="left">Description</TableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        {(projectRowsPerPage > 0
                          ? projects.slice(projectPage * projectRowsPerPage, projectPage * projectRowsPerPage + projectRowsPerPage)
                          : projects
                        ).map((row) => (
                          <TableRow key={row.id} 
                          onClick={() => handleSelectProject(row)}
                          selected={isProjectSelected(row)}
                          hover={true}
                          >
                            <TableCell component="th" scope="row" style={{ width: "25%" , maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden"}}>
                              {row.Title}
                            </TableCell>
                            <TableCell style={{ maxWidth: 0 , whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden" }} align="left">
                              {row.Description}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow> 
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={projects.length}
                            rowsPerPage={projectRowsPerPage}
                            page={projectPage}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangeProjectPage}
                            onRowsPerPageChange={handleChangeProjectRowsPerPage}
                            ActionsComponent={TablePaginationProjectActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              {/*Tickets*/}
              {ticketSelectionLoading()}
              {/* Project Information */}
              {projectInfoLoading()}
              {/*Ticket Information*/}
              {ticketInfoLoading()}
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