type UUID = string
type Gender = 'female' | 'male'

export interface ResponseInfo {
  page: number
  results: number
}

// simple user type
export interface UserDTO {
  gender: Gender
  name: {
    title: 'Miss' | 'Mr' | 'Mrs'
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: string
    coordinates: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  login: {
    uuid: UUID
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
  dob: {
    date: string
    age: number
  }
  registered: {
    date: string
    age: number
  }
  phone: string
  cell: string
  id: {
    name: string
    value: string
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

type UserInclude =
  | 'gender'
  | 'name'
  | 'nat'
  | 'login'
  | 'location'
  | 'email'
  | 'registered'
  | 'dob'
  | 'phone'
  | 'cell'
  | 'id'
  | 'picture'

export interface UsersListRequestParams {
  results?: number
  page?: number
  inc?: UserInclude | UserInclude[] | string
}

export interface UsersListResponse {
  results: UserDTO[]
  info: ResponseInfo
}

export interface UserService {
  getUsers(params: UsersListRequestParams): Promise<UsersListResponse>
}
