import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import logo from '../../images/banner.jpg'

export const Login = () => {
  // const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  // const sessinId = useSelector((state) => state.app.sessinId);
  // const userToken = useSelector((state) => state.app.token);
  // const navigate = useNavigate();

  // const Confirm = () => {
  //   userToken &&
  //     window
  //       .open(`https://www.themoviedb.org/authenticate/${userToken}`)
  //       .focus();
  //   if (
  //     window.confirm("Please authenticate the user for authorization !") == true
  //   ) {
  //     httpClient
  //       .post("/authentication/session/new", {
  //         request_token: userToken,
  //       })
  //       .then((response) => {
  //         dispatch(setSessin_id(response.data.session_id));
  //         navigate("/");
  //       })
  //       .catch(() =>
  //         alert("Can not login. Please check your account and password !")
  //       );
  //   } else {
  //     navigate("/register");
  //   }
  // };

  // useEffect(() => {
  //   httpClient.get("authentication/token/new").then((response) => {
  //     localStorage.setItem("userToken", response.data.request_token);
  //     dispatch(setToken(response.data.request_token));
  //   });
  // }, []);

  // const LoginAccount = (e) => {
  //   e.preventDefault();
  //   Confirm();
  // };
  return (
    <div class="content-wrapper">
    <section class="wrapper bg-light">
      <div class="container">
        <div  class="row"  style={{backgroundColor : '#202020',marginTop : '50px'}}>
          <div class="col">
            <div class="card shadow-lg">
              <div class="row text-center" style={{backgroundColor : '#202020'}} >
              <div class="col-lg-6 image-wrapper " >
                 <img   class=""style={{width : '500px' , height : '500px' ,marginTop : '100px'}} src={logo} alt="" />
                </div>
                <div class="col-lg-6">
                  <div class="p-10 p-md-11 p-lg-13">
                    <h2 class="mb-3 text-start" style={{color : 'gray'}}>Login to Event</h2>
                    <form class="text-start mb-3">
                      <div class="form-floating mb-4">
                        <input type="email" class="form-control" placeholder="Email" id="loginEmail"/>
                        <label for="loginEmail">Email</label>
                      </div>
                      <div class="form-floating password-field mb-4">
                        <input type="password" class="form-control" placeholder="Password" id="loginPassword"/>
                        <span class="password-toggle"><i class="uil uil-eye"></i></span>
                        <label for="loginPassword">Password</label>
                      </div>
                      <a class="btn btn-primary rounded-pill btn-login w-100 mb-2">Sign Up</a>
                    </form>
                    <p class="mb-0">Already have an account? <a href="signin2.html" class="hover">Sign in</a></p>
                    <div class="divider-icon my-4">or</div>
                    <nav class="nav social justify-content-center text-center">
                      <a  href={GOOGLE_AUTH_URL} class="btn btn-circle btn-sm btn-google"><i class="uil uil-google"></i></a>
                      <a href="#" class="btn btn-circle btn-sm btn-facebook-f"><i class="uil uil-facebook-f"></i></a>
                      <a href="#" class="btn btn-circle btn-sm btn-twitter"><i class="uil uil-twitter"></i></a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};
