import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Home from './pages/Home';
import Signup from './pages/signup';
import Footer from './footer/footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>

        {/* BEGIN HEADER  */}

        <Header />

        {/* END HEADER */}

        {/* BEGIN HEADER & CONTENT DIVIDER */}

        <div className="clearfix"> </div>

        {/* END HEADER & CONTENT DIVIDER  */}

        {/* <!-- BEGIN CONTAINER --> */}

        <div className="page-container" style={{ minHeight: "100%" }}>

          {/* BEGIN SIDEBAR  */}

          <Sidebar />

          {/* Begin Page  */}
          <Switch>
            <Route exact path="/signup" component={() => <Signup />} />
            <Route exact path="/" component={() => <Home />} />
          </Switch>
        </div>

        {/* <!-- END CONTAINER --> */}

        {/* <!-- BEGIN FOOTER --> */}
        <Footer />
        {/* <!-- END FOOTER --> */}

      </Router>
    </>
  );
}

export default App;
