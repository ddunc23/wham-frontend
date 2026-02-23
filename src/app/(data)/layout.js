'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
  UserIcon,
  BuildingLibraryIcon,
  MapIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import SearchPalette from '@/components/SearchPalette';
import PageList from '@/components/PageList';
// import Page from '../page'

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL }),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
  cache: new InMemoryCache(),
});


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: pathname === '/' ? true : false },
    { name: 'People', href: '/people', icon: UserIcon, current: pathname === '/people' ? true : false },
    { name: 'Institutions', href: '/organisations', icon: BuildingLibraryIcon, current: pathname === '/organisations' ? true : false },
    { name: 'Map', href: '/map', icon: MapIcon, current: pathname === '/map' ? true : false },
    // { name: 'Network', href: '/data/network', icon: UserGroupIcon, current: pathname === '/data/network' ? true : false },
  ]

  return (
    
    <>
      <ApolloProvider client={client}>
      <div className='h-full'>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                        Settings
                      </a>
                    </li>
                  </ul>
                  <PageList />
                </nav>
                
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex flex-col shrink-0 bg-gray-800 rounded-sm -mx-2 mt-4 p-2">
              <h1 className='text-white font-semibold text-sm/6'>Women Curators in Britain</h1>
              <h2 className="text-gray-400 text-sm">Careeer Trajectories in a Shifting Educational Landscape</h2>
            </div>
            <div className="flex h-16 shrink-0 items-center">
              
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <PageList />
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72 h-full">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
                  onClick={() => setShowSearch(true)}
                  onChange={(e) => {
                    setShowSearch(true);
                    e.target.value = '';
                  }}
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                />
              </form>
            </div>
          </div>
          {/* bg-[url('/img/europeana-Agwv1mKDUnc-unsplash.jpg')] bg-cover */}
          <main className="h-full">
              <div className="px-4 sm:px-6 lg:px-8 h-full bg-stone-50 bg-cover">
                {children}
              </div>
              <SearchPalette show={showSearch} setShow={setShowSearch} />
          </main>
        </div>
      </div>
      </ApolloProvider>
    </>
  )
}
