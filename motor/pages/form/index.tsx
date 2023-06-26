import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

 
 const koneksiStock_motor = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/stock_motor" 
})

export default function FormStock_motor() {
    const [stateidmotor, setIdmotor] = useState("");
    const [statemerek, setMerek] = useState("");
    const [statetahun, setTahun] = useState("");
    const [stateprodusen, setProdusen] = useState("");
    const [statefoto, setFoto] = useState("");
    const [stateharga, setHarga] = useState("");
    const [stock_motor, setStock_motor] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");
    
  
  const handleSubmitAdd = (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiStock_motor
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.idmotor.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    idmotor: event.target.idmotor.value,
    merek: event.target.merek.value,
    tahun: event.target.tahun.value,
    produsen: event.target.produsen.value,
    harga: event.target.harga.value

}
  alert(formData);
  koneksiStock_motor
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setIdmotor("");
    setMerek("");
    setTahun("");
    setProdusen("");
    setHarga("");
    setFoto("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var idmotor = event.target.value;
            koneksiStock_motor.delete(`/${idmotor}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                window.location.reload();

                setStock_motor(
                  stock_motor.filter((stock_motor) => {
                     return stock_motor.idmotor !== idmotor;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var idmotor = event.target.value;
            
               const smtrEdit = stock_motor.filter((stock_motor) => {
                     return stock_motor.idmotor == idmotor;
                  });
                  if(smtrEdit!=null){

                    setIdmotor(smtrEdit[0].idmotor);
                    setMerek(smtrEdit[0].merek);
                    setTahun(smtrEdit[0].tahun);
                    setProdusen(smtrEdit[0].produsen);
                    setHarga(smtrEdit[0].harga)
                    setFoto(smtrEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("hide");
                    setEdit("show");

                  }
          }
  useEffect(() => {
      async function getStock_motor() {
        const response = await koneksiStock_motor.get("/").then(function (axiosResponse) {
            setStock_motor(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from stock_motor in api stock_motor: '+error);
         });;
          }
      getStock_motor();
    }, []);
  
   
if(stock_motor==null){
return(
  <center><div>
    waiting...
  </div></center>
)
}else{

  return (
   <center><div>
    <br></br><h1>STOCK MOTOR</h1><br></br>
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
       <br/><h3>TAMBAH STOCK MOTOR</h3><br/>
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> ID Motor:</label></td>
            <td><input type="text" id="idmotor" name="idmotor"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> Merek:</label></td>
            <td><input type="text" id="merek"   name="merek" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Produsen:</label></td>
            <td><input type="text" id="produsen"   name="produsen" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="images"/>  </td>
        </tr>
        <tr>
            <td>  <label> Tahun:</label></td>
            <td><input type="number" id="tahun" name="tahun"
            />
     </td>
        </tr>
        <tr>
            <td>  <label> Harga:</label></td>
            <td><input type="text" id="harga"   name="harga" 
               /></td>
        </tr>
            </tbody>
          </table>
          <br/>
          <input type="submit"/> | <input type="button" value="Cancel" onClick={handleCancelAdd} /><br/><br/>
          </form>  

      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
      <br/><h3>EDIT STOCK MOTOR</h3><br/>
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> ID Motor:</label></td>
            <td><input type="text" id="idmotor"  value={stateidmotor} name="idmotor"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Merek:</label></td>
            <td><input type="text" id="merek"  value={statemerek} name="merek"
               onChange={(e) => setMerek(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Produsen:</label></td>
            <td><input type="text" id="produsen"  value={stateprodusen} name="produsen"
               onChange={(e) => setProdusen(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
        <tr>
            <td>  <label> Tahun:</label></td>
            <td><input type="number" id="tahun" name="tahun"
            />
     </td>
        </tr>
        <tr>
            <td>  <label> Harga:</label></td>
            <td><input type="text" id="harga"  value={stateharga} name="harga"
               onChange={(e) => setHarga(e.target.value)}
               /></td>
        </tr>
        
            </tbody>
          </table>
          <br/><input type="submit" /> | <input type="button" value="Cancel" onClick={handleCancelEdit} /><br/><br/>
          </form>  
          <br></br>
        <button id="btnadd" onClick={handleAdd} className={statebutonadd} style={{backgroundColor: "#13e047", borderWidth: "0.5px", padding: "5px", borderSpacing: "0", borderRadius: "3px"}}>
          Tambah Data</button>
          <a href="/" className="custom-button">Kembali</a>
        <br></br><br></br>
            Tabel Stock Motor ANVER GARAGE
        <table border={2}>
            <thead>
                <tr style={{textAlign:"center"}}>
                <td>ID Motor</td> 
                <td>Merek</td>
                <td>Produsen</td>
                <td>Tahun</td>
                <td>Harga</td>
                <td>Foto</td>
                <td colSpan={2}><center>Action</center></td>
                </tr>
            </thead>
            <tbody>
            {stock_motor.map((smtr) => 
                <tr style={{textAlign:"center"}}>
                    <td>{smtr.idmotor}</td>
                    <td>{smtr.merek}</td>
                    <td>{smtr.produsen}</td>
                    <td>{smtr.tahun}</td>
                    <td>{smtr.harga}</td>
                    <td><img src={smtr.foto} width="80"/></td>
                   <td><button className="cedit" onClick={handleEdit} value={smtr.idmotor}>Edit</button> | <button className="chapus" onClick={handleDelete} value={smtr.idmotor}> Delete</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
          <br></br>
          <br></br><br></br>
         
          </div></center>
        )
}
  
  }