import React from "react";
import styled from "styled-components";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 42px;
  width: 42px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border-radius: 11px;
  transition: box-shadow .05s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 0px 4px #767676;
  }
`;

const team = ({ id, letter }) => <TeamListItem key={`team-${id}`}>{letter}</TeamListItem>;

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
  </TeamWrapper>
);
