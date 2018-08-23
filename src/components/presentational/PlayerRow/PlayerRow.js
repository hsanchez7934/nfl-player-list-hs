import React from 'react';
import Proptypes from 'prop-types';

const PlayerRow = ({ player }) => {
  return (
    <tr>
      <td>{player.name}</td>
      <td>{player.position}</td>
      <td>{player.team}</td>
      <td>{player.height}</td>
      <td>{player.weight}</td>
      <td>{player.averagePick}</td>
    </tr>
  )
}

PlayerRow.propTypes = {
  player: Proptypes.object,
}
export default PlayerRow;
