import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { fetchCategories } from '../Actions/categoryActions';

class Home extends React.Component{
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { classes, categories  } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {
              categories.length !== 0 &&
              <Tab label="Home" component={Link} to="/" />
            }
            {
              categories.length !== 0 &&
              categories.map((category, index) =>
                <Tab label={category.name} key={index + 1} style={{color: 'white'}} component={Link} to={category.path} />
              )
            }
          </Tabs>
        </AppBar>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

const mapStateToProps = state => ({
  categories: state.categoryReducer.items,
  loading: state.categoryReducer.loading,
  error: state.categoryReducer.error
});

const styledComponent = withStyles(styles)(Home);
export default connect(mapStateToProps)(styledComponent);