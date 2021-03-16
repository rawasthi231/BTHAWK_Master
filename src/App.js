import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Home from './pages/Home';
import Footer from './footer/footer';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/profile_page';
import Chart from './Chart';
import ProductCatagory from "./pages/product_catagory";
import SubCatagory from './pages/product_sub_category';
import Form from './pages/formPract';
import ProductAdd from './pages/product_add';


function App() {
  return (
    <>
      {/* BEGIN HEADER  */}

        <Header />

     {/* END HEADER */}

      {/* BEGIN HEADER & CONTENT DIVIDER */}

      <div className="clearfix"> </div>

      {/* END HEADER & CONTENT DIVIDER  */}

      {/* <!-- BEGIN CONTAINER --> */}

      <div className="page-container">

          {/* BEGIN SIDEBAR  */}

            <Sidebar />
                    
          {/* Begin Page  */}
          <Switch>
            <Route exact path='/' component={() => {return <Home />}} />
            <Route exact path='/profile' component={() => {return <Profile />}} />
            <Route exact path='/chart' component={() => {return <Chart />}} />
            <Route exact path='/product-catagory' component={() => {return <ProductCatagory />}} />
            <Route exact path='/sub_category' component={() => {return <SubCatagory />}} />
            <Route exact path='/add_category' component={() => {return <ProductAdd />}} />
            <Route exact path='/form' component={() => {return <Form />}} />
          </Switch>
            

      </div>

      {/* <!-- END CONTAINER --> */}

      {/* <!-- BEGIN FOOTER --> */}
            <Footer />
      {/* <!-- END FOOTER --> */}
    </>        
  );
}

export default App;
