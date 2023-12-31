import './App.css';
import React from 'react';
import ModalCreate from './component/ModalCreate';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang : 0,
      persentaseUang : 0,
      pemasukan: 0,
      pengeluaran: 0, 
      transaksiIN: 0,
      transaksiOUT: 0,
      summary: [
        // {
        //   deskripsi : 'Menerima Uang Saku',
        //   tanggal : '1 September 2023',
        //   nominal : 1000000,
        //   category : 'IN'
        // },
        // {
        //   deskripsi : 'Menerima Uang Saku 2',
        //   tanggal : '10 September 2023',
        //   nominal : 1000000,
        //   category : 'IN'
        // },
        // {
        //   deskripsi : 'Makan Siang',
        //   tanggal : '2 September 2023',
        //   nominal : 10000,
        //   category : 'OUT'
        // }
      ] 
    }

    this.tambahItem = this.tambahItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }

  tambahItem(objek){
    let newData = [...this.state.summary, objek]
    let datalUangIN = newData.filter( (item) => item.category === 'IN' );
    let nominalUang = datalUangIN.map((item) => item.nominal );
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num, 0 )

    let datalUangOUT = newData.filter( (item) => item.category === 'OUT' );
    let nominalUangOUT = datalUangOUT.map((item) => item.nominal );
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0 )
    console.log(jumlahUangOUT)

    this.setState({
      pemasukan : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaran : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100,
      summary : newData
    })
    
  }

  fnHitung() {
    let datalUangIN = this.state.summary.filter( (item) => item.category === 'IN' );
    let nominalUang = datalUangIN.map((item) => item.nominal );
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num )

    let datalUangOUT = this.state.summary.filter( (item) => item.category === 'OUT' );
    let nominalUangOUT = datalUangOUT.map((item) => item.nominal );
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num )
    console.log(jumlahUangOUT)
    
    this.setState({
      pemasukan : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaran : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100
    })
  }

  componentDidMount() {
    if(this.state.summary.length < 1 ) {
      console.log('ok')
    } else {
      this.fnHitung()
    }
  }

  render() {
    return (
      <>
        <div className = 'container py-5 '>
          <div className = 'row'>
            <div className = 'col-12 text-center'>
              <h1 className='fw-bold'>CELENGAN APP</h1>
              <hr className='w-75 mx-auto' />
              <h4 className='fw-bold'>Rp. {this.state.sisaUang},-</h4>
              <span className='title-md'>Sisa uang kamu tersisa {this.state.persentaseUang}% lagi</span>
            </div>
          </div>
        

        <div className ='row mt-4'>
          <div className='col-6'>
            <div className='card-wrapper p-4'>
              <div className='icon-wrapper mb-1'>
                <i className="bi bi-wallet2"></i>
              </div>
              <span className='title-sm'>Pemasukan</span>
              <h3 className='fw-bold'>Rp. {this.state.pemasukan},-</h3>
              <div>
                <span className='title-sm text-ungu fw-bold'>{this.state.transaksiIN}</span><span className='title-sm'> Transaksi</span></div>
            </div>
          </div>
          <div className='col-6'>
            <div className='card-wrapper p-4'>
              <div className='icon-wrapper mb-1'>
                <i className="bi bi-cash-stack"></i>
              </div>
              <span className='title-sm'>Pengeluaran</span>
              <h3 className='fw-bold'>Rp. {this.state.pengeluaran},-</h3>
              <div>
                <span className='title-sm text-ungu fw-bold'>{this.state.transaksiOUT}</span><span className='title-sm'> Transaksi</span></div>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-12 d-flex justify-content-between align-items-center'>
            <h4> Ringkasan Transaksi</h4>
            <div className='wrapper-button d-flex'>
              <ModalCreate action={this.tambahItem} category= "IN" variant= "button btn-ungu px-4 py-2 me-3" text="pemasukan" icon="bi bi-plus-square-fill" modalHeading="Tambahkan Pemasukan"/>
              <ModalCreate action={this.tambahItem} category= "OUT" variant= "button btn-pink px-4 py-2" text="Pengeluaran" icon="bi bi-dash-square-fill" modalHeading="Tambahkan Pengeluaran"/>
            </div>
          </div>
        </div>

        <div className='row mt-4'>
          {this.state.summary.length < 1 && <Alert/>}
          {this.state.summary.map((sum, index) => {
          return (
              <div key={index} className='mb-3 col-12 d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <div className={sum.category === 'IN' ? 'icon-wrapper-IN' : 'icon-wrapper-OUT'}>
                    <i className={sum.category === 'IN' ? 'bi bi-wallet2' : 'bi bi-bag-dash-fill'}></i>
                </div>
                <div className='transaksi ms-3 d-flex flex-column'>
                    <h6>{sum.deskripsi}</h6>
                    <span className='title-sm'> {sum.tanggal}</span>
                </div>
              </div>
              <h5 className= {sum.category === 'IN' ? 'text-money-in' : 'text-money-out'}> Rp. {sum.nominal}</h5>
            </div>
          )
        })
        }
        </div>

      </div>
      </>
    );
  }
}


class Alert extends React.Component {

  constructor() {
    super()
  }


  render() {
    return (
      <h1>Data kosong</h1> )
  }
}


export default App;
