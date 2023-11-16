import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteStudent, getStudents } from 'apis/students.api'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQueryString } from 'utils/utils'
export default function Students() {
  const queryClient = useQueryClient()
  const queryString = useQueryString()
  console.log('queryString', queryString)
  const page = Number(queryString.page || 1)
  const limit = Number(queryString.limit || 9)
  const studentQuery = {
    queryKey: ['students', page],
    queryFn: async () => {
      const data = await getStudents(page, limit)
      return data //return cai gi thi useQuery().data chua cai do
    },
    placeholderData: keepPreviousData
    // staleTime: 5 * 1000 * 60,
    // catchTime: 5 * 1000
  }
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteStudent(id ? id : 'tao')
        queryClient.invalidateQueries({ queryKey: ['students', page] })
      } catch (error) {
        console.log(error)
      }
    }
  })
  const handleDelete = (id: string) => {
    mutation.mutate(id)
  }

  //pagination setup

  const { isLoading, data, isFetching } = useQuery(studentQuery)
  //test isFetching

  const totalStudents = Number(data?.headers['x-total-count'] || 0)
  const totalPages = Math.ceil(totalStudents / limit)
  const arrayNumber = Array(totalPages)
    .fill(0)
    .map((_, index) => index + 1)

  if (isLoading)
    return (
      <div role='status' className='mt-6 animate-pulse'>
        <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <span className='sr-only'>Loading...</span>
      </div>
    )
  return (
    <div>
      <h1 className='my-6 text-lg'>Students</h1>
      <Link
        to={`/students/add`}
        type='button'
        className='me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Add Student
      </Link>
      <h1 className='text-lg'>Students</h1>
      <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                #
              </th>
              <th scope='col' className='py-3 px-6'>
                Avatar
              </th>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Email
              </th>
              <th scope='col' className='py-3 px-6'>
                <span className='sr-only'>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.data.map((student: any) => {
                return (
                  <tr
                    key={student.id}
                    className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                  >
                    <td className='py-4 px-6'>{student.id}</td>
                    <td className='py-4 px-6'>
                      <img src={student.avatar} alt='student' className='h-5 w-5' />
                    </td>
                    <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                      {student.last_name}
                    </th>
                    <td className='py-4 px-6'>{student.email}</td>
                    <td className='py-4 px-6 text-right'>
                      <Link
                        to={`/students/${student.id}`}
                        className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                      >
                        Edit
                      </Link>
                      <button
                        className='font-medium text-red-600 dark:text-red-500'
                        onClick={() => {
                          handleDelete(student.id)
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              <Link
                to={`/students?page=${page === 1 ? totalPages : page - 1}`}
                className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Previous
              </Link>
            </li>
            {arrayNumber.map((item) => {
              return (
                <li key={item + 'pagination'}>
                  <Link
                    className={`border border-gray-300 bg-white bg-white py-2 px-3 leading-tight text-gray-500 text-gray-500  hover:bg-gray-100 hover:bg-gray-100 hover:text-gray-700 hover:text-gray-700 ${
                      item === page ? 'bg-gray-500 text-gray-700' : ''
                    }`}
                    to={`/students?page=${item}`}
                  >
                    {item}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                to={`/students?page=${page === totalPages ? 1 : page + 1}`}
                className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
