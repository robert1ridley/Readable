import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { 
  sortPostsByNewest,
  sortPostsByOldest,
  sortPostsByMostLikes,
  sortPostsByFewestLikes
} from '../Actions/postsActions';

const filterArrayText = ["Newest Posts", "Oldest Posts", "Most Likes", "Fewest Likes"]

class SortButtons extends React.Component {
  state = {
    activeIndex: 0
  }

  handleFilterChange(index, text) {
    this.setState({
      activeIndex: index
    })
    switch (text){
      case 'Oldest Posts':
        this.props.dispatch(sortPostsByOldest());
        return
      case 'Newest Posts':
        this.props.dispatch(sortPostsByNewest());
        return
      case 'Most Likes':
        this.props.dispatch(sortPostsByMostLikes());
        return
      case 'Fewest Likes':
        this.props.dispatch(sortPostsByFewestLikes());
        return
      default:
        return
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {
          filterArrayText.map((text, index) => 
          <Button 
            className={classes.button}
            key={index}
            color={this.state.activeIndex === index ? "primary" : "default"}
            onClick={() => this.handleFilterChange(index, text)}
          >
            {text}
          </Button>
          )
        }
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const mapStateToProps = state => ({
  categories: state.categoryReducer.items,
  loading: state.categoryReducer.loading,
  error: state.categoryReducer.error
});

const wrappedComponent = withStyles(styles)(SortButtons)
export default connect(mapStateToProps)(wrappedComponent);