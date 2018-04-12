import React from 'react';
import PropTypes from 'prop-types'
import {Draggable} from 'react-beautiful-dnd';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash'
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => {

  let style = {
    padding: grid * 2,
    margin: `0 16px 0 0`,
    background: isDragging ? 'lightgreen' : '',
  }

  _.assign(style, draggableStyle)

  return style
};

const MarketCard = ({bucketItem: {ItemTitle, Description, ItemId, Priority, MockUpLink}, index}) => {
  return (
    <Draggable key={ItemId} draggableId={ItemId} index={index}>
      {(provided2, snapshot2) => (
        <div>
            <div
                 ref={provided2.innerRef}
                 {...provided2.draggableProps}
                 {...provided2.dragHandleProps}
                 style={getItemStyle(
                   snapshot2.isDragging,
                   provided2.draggableProps.style
                 )}
                 className="ui card"
                 data-event='click'
                 data-event-off="mouseout"
                 data-tip
                 data-for={`t${ItemId}`}
            >
              <ReactTooltip class='toolTipClass' id={`t${ItemId}`} scrollHide={true} delayHide={100} effect='solid'>
                <div className="ui card">
                  <div className="card-block">
                    <h4 className="card-title">{ItemTitle}</h4>
                    <p className="card-text">{Description}</p>
                    <p className="card-text">{Priority}</p>
                    <p className="card-text">{MockUpLink}</p>
                  </div>
                </div>
              </ReactTooltip>
              <div className="card-block block">
                <h4 className="card-title">{ItemTitle}</h4>
                <p className="card-text">{Description}</p>
              </div>
            </div>
          {provided2.placeholder}
        </div>
      )}
    </Draggable>
  )
}

MarketCard.propTypes = {
  bucketItem: PropTypes.shape({
    ItemTitle: PropTypes.string,
    Description: PropTypes.string,
    ItemId: PropTypes.number,
  }),
  index: PropTypes.number,
}

MarketCard.defaultProps = {
  bucketItem: {}
}

export default MarketCard
