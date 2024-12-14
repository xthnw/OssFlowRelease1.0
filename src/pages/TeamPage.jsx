import { PeopleList } from '../components/cases/PeopleList';
import { TEAMS_DATA } from '../data/teamData';
import { useState } from 'react';

export const TeamPage = () => {
    const [teamsData, setTeamsData] = useState(TEAMS_DATA);
    return (
        <PeopleList teamsData={teamsData} setTeamsData={setTeamsData} />
    );
}