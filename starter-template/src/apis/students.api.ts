import { Student, StudentUpdate, Students } from 'types/students.type'
import http from 'utils/http'

export const getStudents = (page: number | string, limit: number | string) =>
  http.get<Students>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })

export const addStudent = (student: Omit<Student, 'id'>) => http.post<Students>('/students', student)
export const updateStudent = (student: Omit<Student, 'id'>, id: string) =>
  http.patch<Students>(`/students/${id}`, student)

export const getStudentById = (id: string) => {
  return http.get<StudentUpdate>(`/students/${id}`)
}

export const deleteStudent = (id: string) => {
  return http.delete(`students/${id}`)
}
