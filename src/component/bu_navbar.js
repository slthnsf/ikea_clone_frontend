const NavbarComp = (props) => {
    let [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    
    return (
        <div className="container-fluid">
            <div>
                <ul type="none" className="d-flex m-2" style={{justifyContent: 'space-between', color: 'blue'}}>
                    <li>Indonesia</li>
                    <li><Link className="nav-link active" to="">Bahasa</Link></li>
                    <li><Link className="nav-link active" to="">Informasi Toko</Link></li>
                    <li><Link className="nav-link active" to="">Kebijakan Pengembalian</Link></li>
                    <li><Link className="nav-link active" to="">IKEA Bisnis</Link></li>
                    <li><Link className="nav-link active" to="">Katalog dan Brosur</Link></li>
                    <li><Link className="nav-link active" to="">Program Perencanaan</Link></li>
                    <li><Link className="nav-link active" to="/login">Masuk atau Daftar </Link></li>
                </ul>
            </div>
            <Navbar expand="md" style={{ backgroundColor: '#FFFFFF' }}>
                <NavbarBrand><img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg"
                    width="100px" /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/produk/" style={{color: 'gray', fontWeight: 'bold'}}>Products</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={{color: 'gray', fontWeight: 'bold'}}>
                                Category
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <InputGroup size="sm" style={{ width: '20%' }}>
                        <Input placeholder="search" />
                        <InputGroupAddon addonType="append">
                            <span className="btn btn-outline-secondary material-icons">
                                search
                            </span>
                        </InputGroupAddon>
                    </InputGroup>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComp