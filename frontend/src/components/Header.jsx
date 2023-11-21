import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <div className="header-container header-only">
            <Link to="/">
                <img src="/images/logo.png" alt="logo" className="logo"/>
            </Link>
        </div>
    )
}