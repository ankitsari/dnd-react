import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash';
import { connect } from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import { fetchComponents, updateComponents } from '../actions/marketsActions';
import '../assets/stylesheets/components/HomePage.css';
import MainContainer from './MainContainer';

const reorderBucket = ({ components, source, destination }) => {
  const current = components.find(x=>x.BucketId === parseInt(source.droppableId, 10));
  const next = components.find(x=>x.BucketId === parseInt(destination.droppableId, 10));
  const target = current.Items[source.index];

  if (source.droppableId === destination.droppableId) {

    const reordered = reorder(
      current.Items,
      source.index,
      destination.index,
    );

    components.map((bucket) => {
      let items = bucket;
      if(bucket.BucketId === parseInt(source.droppableId, 10)) {
        items.Items = reordered
      }
      return items;
    })

    return {
      components: components,
      autoFocusQuoteId: null,
    };

  }

  current.Items.splice(source.index, 1);

  next.Items.splice(destination.index, 0, target);

  components.map((bucket) => {

    let items = bucket;

    if(bucket.BucketId === parseInt(source.droppableId, 10)) {
      items = current
    }

    if(bucket.BucketId === parseInt(destination.droppableId, 10)) {
      items = next
    }

    return items;

  })


  return {
    components: components,
  };
};

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      components: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {

    if (!result.destination) {
      return;
    }

    const res = reorderBucket({
      components: this.state.components,
      source: result.source,
      destination: result.destination,
    });


    let body = []
    if (result.source.droppableId === result.destination.droppableId) {
      let current = res.components.find(x=>x.BucketId === parseInt(result.source.droppableId, 10));
      body = current.Items.map((item, index)=>{
        return {
          ItemId: item.ItemId,
          BucketId: current.BucketId,
          OrderInLane: index + 1,
        }
      })
    } else {
      let current = res.components.find(x=>x.BucketId === parseInt(result.source.droppableId, 10));
      let next = res.components.find(x=>x.BucketId === parseInt(result.destination.droppableId, 10));
      body = current.Items.map((item, index)=>{
        return {
          ItemId: item.ItemId,
          BucketId: current.BucketId,
          OrderInLane: index + 1,
        }
      })
      body = body.concat(next.Items.map((item, index)=>{
        return {
          ItemId: item.ItemId,
          BucketId: next.BucketId,
          OrderInLane: index + 1,
        }
      }))
    }

    updateComponents(body, (response)=> {
      if(response && response.res && response.res.status === 200) {
        this.setState({components: res.components});
      } else {
        console.log(response)
      }
    })

  }

  componentDidMount() {
    this.props.fetchComponents().then(res => {
      let components = _.orderBy(this.props.components, ['OrderInVertical'], ['asc']);
      components.forEach(component=> {
        component.Items = _.orderBy(component.Items, ['OrderInLane'], ['asc'])
      })
      this.setState({ components: components, loading: false });
    });
  }

  render() {
    const {components} = this.state

    const loading = (
      <div style={{ height: '544px' }}>
        <div className="ui active centered loader" />
      </div>
    );

    if (this.state.loading) {
      return loading
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={'main-container'}>
            {
              components.map(bucket => (
                <MainContainer key={bucket.BucketId} bucket={bucket} />
              ))
            }
        </div>
      </DragDropContext>

    );
  }
}

HomePage.propTypes = {
  components: PropTypes.array.isRequired,
  fetchComponents: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    components: state.components
  }
}

export default connect(mapStateToProps, { fetchComponents })(HomePage);