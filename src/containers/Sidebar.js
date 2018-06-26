import React from "react";
import decode from "jwt-decode";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";

export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  };

  handleChannelClick = e => {
    if (e) e.preventDefault();
    this.setState(state => ({ openAddChannelModal: !state.openAddChannelModal }));
  };

  handleInvitePeopleClick = e => {
    if (e) e.preventDefault();
    this.setState(state => ({ openInvitePeopleModal: !state.openInvitePeopleModal }));
  };

  render() {
    const { teams, team } = this.props;
    const { openAddChannelModal, openInvitePeopleModal } = this.state;

    let username = "";
    let isOwner = false;
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      ({ username } = user.username);
      isOwner = user.id === team.owner;
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
        onInvitePeopleClick={this.handleInvitePeopleClick}
        isOwner={isOwner}
      />,
      <AddChannelModal
        teamId={team.id}
        openChannel={openAddChannelModal}
        closeChannel={this.handleChannelClick}
        key="add-side-bar-modal"
      />,
      <InvitePeopleModal
        teamId={team.id}
        openChannel={openInvitePeopleModal}
        closeChannel={this.handleInvitePeopleClick}
        key="invite-people-modal"
      />
    ];
  }
}
