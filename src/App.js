
import React, {useState,useEffect} from 'react'
import Adresar from './components/Adresar'
import poruke from './services/poruke'
import porukeServer from './services/poruke'

const App = (props) => {
    //stanje dodajemo jer ne zelimo vise raditi sa fixnim nizom nego zelimo dodavati u adresar

    const [adresar,postaviAdresar]=useState([])
    //novo stanje za input element
    const [unosImena,postaviIme] = useState("...unesi ime")
    const [unosPrezimena,postaviPrezime] = useState("...unesi prezime")
    const [unosEmaila,postaviEmail] = useState("...unesi e-mail")
    const [unosFilter,postaviUnos3]=useState("")
    let prikaz= unosFilter != "" ? adresar.filter(k=>k.ime.toLowerCase().includes(unosFilter.toLocaleLowerCase())) : adresar
    //kad se desi render stranice dohvati mi podatke sa servera
    useEffect( () => {
        porukeServer
        .dohvatiSve()
        .then((response) => {
        postaviAdresar(response.data)

    })
        


    },[])

    //novi adresar prima event
    const noviAdresar = (e) => {
        e.preventDefault()
        console.log("klik",e.target)
        const noviobjekt={
            ime: unosImena,
            prezime: unosPrezimena,
            email: unosEmaila
        }
       porukeServer
       .stvori(noviobjekt)
        .then( (response) =>{
            console.log(response);
            postaviAdresar(adresar.concat(noviobjekt))
        } )



    }
    const promijenaUnosaImena = (e) => {
        postaviIme(e.target.value)

    }
    const promijenaUnosaPrezimena = (e) => {
        postaviPrezime(e.target.value)
    }
    const promijenaUnosaEmaila = (e) => {
        postaviEmail(e.target.value)
    }
    const promjenaUnosa3 = (e) => {
        postaviUnos3(e.target.value)
    }
    const brisanjePoruke = (id) => {
        porukeServer
        .brisi(id)
        .then(response => {
            console.log(response);
            postaviAdresar(adresar.filter(a => a.id !== id))
            
        })
    }
   const izmjenaPoruke = (id) =>{
       const noviobjekt={
           ime:unosImena,
           prezime:unosPrezimena,
           email:unosEmaila

       }
       console.log(noviobjekt)
       porukeServer
       .osvjezi(id,noviobjekt)
       .then(response => {
           postaviAdresar(
               adresar.map(a=>a.id!==id ? a :response.data)
           )

           
       })
      
       

       
   }
    
    return(
       <div>
           <h1>Adresar-Novo</h1>
           <input type="text" value={unosFilter} onChange={promjenaUnosa3}></input>
          
           <ul>
               {/* svaki element liste mora imati key */}
                {prikaz.map(a => 
                <Adresar key={a.id} adresar={a} brisiporuku={() => brisanjePoruke(a.id)} izmjeniPoruku={() =>izmjenaPoruke(a.id)}/>
                )}
               
                

           </ul>
           <form onSubmit={noviAdresar}>
               <input value={unosImena} onChange={promijenaUnosaImena}/>
               <input value={unosPrezimena} onChange={promijenaUnosaPrezimena}/>
               <input value={unosEmaila} onChange={promijenaUnosaEmaila}/>
               <button type="submit">Spremi</button>

           </form>
       </div>
    )
}
export default App