import React from 'react';
import { FormGroup, Checkbox, FormControl } from 'react-bootstrap';

import './PlayerTableFilters.css';

const PlayerTableFilters = ({ filterByName, filterByPosition }) => {
  return (
    <div className="PlayerTableFilters">
      <FormGroup>
        <Checkbox
          inline
          onChange={() => filterByPosition('QB')}
          >
          QB
        </Checkbox>
        <Checkbox
          inline
          onChange={() => filterByPosition('RB')}
        >
          RB
        </Checkbox>
        <Checkbox
          inline
          onChange={() => filterByPosition('WR')}
        >
          WR
        </Checkbox>
        <Checkbox
          inline
          onChange={() => filterByPosition('TE')}
        >
          TE
        </Checkbox>
      </FormGroup>
      <FormControl
        type="text"
        placeholder="Search by Name"
        onChange={(e) => filterByName(e)}
      />
    </div>
  )
}

export default PlayerTableFilters;
