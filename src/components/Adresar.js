import React from 'react'


const Adresar = ({adresar,brisiporuku,izmjeniPoruku}) => {
  return(
  <li>
    {adresar.ime}  {adresar.prezime}  {adresar.email}
    <button onClick={brisiporuku}>Brisi</button>
    <button onClick={izmjeniPoruku}>Izmjena</button>

  </li>
  )
}
export default Adresar

