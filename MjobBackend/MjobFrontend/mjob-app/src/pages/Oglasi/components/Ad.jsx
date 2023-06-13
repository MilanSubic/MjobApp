import {StyledCard, StyledContent} from "../../../components/BasicStyledComponents";
import DataTimeComponent from "./DataTimeComponent";
import NarucilacTooltip from "./NarucilacTooltip";

const AdComponent = ({naslov,sadrzaj,mjesto,brojLjudi,datum,satnica,aktivanDo, slika, napomena,
                     narucilacNaziv, narucilacBroj, narucilacEmail, narucilacMjesto, narucilacUlicaIBroj}) => {

    return (
        <StyledCard title={naslov}>
            <StyledContent>{sadrzaj}</StyledContent>
            <p> Lokacija: {mjesto}</p>
            <p> Potrebno radnika: {brojLjudi} </p>
            <p> Satnica: {satnica} KM</p>
            <p> Objavljeno: <DataTimeComponent dateTimeFromDatabase = {datum} /></p>
            <p> Aktivan do: <DataTimeComponent dateTimeFromDatabase ={aktivanDo}/></p>
            <NarucilacTooltip> naziv={narucilacNaziv} broj={narucilacBroj} email={narucilacEmail}
                                ulicaIBroj={narucilacUlicaIBroj} mjesto={narucilacMjesto}</NarucilacTooltip>
            <p> Napomena: {napomena}</p>
            <p>{slika}</p>
        </StyledCard>
    );
};


export default AdComponent;