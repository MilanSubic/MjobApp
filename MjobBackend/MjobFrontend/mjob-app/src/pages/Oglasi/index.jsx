import React, {useState, useEffect} from "react";

import oglasiService from "../../services/oglasi.service";
import {StyledHeader} from "../../components/BasicStyledComponents";
import {Row} from "antd";
import AdComponent from "./components/Ad";


const Index = () => {
    const [oglasi, setOglasi] = useState([]);
/*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://http://localhost:8080/oglasi');
                setOglasi(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

 */

     useEffect(() => {
         oglasiService.getAll().then((res) => setOglasi(res.data)).catch(error => {
             console.error('Error fetching data:', error);});

     }, []);


/*

    useEffect(() => {
        axios.get('http://localhost:8080/oglasi').then((res) => setOglasi(res.data)).catch(error => {
            console.error('Error fetching data:', error);});

    }, []);


 */

/*
    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8080/oglasi', {mode: 'no-cors'})
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setOglasi(data);
                })
            //.catch(err => {
            //    console.log(err.message);
            // });
        }, 1000);


 */

        /*
                axios.get('http://localhost:8080/oglasi')
                    .then(data => {
                        setOglasi(data);
                    })
                    .catch(error => {
                        console.log(error.message)
                    });
            }, []);


    },[])
*/

/*
    const columns = [
        {
            title: "Sadržaj",
            dataIndex: "sadrzaj",
            key: 'sadrzaj'
        },
        {
            title: "Mjesto",
            dataIndex: "mjesto",
            key: "mjesto"
        },
        {
            title: "Napomena",
            dataIndex: "nampomena",
            key: "nampomena",
        },
        {
            title: "Datum",
            dataIndex: "datum",
            key: "datum"
        },
        {
            title: "Potrebno radnika",
            dataIndex: "brojLjudi",
            key: "brojLjudi"
        },
        {
            title: "Satnica",
            dataIndex: "satnica",
            key: "satnica"
        },
        {
            title: "Aktivan do",
            dataIndex: "aktivanDo",
            key: "aktivanDo"
        },
        {
            title: "Narucilac",
            dataIndex: "narucilac",
            key: "narucilac"
        },
        {
            title: "Posao",
            dataIndex: "posaoTip",
            key: "posaoTip"
        },
        {
            title: "Novcana naknada",
            dataIndex: "novcanaNaknada",
            key: "novcanaNaknada"
        },
    ];

    const test = [
        {
            key: '1',
            sadrzaj: "sadrzajoglasa",
            mjesto: 'BL',
            napomena: 'napomena',
            datum: '2.2.2022',
            brojLjudi: '4',
            aktivanDo: '3.3.333',
            satnica: "5KM",
            tip: "radi se",
            novcanaNaknada: '44',
            narucilac: 'neka firma'
        }
    ];

 */
/*
    const {tekst} = Typography;

    const styledCardsArray = [
        {
            naslov: "prva",
            sadrzaj: "sadrzaj prve",
            slika: "Slika"
        },
        {
            naslov: "druga",
            sadrzaj: "sadrzaj druge",
            slika: "Slika"
        },
        {
            naslov: "prva",
            sadrzaj: "sadrzaj prve",
            slika: "Slika"
        },
        {
            naslov: "druga",
            sadrzaj: "sadrzaj druge",
            slika: "Slika"
        },
        {
            naslov: "druga",
            sadrzaj: "sadrzaj druge",
            slika: "Slika"
        },
        {
            naslov: "prva",
            sadrzaj: "sadrzaj prve",
            slika: "Slika"
        },
        {
            naslov: "druga",
            sadrzaj: "sadrzaj druge",
            slika: "Slika"
        },
    ];

 */
    return (
        <div>
            {/* Your app content */}
            <StyledHeader>OGLASI</StyledHeader>

            <div className="cardContainter">

                <Row gutter={[16, 16]}>
                    {oglasi.map((card, br) => (
                        <AdComponent naslov={card.naslov} sadrzaj={card.sadrzaj} mjesto={card.mjesto} brojLjudi={card.brojLjudi}
                                     datum={card.datum} satnica ={card.satnica} aktivanDo={card.aktivanDo} slika={card.slika}
                                     narucilacNaziv ={card.narucilacById.naziv} narucilacEmail={card.narucilacById.email}
                                     narucilacBroj = {card.narucilacById.broj} narucilacUlicaIBroj = {card.narucilacById.ulicaIBroj}
                                     narucilacMjesto={card.narucilacById.mjesto} napomena={card.napomena}>
                            key={br}
                        </AdComponent>
                    ))
                    }
                </Row>
            </div>

        </div>
    );

    /*
          <AdComponent naslov={tekst} sadrzaj="SADRZAJ"></AdComponent>
          <AdComponent naslov="NASLOV" sadrzaj="SADRZAJ"></AdComponent>
          <AdComponent naslov="NASLOV" sadrzaj="SADRZAJ"></AdComponent>
          */

    //  return (
    //   <Card title = "Naslov"> SADRZAJ </Card>
    /* <Content>
         <StyledTable
             key="id"
           //  dataSource={oglasi}
             dataSource={test}
             columns={columns}
         />
         <StyledButton>
             Obrisi
         </StyledButton>
     </Content>

     */
    //   );

}


export default Index;