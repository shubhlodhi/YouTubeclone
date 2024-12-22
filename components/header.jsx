import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
// Importing context for user information
import { newusercontext, usercontext } from './form/contextform';
import Search from './search/search';
import { Dropdown, DropdownButton } from "react-bootstrap"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import search from "./../images/search.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import menu from "../images/menu.png"
import login from "../images/login_icon_176905.png"
import { useNavigate } from 'react-router-dom';
import vediopng from "../images/video.png"
import logout from "../images/logout.png"
// import { CiSettings } from "react-icons/ci";
import home from "../images/home.png"
import explore from "../images/explore.png"
import more from "../images/more.png"
// import subscribess from "../images/subscription.png"
import history from "../images/history.png"
import library from "../images/library.png"
import playlist from "../images/playlist.png"
import thum1 from "../images/thumbnail1.png"
import thum2 from "../images/thumbnail2.png"

import thum3 from "../images/thumbnail3.png"

import thum4 from "../images/thumbnail4.png"
import thum5 from "../images/thumbnail5.png"
import thum6 from "../images/thumbnail6.png"
import thum7 from "../images/thumbnail7.png"
import haedline from "../images/headline_4172025.png"
import haedline1 from "../images/joystick_808439.png"
import haedline2 from "../images/live_4178600.png"
import haedline3 from "../images/musical-notes_2907197.png"
import haedline4 from "../images/tennis_2906746.png"
import haedline5 from "../images/trend_12773512.png"
import "./header.css"
function Header({ ismini, Ontoggle }) {
    // State to toggle sidebar visibility
    const [toggle, settoggle] = useState(true)
    // / State to store user data
    const [adtas, setdatas] = useState([])
    // State for the minimized state of the sidebar
    const [isMinimized, setIsMinimized] = useState(false)
    //  const [serchinp , setserchinp] = useState("")
    // State to toggle search bar visibility
    const [ifserch, setserch] = useState(false)
    //  const [loh ,setlog] = useState(true)
    const [prevent, setprevent] = useState(true)
    const [bal, setbal] = useState()
    // Balance state for managing the user status
    const [sec, setsec] = useState()
    // Security state for additional checks

    const url = localStorage.getItem("userid")
    // Fetching user ID from localStorage
    console.log("url", url)
     // Context for setting search input information
    console.log(prevent)
    // const sign = useContext(usercontext)

    const { setinfo } = useContext(usercontext)
    const { setnew } = useContext(newusercontext)
    const ko = useContext(newusercontext)
      // Fetching user data based on the user ID stored in localStorage
    useEffect(() => {
        const bal = localStorage.getItem("first")
        setbal(bal)
        // navi(0)
    }, [])
    // useEffect(()=>{
    //  localStorage.setItem("first" , JSON.stringify("new"))

    // console.log("hi" , localStorage.getItem("first"))
    // },[])

    console.log("ko", ko)
    // sec ? toast("added successfuly chanel"  ):""
    // const {new} = useContext(usercontext)
    // useEffect to fetch user data when URL changes

    {
        prevent && useEffect(() => {
            if (!url) {
                return; // Exit early if `url` is undefined
            }

            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5100/getusers/${url}`);
                    // if (!response.ok) {
                    //     throw new Error(`Error: ${response.statusText}`);
                    // }
                    const data = await response.json();
                    setdatas(data);

                    console.log("ss", adtas)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };


            fetchData(); // Call the async function
        }, [url]);
    }// Dependency array includes `url`

    console.log(adtas)
    // Function to toggle sidebar visibility

    function toggles() {
        settoggle(!toggle)
        Ontoggle(!ismini)
    }
        // Function to handle search input visibility

    function handle() {
        setserch(!ifserch)
    }
        // Function to log the user out

    function notlog() {
        setnew(!ko.new)
        // localStorage.removeItem('userid')
        // localStorage.removeItem('user')
        navi(0)
        // Remove token from localStorage
        // Remove 'first' flag from localStorage
       // Remove 'second' flag from localStorage
        localStorage.removeItem('token')
        localStorage.removeItem("first")
        localStorage.removeItem("second")

    }
    // const notify = () => toast("Wow so easy!");
    const navi = useNavigate()
    // / Use navigate hook to redirect to a different page
    if (!ko.new) {
        navi(0)
        setnew(true)
    }

    // navi(0)
    // console.log(bal)

    // / Set the security state based on the value in localStorage
    useEffect(() => {
        const sec = localStorage.getItem("second")
        setsec(sec)
    }, [])

    return (
        <>

            <div className='header' style={{ transition: "2.2s cubic-bezier(.36,-0.01,0,.77)" }}>
                <div className='nav-left'>
                    <img src={menu}
                        onClick={toggles} />
                    {/* <h3>YouTube</h3> */}
                    <span>YouTube</span><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="50" height="50" viewBox="0 0 48 48">
                        <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                    </svg>

                </div>
                <div className='nav-middle'>

                    <div className='search-top flex-div'>
                        <input type="text" placeholder='Search' onChange={(e) => setinfo(e.target.value)} />
                        <Link to={{
                            pathname: "/search"

                        }}><img src={search} alt="" />
                        </Link>
                    </div>



                </div>
                <div className='nav-right'>

                   
                    <ToastContainer />
                    <img src="images/messages.png" alt="" />
                  

                    <Link to={"/loginform"}>{!bal ? <img src={login} /> : ""}

                    </Link>
                    {bal ? <img src={logout} onClick={notlog} /> : " "}
                    {bal ? <Link to={"/chanelpage"}><img src={vediopng} /></Link>
                        : ""}

                    { bal ? <DropdownButton className='btn btn-danger' title={"channel pages"} >
                        {adtas.map(data =>
                            <>
                                <div key={data._id}>
                                    <Dropdown.Item className='dropdown'><Link className='drop' to={`/registerchanel/${data._id}`}>
                                        <a className="dropdown-item" >{data.chname}</a></Link></Dropdown.Item>
                                </div>
                            </>
                        )}


                       


                    </DropdownButton> : ""}


                </div>

            </div>
            <div className='sidebars'>

                {toggle && <div className='sidebar1' >
                  <Link to ={"/"}> <a href=""><img src={home}alt="" /></a>
                  </Link> 
                    <a href=""><img src={more} alt="" /></a>
                    <a href=""><img src={explore} alt="" /></a>
                    <a href=""><img src={library} alt="" /></a>
                </div>}

                {!toggle && < div className='sidebar'>

                    <div className='sortcut-links'>

                        <Link to={"/"}><a href=""><img src={home} alt="" />{!toggle && <p>Home</p>}</a>
                        </Link>
                        <a href=""><img src={more} alt="" />{!toggle && <p>More</p>}</a>
                        <a href=""><img src={explore} alt="" />{!toggle && <p>Explore</p>}</a>
                        <a href=""><img src={history}alt="" />{!toggle && <p>subscription</p>}</a>
                        {!toggle && <hr />}

                        <div className='side-link'>{!toggle && <a href=""><img src={more} alt="" /><p>Cast</p></a>}</div>
                        <div className='side-link'>{!toggle && <a href=""><img src={library}alt="" /><p>History</p></a>}</div>
                        <div className='side-link'>{!toggle && <a href=""><img src="images/library.png" alt="" /><p>Library</p></a>}</div>
                        <div className='side-link'>{!toggle && <a href=""><img src={explore} alt="" /><p>Explore</p></a>}</div>
                        <div className='side-link'>{!toggle && <a href=""><img src={playlist} alt="" /><p>Playlist</p></a>}</div>
                        <div className='side-link'>{!toggle && <hr />}
                            <div className='side-link'>{!toggle && <h3 style={{ margin: "10px" }}>Subscription</h3>}
                                <div className='side-link'>{!toggle && <a href=""><img src={thum1} className='thumb' alt="" /><p>Traveling</p></a>}</div>
                                <div className='side-link'>{!toggle && <a href=""><img src={thum2} className='thumb' alt="" /><p>Vlogs</p></a>}</div>
                                <div className='side-link'>{!toggle && <a href=""><img src={thum3} className='thumb' alt="" /><p>Music Industries</p></a>}</div>
                                <div className='side-link'>{!toggle && <a href=""><img src={thum4} className='thumb' alt="" /><p>Artficial Intelligence</p></a>}</div>
                                <div className='side-link'> {!toggle && <a href=""><img src={thum5} className='thumb' alt="" /><p>CIgrateds</p></a>}</div>
                                <div className='side-link'> {!toggle && <a href=""><img src={thum6} className='thumb' alt="" /><p>World Mountain</p></a>}</div>
                                <div className='side-link'>{!toggle && <a href=""><img src={thum7} className='thumb' alt="" /><p>Cast Monunments</p></a>}</div>
                                <div className='side-link'>{!toggle && <hr />}
                                    <div className='side-link'> {!toggle && <h3 style={{ margin: "10px" }}>Explore</h3>}
                                        <div className='side-link'> {!toggle && <a href=""><img src={haedline} className='thumb' alt="" /><p>News</p></a>}</div>
                                        <div className='side-link'> {!toggle && <a href=""><img src={haedline1} className='thumb' alt="" /><p>Gaming</p></a>}</div>

                                        <div className='side-link'></div> {!toggle && <a href=""><img src={haedline2} className='thumb' alt="" /><p>Live</p></a>}</div>

                                    <div className='side-link'></div> {!toggle && <a href=""><img src={haedline3} className='thumb' alt="" /><p>Music</p></a>}</div>

                                <div className='side-link'></div> {!toggle && <a href=""><img src={haedline4} className='thumb' alt="" /><p>Sports</p></a>}</div>

                            <div className='side-link'></div> {!toggle && <a href=""><img src={haedline5} className='thumb' alt="" /><p>Trending</p></a>}</div>

                    </div>
                </div>

                }

            </div>





        </>
    )
}
export default Header

