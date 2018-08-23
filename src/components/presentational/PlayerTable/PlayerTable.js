import React from 'react';
import { Table } from 'react-bootstrap';
import Proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlayerRow from '../PlayerRow';

const PlayerTable = ({ players, sortPlayerList }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>
            Name
            <FontAwesomeIcon
              icon="sort"
              onClick={() => sortPlayerList('name', 'byName')}
            />
          </th>
          <th>Position</th>
          <th>Team</th>
          <th>
            Height
            <FontAwesomeIcon
              icon="sort"
              onClick={() => sortPlayerList('height', 'byHeight')}
            />
          </th>
          <th>
            Weight
            <FontAwesomeIcon
              icon="sort"
              onClick={() => sortPlayerList('weight', 'byWeight')}
            />
          </th>
          <th>
            Average Pick
            <FontAwesomeIcon
              icon="sort"
              onClick={() => sortPlayerList('averagePick', 'byAveragePick')}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {players.map(player => <PlayerRow player={player} key={player.id} />)}
      </tbody>
    </Table>
  );
}

PlayerTable.propTypes = {
  players: Proptypes.array,
}

export default PlayerTable;
