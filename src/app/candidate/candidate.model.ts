export interface ICandidate {
  _id: number,
  surname: string,
  other:string,
  email: string,
  number: number,
  date: string,
  fac: string,
  lev: string,
  dep: string,
  accessor: Iaccessor[]
}


export interface Iaccessor{
  accessorname: string,
  accesoremail: string,
  university: string,
  status: string
}
