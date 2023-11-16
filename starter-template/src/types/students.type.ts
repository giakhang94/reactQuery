export interface Student {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  country: string
  avatar: string
  btc_address: string
}

//tạo kiểu cho list students, chỉ lấy ra những field có sẵn từ data
//có sẵn interface Student rồi thì xài Pick để chọn ra các cái cần thiết
export type Students = Pick<Student, 'id' | 'email' | 'avatar' | 'last_name'>[]

export type StudentUpdate = Omit<Student, 'id'>
