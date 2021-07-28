import AccountCard from '../Components/Cards/Account.js';
import ErrorCard from '../Components/Cards/ErrorCard.js';
import UseCaseCard from '../Components/Cards/UseCaseCard.js';
import VisitorCard from '../Components/Cards/VisitorCard.js';
import LastUpdate from '../Components/Cards/LastUpdate.js';

const Home = () => {
    return (
        <div className="card-columns">
            <div className="card-group" >
                <VisitorCard />
                <ErrorCard />
            </div>
            <div className="card-group">
                <AccountCard />
                <UseCaseCard />
            </div>
            {
                window.location.pathname === "/" && <div className="card-group"> <LastUpdate /> </div>
            }
        </div >
    );
}

export default Home;