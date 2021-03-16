import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Home from './pages/Home';
import Login from './pages/index';
import Footer from './footer/footer';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/profile_page';
import ProductCatagory from "./pages/product_catagory";
import ProductSubCatagory from "./pages/product_sub_category";
import PktBagDetail from "./pages/pkt_bag_detail";
import AddProducts from "./pages/product_add"; 
import EditProduct from "./pages/edit_product"; 
import GetProducts from "./pages/products"; 
import SalesExecutive from "./pages/sales_executive";
import EditSalesExecutive from "./pages/edit_sales_executive";
import FSEStockReturn from "./pages/fse_stock_return";
import FSEStockDetail from "./pages/fse_stock_detail";
//import FileUpload from "./pages/file_upload";
import "react-table"; 

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
            <Route exact path='/' component={() => {return <Login />}} />
            <Route exact path='/dashboard' component={() => {return <Home />}} />
            <Route exact path='/profile' component={() => {return <Profile />}} />
            <Route exact path='/product-catagory' component={() => {return <ProductCatagory />}} />
            <Route exact path='/product-sub-catagory' component={() => {return <ProductSubCatagory />}} />
            <Route exact path='/pkt-bag-detail' component={() => {return <PktBagDetail />}} />
            <Route exact path='/add-product' component={() => {return <AddProducts />}} />
            <Route exact path='/edit-product' component={EditProduct } />
            <Route exact path='/product-detail' component={() => {return <GetProducts />}} />
            <Route exact path='/sales-executives' component={() => {return <SalesExecutive />}} />
            <Route exact path='/edit-sales-executives' component={EditSalesExecutive } />
            <Route exact path='/user-stock-return' component={FSEStockReturn } />
            <Route exact path='/user-stock-detail' component={FSEStockDetail } />
            {/*<Route exact path='/file-upload' component={FileUpload} />*/}
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
