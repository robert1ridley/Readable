import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../Actions/categoryActions';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, currentCategory, categories } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="title" color="inherit" className={classes.flex}>
              {currentCategory}
            </Typography>
          </Toolbar>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
            {
              categories &&
                <div>
                  <MenuItem
                    onClick={this.handleClose}
                    component={Link} to="/"
                    style={{outline: 'none'}}
                  >
                    home
                  </MenuItem>
                  {
                    categories.map((category) => 
                      <MenuItem
                        key={category.path}
                        onClick={this.handleClose}
                        component={Link} to={category.path}
                        style={{outline: 'none'}}
                      >
                        {category.name}
                      </MenuItem>
                    )
                  }
                </div>
              }
            </Menu>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentCategory: state.categoryReducer.currentCategory,
  categories: state.categoryReducer.items
});

const wrappedComponent = connect(mapStateToProps)(Header)
export default withStyles(styles)(wrappedComponent);