import React, { Component } from 'react';
import '../App.css';
import Copyrights from './Footer';
import Routes from './Routes';
import TopNavigation from "./TopNavigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      windowWidth: 0,
      currentPage: '',
      sideNavToggled: false,
      breakWidth: 1400
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  toggleSideNav = () => {
    if (this.state.windowWidth < this.state.breakWidth) {
      this.setState({
        sideNavToggled: !this.state.sideNavToggled
      });
    }
  };

  render() {
  /*  const dynamicLeftPadding = {
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? '240px' : '0'
    };*/
    return (
      <div className='app'>
        <div className='flexible-content white-skin'>
          {/*Anciennement: <main style={{ ...dynamicLeftPadding, margin: '8rem 6% 6rem' }}>*/}
          <TopNavigation/>
          <main style={{margin: '8rem 6% 6rem' }}>
            <Routes />
          </main>
          <Copyrights
              //Anciennement: style={{ ...dynamicLeftPadding, position: 'fixed', width: '100%' }}
            style={{position: 'fixed', width: '100%' }}
            className='d-none d-lg-block'
          />
        </div>
      </div>
    );
  }
}

export default App;
