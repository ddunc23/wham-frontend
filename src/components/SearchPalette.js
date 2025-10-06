'use client'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { SEARCH_PEOPLE_AND_ORGS } from '@/graphql/queries/search'
import { useRouter } from 'next/navigation'

const people = [
  { id: 1, name: 'Leslie Alexander', url: '#' },
  // More people...
]

export default function SearchPalette(props) {
  
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const router = useRouter()

  useEffect(() => { 
    if (query && query.length > 2) {
        console.log('Searching for:', query)
        
        if (data?.organisations || data?.people) {
            refetch({ searchString: query })
        }
        else {
            loadSearchResults()
        }

        if (data?.organisations || data?.people) {
            setResults([...data?.organisations, ...data?.people] || [])
        }
        else {
            setResults([])
        }
    }
  }, [query])
  
  const [loadSearchResults, {called, loading, data, refetch}] = useLazyQuery(SEARCH_PEOPLE_AND_ORGS, {
    variables: { searchString: query },
    fetchPolicy: 'no-cache'
  });

  return (
    <Dialog
      className="relative z-10"
      open={props.show}
      onClose={() => {
        props.setShow(false)
        setQuery('')
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/25 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl outline-1 outline-black/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:divide-white/10 dark:bg-gray-900 dark:-outline-offset-1 dark:outline-white/10"
        >
          <Combobox
            onChange={(result) => {
              if (result) {
                props.setShow(false)
                setQuery('')
                if (result.__typename == 'Organisation') {
                    router.push(`/data/organisations/${result.documentId}`)
                }
                else if (result.__typename == 'Person') {
                    router.push(`/data/people/${result.documentId}`)
                }
              }
            }}
          >
            <div className="grid grid-cols-1">
              <ComboboxInput
                autoFocus
                className="col-start-1 row-start-1 h-12 w-full pr-4 pl-11 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                placeholder="Search..."
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery('')}
              />
              <MagnifyingGlassIcon
                className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
            </div>

            {results.length > 0 && (
              <ComboboxOptions
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-gray-300"
              >
                {results.map((res) => (
                  <ComboboxOption
                    key={res.uuid}
                    value={res}
                    className="cursor-default px-4 py-2 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:data-focus:bg-indigo-500"
                  >
                    {res.__typename == 'Organisation' ? res.Name : res.FirstName + ', ' + res.Surname}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}

            {query !== '' && data?.organisations?.length === 0 && data?.people?.length === 0 && (
              <p className="p-4 text-sm text-gray-500 dark:text-gray-400">No results.</p>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
