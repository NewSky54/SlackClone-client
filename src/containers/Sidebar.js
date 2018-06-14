import React from "react";
import decode from "jwt-decode";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";

export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false
  };

  handleChannelClick = () => {
    this.setState(state => ({
      openAddChannelModal: !state.openAddChannelModal
    }));
  };

  render() {
    const { teams, team } = this.props;

    let username = "";
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      ({ username } = user.username);
    } catch (error) {}

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        teamId={team.id}
        username={username}
        channels={team.channels}
        users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        openChannel={this.handleChannelClick}
      />,
      <AddChannelModal
        teamId={team.id}
        openChannel={this.state.openAddChannelModal}
        closeChannel={this.handleChannelClick}
        key="add-side-bar-modal"
      />
    ];
  }
}
