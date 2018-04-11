import React from 'react';
import PropTypes from 'prop-types'
import MarketsList from './MarketsList';
import {Droppable} from 'react-beautiful-dnd';
import '../assets/stylesheets/components/MainContainer.css';

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#6b879e' : '',
  padding: grid,
});

const MainContainer = ({bucket: {BucketId, Items, Description}}) => {
  return (
    <Droppable key={BucketId} direction={'horizontal'} droppableId={String(BucketId)}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          className="markets-list__container">
          <div className="markets-list__title">
            <span>{Description}</span>
          </div>
          <MarketsList markets={Items} />
        </div>
      )}
    </Droppable>
  )
}

MainContainer.propTypes = {
  bucket: PropTypes.shape({
    Items: PropTypes.array,
    Description: PropTypes.string,
    BucketId: PropTypes.number,
  }),
}

MainContainer.defaultProps = {
  bucket: {},
}

export default MainContainer;
