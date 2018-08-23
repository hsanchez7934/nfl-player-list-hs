import React, { Component } from 'react';

import { fetchPlayers, fetchADP } from './apiCalls';

import PlayerTable from '../../presentational/PlayerTable';
import PlayerTableFilters from '../../presentational/PlayerTableFilters';

class PlayerTableContainer extends Component {
  state = {
    players: [],
    byAveragePick: false,
    byWeight: false,
    byHeight: false,
    byName: false,
    filteredPlayers: [],
    isChecked: false
  }

  componentDidMount = async () => {
    const players = await fetchPlayers();
    const adpData = await fetchADP();
    const parsedPlayerData = this.cleanData(players, adpData);
    this.setState({ players: parsedPlayerData });
  }

  cleanData = (array1, array2) => (
    array1.map(player => {
      const average_pick = array2.reduce((acc, item) => {
        if (player.id === item.id) {
          acc['averagePick'] = item.averagePick;
        }
        return acc;
      }, {});
      return {
        ...player,
        name: player.name.split(", ").reverse().join(" "),
        averagePick: average_pick.averagePick || 400
      };
    })
  )

  sortPlayerList = (query1, query2) => {
    const { players } = this.state;
    let sorted;

    if (query2 === 'byName') {
      sorted = players.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    sorted = players.sort((a, b) => {
      return a[query1] - b[query1];
    });

    if (this.state[query2] === false) {
      this.setState({
        players: sorted,
        [query2]: !this.state[query2]
      });
    } else if (this.state[query2] === true) {
      this.setState({
        players: sorted.reverse(),
        [query2]: !this.state[query2]
      });
    }
  }

  filterByName = e => {
    const query = e.target.value;
    let filteredList = this.state.players;
    filteredList = filteredList.filter(item => {
      return item.name.toLowerCase().search(query.toLowerCase()) !== -1;
    })
    this.setState({ filteredPlayers: filteredList });
  }

  filterByPosition = query => {
    const { players, isChecked } = this.state;
    const filteredPlayers = players.filter(item => {
      return item.position === query;
    })
    if (isChecked === false) {
      this.setState({ filteredPlayers, isChecked: !isChecked });
    } else if (isChecked === true) {
      this.setState({ filteredPlayers: [], isChecked: !isChecked });
    }
  }

  render() {
    const { players, filteredPlayers } = this.state;
    if (filteredPlayers.length && filteredPlayers.length !== players.length) {
      return (
        <div>
          <PlayerTableFilters
            filterByName={this.filterByName}
            filterByPosition={this.filterByPosition}
            qb={this.state.qb}
          />
          <PlayerTable
            players={filteredPlayers}
            sortPlayerList={this.sortPlayerList}
          />
        </div>
      )
    }
    return (
      <div>
        <PlayerTableFilters
          filterByName={this.filterByName}
          filterByPosition={this.filterByPosition}
        />
        <PlayerTable
          players={players}
          sortPlayerList={this.sortPlayerList}
        />
      </div>
    );
  }
}

export default PlayerTableContainer;
