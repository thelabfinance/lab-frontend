<nav className="navbar">
      <div className="navbar-container">
          <Link to="/" className="navbar-logo" style={{'margin' : '0 30px 0 0'}}>
              <Logo><Token src="logo.png" alt='1' width="30px" height="30px" />LOBO</Logo>
          </Link>
          <ul className="nav-menu">
              <li className="nav-item">
                  <Link to="/" className="nav-links">
                      Home
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to="/pools" className="nav-links">
                      Pools
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to="/farms" className="nav-links">
                      Farms
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to="/nests" className="nav-links">
                      Trade
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to="/" className="nav-links">
                      Info
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to="/" className="nav-links price">
                  <Price
                    style={{ marginRight: '8px' }}
                  >
                    <Token src="logo.png" alt='1' width="15px" height="15px"/>
                    <p>{cakePriceUsd.toNumber().toFixed(5).concat("$")}</p></Price>
                  </Link>
              </li>
              <li className="nav-item ">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,8).concat("...")} <p style={{'color': 'green'}}>Connected</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#8299dd !important',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '800',
                    width: '100%',
                    display: 'inline-flex',
                    height: '25px',
                    letterSpacing: '0.03em',
                    padding: '0px 10px'
                  }}>Connect</UnlockButton>
                  }
                  </Link>
              </li>
          </ul>
      </div>
  </nav>