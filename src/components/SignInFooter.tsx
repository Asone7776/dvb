import VskLogo from '../img/vsk-logo.svg';
const SignInFooter = () => {
    return (
        <div className="sign-in-footer row no-gutters">
            <div className="col-3"></div>
            <div className="col-9">
                <img src={VskLogo} alt="vsk-logo" />
                <p>1992–2021 Страховое акционерное общество «ВСК» Россия, Москва, 121552, ул. Островная, 4</p>
            </div>
        </div>
    );
}

export default SignInFooter;    