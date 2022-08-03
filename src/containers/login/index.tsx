import Bank from '../../img/bspb.jpg';
import LvbLogo from '../../components/LvbLogo';
import SignInForm from '../../components/SignInForm';
import SignInFooter from '../../components/SignInFooter';
const Login = () => {
    return (
        <div className="login-page">
            <div className="container-fluid h-100 p-0">
                <div className="row h-100 no-gutters">
                    <div className="col-5 left-col">
                        <div className="row d-flex justify-content-center">
                            <div className="col-6">
                                <div className="sign-bg">
                                    <div className="logo">
                                        <LvbLogo />
                                    </div>
                                    <SignInForm />
                                </div>
                            </div>
                        </div>
                        <SignInFooter />
                    </div>
                    <div className="col-7 bg-wrapper" style={{ backgroundImage: `url(${Bank})` }}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;