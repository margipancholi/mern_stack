import React from 'react'
import { useQuery, gql } from "@apollo/client";
import NavigationWrapper from './NavigationWrapper';
import { getYear, addDays, format } from 'date-fns'


const GET_Employees = gql`
  query Employees {
    employees {
      firstName
      lastName
      _id
      dateOfBirth
      dateOfJoining
      designation
      employeeType
      currentStatus
    }
  }
`;

const UpcomingRetirement = () => {
  const { loading, error, data } = useQuery(GET_Employees);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log("Data ==>", data);

  const result = data.employees.filter((d) => (getYear(new Date(d.dateOfBirth))) < 1997);
  function df(date) {
    const myDate = addDays(new Date(date), 1)
    return format(new Date(myDate), "dd-MMM-yyyy")
  }

  return (
    <NavigationWrapper>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Upcoming Retirement
          </h1>
        </div>
      </header>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">

            <p className="mt-2 text-sm text-gray-700">
              A list of all the upcoming retirement users
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date of Birth
                      </th>


                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {result.map((person, index) => (
                      <tr key={person._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.firstName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {df(person.dateOfBirth)}
                        </td>



                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationWrapper>

  )

}

export default UpcomingRetirement;