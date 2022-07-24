import './App.css';
import AllProvider from './context/AllProvider';
import Header from './container/Header/Header';
import TableGeneral from './components/Table/TableGeneral';
import Footer from './container/Footer/Footer';

const App = () => {
  return (
    <AllProvider>
      <div className='general'>
        <Header />
        <TableGeneral />
        <Footer />
      </div>
    </AllProvider>
  );
};

export default App;
