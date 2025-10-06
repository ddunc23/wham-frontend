'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { useQuery } from "@apollo/client/react";
import Error from './Error';
import Loading from './Loading';
import { GET_ALL_ORGANISATIONS } from '@/graphql/queries/organisations';


export default function Example() {
  const [query, setQuery] = useState('')
  const [selectedOrganisation, setSelectedOrganisation] = useState(null)
  const [allSelectedOrganisations, setAllSelectedOrganisations] = useState([])

  // Fetch all organisations - ideally this would be paginated
  // but for now we will just fetch all and filter client-side
  // as there are only ~300 organisations in the dataset

  const { loading, error, data } = useQuery(GET_ALL_ORGANISATIONS, {
    variables: { page: 1, pageSize: 300, sort: "Name:asc" },
  });

  if (error) return <Error />;

  if (loading) return <Loading />;

  const orgs = data?.organisations_connection?.nodes.map(o => ({ id: o.documentId, name: o.Name })) || [];

  const filteredOrgs =
    query === ''
      ? orgs
      : orgs.filter((org) => {
          return org.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <>
    <Combobox
      as="div"
      value={selectedOrganisation}
      onChange={(org) => {
        setQuery('')
        setSelectedOrganisation(org)
        const ids = allSelectedOrganisations.map(o => o.id)
        if (!ids.includes(org.id)) {
            setAllSelectedOrganisations([...allSelectedOrganisations, org.name ? org : null].filter(o => o)) // filter out nulls
        }
      }}
    >
      <Label className="block text-sm/6 font-medium text-gray-900 dark:text-white">Organisation</Label>
      <div className="relative mt-2">
        <ComboboxInput
          className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-gray-700 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={(org) => org?.name}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
          <ChevronDownIcon className="size-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
        >
          {query.length > 0 && (
            <ComboboxOption
              value={{ id: null, name: query }}
              className="cursor-default px-3 py-2 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-indigo-500"
            >
              {query}
            </ComboboxOption>
          )}
          {filteredOrgs.map((org) => (
            <ComboboxOption
              key={org.id}
              value={org}
              className="cursor-default px-3 py-2 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-indigo-500"
            >
              <span className="block truncate">{org.name}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
    <ul>{allSelectedOrganisations.length ? allSelectedOrganisations.map((org, i) => <li key={i}>{org?.name}</li>) : null} </ul>
    </>
  )
}
