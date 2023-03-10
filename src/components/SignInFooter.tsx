import VskLogo from '../img/vsk-logo.png';
const SignInFooter = () => {
    return (
        <div className="sign-in-footer row no-gutters">
            <div className="col-3"></div>
            <div className="col-9">
                <img style={{ maxWidth: 150 }} src={VskLogo} alt="vsk-logo" />
                <p>1992–{new Date().getFullYear()} Страховое акционерное общество «ВСК» Россия, Москва, 121552, ул. Островная, 4</p>
            </div>
        </div>
    );
}

export default SignInFooter;    