/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react"
import { useQuery, gql } from "@apollo/client";
import NavigationWrapper from "./NavigationWrapper";
import { Link } from "react-router-dom";
import { format, addDays } from 'date-fns'
import DeleteModal from "./deleteModal";


const GET_Employees = gql`
  query Employees {
    employees {
      firstName
      lastName
      _id
      dateOfBirth
      designation
      employeeType
      currentStatus
    }
  }
`;


function df(date) {
  const myDate = addDays(new Date(date), 1)
  return format(new Date(myDate), "dd-MMM-yyyy")
}

const deleteEmployee = (id) => {
  const requestBody = {
    query: `
        mutation {
          deleteEmployee(id:"${id}") {
            _id           
          }
        }
      `,
  };

  fetch("http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      if (res.status === 200) {
        console.log("Deleted")
      }

      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [personData, setpersonData] = useState("");
  const { loading, error, data } = useQuery(GET_Employees);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log("Data ==>", data);


  return (
    <NavigationWrapper>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Home
          </h1>
        </div>
      </header>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">

            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to={"/adduser"}>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add user
              </button>
            </Link>
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
                        Designation
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        EmployeeType
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Current Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date of Birth
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >

                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.employees.map((person, index) => (
                      <tr key={person._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.firstName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.designation}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.employeeType}
                        </td>
                        <td className=" whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500">
                          {person.currentStatus}
                        </td>
                        <td className=" whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500">
                          {/* {new Date(person.dateOfBirth).getDate()+1} */}
                          {df(person.dateOfBirth)}
                        </td>
                        <td className=" whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500">
                          <button onClick={() => {
                            setpersonData(person)
                            setOpen(!open)
                          }} className="outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <DeleteModal openDelete={open} setOpenDelete={setOpen} person={personData} deleteFn={deleteEmployee} />
      </div>
    </NavigationWrapper>
  );
}
