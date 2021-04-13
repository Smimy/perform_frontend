import React from 'react';
import {
    MDBSideNavLink,
    MDBSideNavNav,
    MDBSideNav,
} from 'mdbreact';
import Loading from "./components/Loading";

class SideNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: {},
            loaded: false,
        };
    }

    //render mdbsidenav item
    rSN(to, text) {
        return (
            <MDBSideNavLink
                to={to}
                onClick={() => {
                    this.props.onLinkClick();
                }}
                key={text}
                topLevel
            >
                {text}
            </MDBSideNavLink>
        )
    }

    componentDidMount() {
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        return (
            <div className='white-skin'>
                <MDBSideNav
                    mask='strong'
                    fixed
                    breakWidth={this.props.breakWidth}
                    triggerOpening={this.props.triggerOpening}
                    style={{transition: 'padding-left .3s'}}
                >
                    <li>
                        <div className="logo-wrapper sn-ad-avatar-wrapper">
                            <a href="#!">
                                <img alt="" src="../assets/img/logo/perfomrlogo.png"
                                     className="rounded-circle"/>
                                <span>ArtDeTiha</span>
                            </a>
                        </div>
                    </li>
                    <MDBSideNavNav>
                        <MDBSideNavLink
                            to={""}
                            onClick={() => {
                                this.props.onLinkClick();
                            }}
                            key={1}
                            topLevel
                        >
                            {""}
                        </MDBSideNavLink>
                    </MDBSideNavNav>
                </MDBSideNav>
            </div>
        );
    }
}

export default SideNavigation;
