'use client'
import CheckBoxGroup from "./CheckBoxGroup";
import { useState, useEffect } from "react";


export default function FilterSideBar(props) {

    const [genders, setGenders] = useState([
        { id: 1, name: 'male', selected: true },
        { id: 2, name: 'female', selected: true },
    ])

    const [membershipTypes, setMembershipTypes] = useState([
        { id: 1, name: 'Institutional Member', selected: true },
        { id: 2, name: 'Individual Member', selected: true },
        { id: 3, name: 'Honorary Member', selected: true },
        { id: 4, name: 'Lifetime Member', selected: true },
    ])

    const [listYears, setListYears] = useState([
        { id: 1, name: '1935', selected: true },
        { id: 2, name: '1945', selected: true },
    ])

    useEffect(() => {
        if (props.setMapFilter) {
            const genderFilters = ['in', ['get', 'gender'], ['literal', genders.filter(g => g.selected).map(g => g.name)] || []];
            const membershipTypeFilters = ['in', ['get', 'membershipType'], ['literal', membershipTypes.filter(m => m.selected).map(m => m.name)] || ''];
            const listYearFilters = ['in', ['get', 'listYear'], ['literal', listYears.filter(l => l.selected).map(l => l.name)] || ''];
            props.setMapFilter(['all', membershipTypeFilters, genderFilters, listYearFilters]);
        }
    }, [genders, membershipTypes, listYears])


    return (
        <div className="overflow-auto rounded-tr-sm rounded-br-sm bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 h-full -ml-4 border-l border-gray-300">
            <div className="px-4 py-5 sm:p-6">
                <CheckBoxGroup items={genders} setItems={setGenders} title="Genders" />
                <br />
                <CheckBoxGroup items={membershipTypes} setItems={setMembershipTypes} title="Membership Types" />
                <br />
                <CheckBoxGroup items={listYears} setItems={setListYears} title="List Years" />
            </div>
        </div>
    )
}